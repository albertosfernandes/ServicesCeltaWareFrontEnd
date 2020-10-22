import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-signsat',
  templateUrl: './form-signsat.component.html',
  styleUrls: ['./form-signsat.component.css']
})
export class FormSignsatComponent implements OnInit {

  key: string;

  constructor() { }

  generate() {
    alert('gerando chave');
  }

  ngOnInit() {
  }

}
