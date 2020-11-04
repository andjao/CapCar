import { Component, OnInit } from '@angular/core';

import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-plateResponse',
  templateUrl: './plateResponse.component.html',
  styleUrls: ['./plateResponse.component.scss']
})
export class PlateReponseComponent implements OnInit {

  constructor(public plateRequestService: PlateRequestService) { }

  ngOnInit(): void {
  }
}
