import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SharedService } from '../../services';

import { createWorker } from 'tesseract.js';

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
      width: { ideal: 180 },
      height: { ideal: 360 }
    }
  }

  constructor(
    public sharedService: SharedService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    navigator.permissions.query({ name: 'camera' }).then(result => {
      if (result.state !== 'granted') this.sharedService.hiddenCam = true;
      if (result.state === 'granted') {
        this.startCamera();
      } else if (result.state === 'prompt') {
        if (!alert(`Lembre-se de permitir o acesso a câmera`)) {
          this.startCamera();
        }
      } else if (result.state === 'denied') {
        this.sharedService.cameraON = false;
        alert(`Acesso a câmera negado!\nPermita o acesso nas configurações do navegador`);
      }
    });
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
        .catch(this.handleError);
    } else {
      alert(`Acesso a câmera negado!\nPermita o acesso nas configurações do navegador`);
    }
  }

  closeCam() {
    this.sharedService.cameraON = false;
    this.videoElement.nativeElement.srcObject.getTracks().forEach(track => {
      track.stop();
    });
  }

  handleError(error) {
    alert(`Acesso a câmera negado!\nPermita o acesso nas configurações do navegador`);
    this.sharedService.cameraON = false;
  }

}
