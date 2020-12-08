import {
  Component,
  OnInit
} from '@angular/core';

import {
  LocalStorageService,
  SharedService
} from '../../services';

@Component({
  selector: 'app-privacyPolicies',
  templateUrl: './privacyPolicies.component.html',
  styleUrls: ['./privacyPolicies.component.scss']
})
export class PrivacyPoliciesComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    public localStorageService: LocalStorageService,
  ) { }

  ngOnInit(): void {
    this.init()
  }


  init() {    
    if (JSON.parse(this.localStorageService.loadLocalStorage('privacyPolicies'))) {
      this.sharedService.privacyPoliciesAccept = true;
      this.sharedService.privacyPolicies = false;
    } else {
      this.sharedService.privacyPoliciesAccept = false;
      this.sharedService.privacyPolicies = true;

    }
  }

  closePrivacyPolicies() {
    this.sharedService.privacyPolicies = false;
  }

  accept() {
    this.sharedService.privacyPoliciesAccept = true;
    this.sharedService.privacyPolicies = false;
    this.localStorageService.saveLocalStorage('privacyPolicies', true, { type: "", mercosul: "" })
  }

}
