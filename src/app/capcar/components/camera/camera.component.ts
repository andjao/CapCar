import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

import {
  LocalStorageService,
  SharedService,
} from '../../services';

import {
  createWorker,
  createScheduler
} from 'tesseract.js';
import { PlatesComponent } from '../plates';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  @ViewChild('video') videoElement: ElementRef;

  videoWidth = 0;
  videoHeight = 0;

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 5 },
      height: { ideal: 2 }
    }
  }

  constructor(
    private renderer: Renderer2,
    public sharedService: SharedService,
    public localStorageService: LocalStorageService,
    private platesComponent: PlatesComponent,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.start();
    if (!navigator.userAgent.toLowerCase().match('firefox')) {
      navigator.permissions.query({ name: 'camera' }).then(result => {
        if (result.state !== 'granted') this.sharedService.hiddenCam = true;
        if (result.state === 'granted') {
          this.startCamera();
        } else if (result.state === 'prompt') {
          alert(`Lembre-se de permitir o acesso a câmera`)
          this.startCamera();
        } else if (result.state === 'denied') {
          this.sharedService.cameraON = false;
          this.tutorialCam()
        }
      });
    } else {
      if (!this.localStorageService.loadLocalStorage('cam')) {
        alert(`Lembre-se de permitir o acesso a câmera`);
        this.localStorageService.saveLocalStorage('cam', true, { type: null, mercosul: null });
      }
      this.startCamera();
    }
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
      this.sharedService.hiddenCam = false;
    });
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.tutorialCam);
    } else {
      this.tutorialCam();
    }
  }

  closeCam() {
    clearInterval(this.timerId);
    this.sharedService.cameraON = false;
    this.sharedService.hiddenCam = true;
    this.videoElement.nativeElement.srcObject.getTracks().forEach(track => {
      track.stop();
    });
  }

  tutorialCam() {
    const navigatorType = navigator;
    if (navigatorType.userAgent.toLowerCase().match('mobile') && confirm(`Acesso a câmera negado!
    \nPermita o acesso nas configurações do navegador
    \nPara acessar o tutorial de como reativar a camera aperte em OK`)) {
      if (navigatorType.userAgent.toLowerCase().match('chrome'))
        window.open('https://support.google.com/chrome/answer/2693767?co=GENIE.Platform%3DDesktop&hl=pt-BR', "_blank");
      else if (navigator.userAgent.toLowerCase().match('firefox'))
        window.open('https://support.mozilla.org/pt-BR/kb/conceda-acesso-camera-firefox-android', "_blank");
    }
    this.sharedService.cameraON = false;
  }

  scheduler = createScheduler();
  timerId = null;

  addMessage(m) {
    const regexNational = new RegExp("[a-zA-Z]{3}-[0-9]{4}");
    const regexMercoSul = new RegExp("[a-zA-Z]{3}[0-9][0-9a-zA-Z][0-9]{2}");

    if (!this.sharedService.scamOK) {
      if (regexNational.test(m)) {
        this.sharedService.scamOK = true;
        this.closeCam();
        this.sharedService.mercoSul = false;
        this.sharedService.plateNational = m.match(regexNational).join("");
        this.platesComponent.queryPlate();
        clearInterval(this.timerId);
      } else if (regexMercoSul.test(m)) {
        this.sharedService.scamOK = true;
        this.closeCam();
        this.sharedService.mercoSul = true;
        this.sharedService.plateMercoSul = m.match(regexMercoSul).join("");
        this.platesComponent.queryPlate();
        clearInterval(this.timerId);
      }
    }
  }

  async doOCR() {
    const c = document.createElement('canvas');
    c.width = 640;
    c.height = 360;
    c.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0, 640, 360);
    const { data: { text } } = await this.scheduler.addJob('recognize', c);
    text.split('\n').forEach((line) => {
      this.addMessage(line);
    });
  }

  async start() {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    this.scheduler.addWorker(worker);

    this.videoElement.nativeElement.addEventListener('playing', () => {
      this.timerId = setInterval(() => {
        this.doOCR();
      }, 1000);
    });

    this.videoElement.nativeElement.addEventListener('pause', () => {
      clearInterval(this.timerId);
    });
    this.videoElement.nativeElement.pause();
    this.videoElement.nativeElement.play();
  }
}
