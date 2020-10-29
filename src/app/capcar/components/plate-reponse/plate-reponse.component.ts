import { Component, OnInit } from '@angular/core';

import { PlateRequestService } from '../../services';

@Component({
  selector: 'app-plate-reponse',
  templateUrl: './plate-reponse.component.html',
  styleUrls: ['./plate-reponse.component.scss']
})
export class PlateReponseComponent implements OnInit {

  constructor(public plateRequestService: PlateRequestService) { }

  ngOnInit(): void {
  }

}
