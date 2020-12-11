import {
  Component,
  OnInit
} from '@angular/core';

import {
  SharedService
} from '../../services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  closeContact() {
    this.sharedService.contactON = false;
  }

}
