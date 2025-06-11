import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 
  anyoActual: number = 0;
 
  constructor() {}

  ngOnInit(): void {

  this.anyoActual = this.getAnyo();
         
 }

getAnyo():number {
  return new Date().getFullYear();
}
}
