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
      this.sharedService.privacyPolicies = true;
    } else {
      this.sharedService.privacyPolicies = false;
    }
  }

  closePrivacyPolicies() {
    this.sharedService.privacyPolicies = true;
    this.localStorageService.saveLocalStorage('privacyPolicies', true, { type: "", mercosul: "" })
  }

}
