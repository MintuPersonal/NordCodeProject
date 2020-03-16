import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMenuNav() {
    document.getElementById("menunav").style.width = "250px";
    //document.getElementById("main").style.marginLeft = "250px";
  }

  closeMenuNav() {
    document.getElementById("menunav").style.width = "0";
    //document.getElementById("main").style.marginLeft = "0";
  }

}
