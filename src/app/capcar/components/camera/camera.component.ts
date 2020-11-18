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
    this.startCamera();
  }

  closeCam() {
    this.sharedService.cameraON = false;
    this.videoElement.nativeElement.srcObject.getTracks().forEach(track => {
      track.stop();
    });
  }

  videoWidth = 0;
  videoHeight = 0;

  attachVideo(stream) {
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
      alert('Sorry, camera not available.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

}
