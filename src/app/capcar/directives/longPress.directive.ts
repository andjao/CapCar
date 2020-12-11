import {
  Directive,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

import {
  event
} from 'jquery';

import {
  HistoryComponent
} from '../components';

@Directive({
  selector: '[longPress]'
})
export class LongPressDirective {

  constructor(private historyComponent: HistoryComponent) { }

  @Output()
  shortPress = new EventEmitter();

  private _timeout: any;
  private _isShort: boolean;

  @HostListener('touchstart') onMouseDown(e) {
    this._isShort = true;
    this._timeout = setTimeout(() => {
      this._isShort = false;
      this.historyComponent.removePlate(this['__ngContext__'][8].index);
    }, 500);
  }

  @HostListener('touchend') onMouseUp(e) {
    if (this._isShort) {
      this.shortPress.emit(e);
    }
    clearTimeout(this._timeout);
  }

  @HostListener('touchmove') onMouseLeave() {
    clearTimeout(this._timeout);
  }

}
