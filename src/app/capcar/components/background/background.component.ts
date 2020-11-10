import {
  Component,
  OnInit,
} from '@angular/core';

import {
  LoadingService,
} from '../../services';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  img_url = 'https://picsum.photos/900/1600?blur=2';

  constructor(
    public loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.loadingM(true);
  }

}
