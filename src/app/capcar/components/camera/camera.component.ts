import {
  Component,
  ElementRef,
  HostListener,
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

  constraints = {
    video: {
      facingMode: "environment",
      aspectRatio: 1 / 1
    }
  }

  stream: any;

  scheduler = createScheduler();
  timer = null;

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
      this.sharedService.hiddenCam = false;
    });
    stream.getVideoTracks()[0].applyConstraints({
      advanced: [{
        torch: false
      }]
    }).then(() => {
      this.stream = stream;
      this.sharedService.torchOK = true;
    }
    ).catch(() => {
      this.sharedService.torchOK = false;
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
    clearInterval(this.timer);
    this.sharedService.cameraON = false;
    this.sharedService.hiddenCam = true;
    this.videoElement.nativeElement.srcObject.getTracks().forEach(track => {
      track.stop();
    });
    clearInterval(this.timer);
    this.scheduler.terminate;
    createWorker().terminate();
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

  changeTorch() {
    this.sharedService.torchON = this.sharedService.torchON ? false : true;
    this.sharedService.torchOnOff = this.sharedService.torchON ? 'assets/images/flash-off.svg' : 'assets/images/flash-on.svg';
    this.stream.getVideoTracks()[0].applyConstraints({
      advanced: [{
        torch: this.sharedService.torchON
      }]
    })
  }

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
      } else if (regexMercoSul.test(m)) {
        this.sharedService.scamOK = true;
        this.closeCam();
        this.sharedService.mercoSul = true;
        this.sharedService.plateMercoSul = m.match(regexMercoSul).join("");
        this.platesComponent.queryPlate();
      }
    }
  }

  doOCR() {
    const sx = 0;
    const sy = this.videoElement.nativeElement.videoHeight * .5;
    const sw = this.videoElement.nativeElement.videoWidth;
    const sh = this.videoElement.nativeElement.videoHeight * .4;
    const dx = 0;
    const dy = 0;
    const dw = this.videoElement.nativeElement.videoWidth;
    const dh = this.videoElement.nativeElement.videoHeight * .4;
    const c = document.createElement('canvas');
    c.width = this.videoElement.nativeElement.videoWidth;
    c.height = this.videoElement.nativeElement.videoHeight;
    this.timer = setInterval(async () => {
      c.getContext('2d').drawImage(this.videoElement.nativeElement,
        sx, sy,
        sw, sh,
        dx, dy,
        dw, dh);
      const { data: { text } } = await this.scheduler.addJob('recognize', c);
      text.split('\n').forEach((line) => {
        this.addMessage(line);
      });
    }, 1000)
  }

  async start() {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    this.scheduler.addWorker(worker);
    this.doOCR();
  }
}
