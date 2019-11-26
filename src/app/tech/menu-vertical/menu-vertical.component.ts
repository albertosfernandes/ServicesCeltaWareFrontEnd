import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-menu-vertical',
  templateUrl: './menu-vertical.component.html',
  styleUrls: ['./menu-vertical.component.css']
})
export class MenuVerticalComponent implements OnInit, OnDestroy {
  
  constructor() { }
  
  @Input() isOpen: boolean;
  @Input() menu: string = "dash";
  @Output() onMenuSend = new EventEmitter<string>();
  
  toggle(){
    this.isOpen = !this.isOpen;
  }
  
  bntMenu(_value){
    this.menu = _value;
    this.onMenuSend.emit(_value);
    console.log(_value);
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    this.onMenuSend.unsubscribe();
  }
  
}
