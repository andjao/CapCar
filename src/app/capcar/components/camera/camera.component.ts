import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services';

import { } from 'tesseract.js';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
  }

  closeCam() {
    this.sharedService.cameraON = false;
  }

}
