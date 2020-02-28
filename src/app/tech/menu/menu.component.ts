import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor() { }
  @Input() isOpen: boolean;
  @Input() menu = 'dash';
  @Output() onMenuSend = new EventEmitter<string>();

  toggle() {
    this.isOpen = !this.isOpen;
  }

  bntMenu(_value) {
    this.menu = _value;
    this.onMenuSend.emit(_value);
    console.log('menuComponent ' + _value);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.onMenuSend.unsubscribe();
  }

}
