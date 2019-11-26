import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() isOpen: boolean;
  @Output() emitChangeButton = new EventEmitter();  

  bToogle(){
    this.emitChangeButton.emit();
  }

  ngOnInit() {
  }

}
