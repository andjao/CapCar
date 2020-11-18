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
  createWorker
} from 'tesseract.js';

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
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
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
    this.sharedService.hiddenCam = false;
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
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
    this.sharedService.cameraON = false;
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
}
