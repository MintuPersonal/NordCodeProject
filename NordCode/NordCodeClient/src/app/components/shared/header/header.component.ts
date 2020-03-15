import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  totalItemsCount = true;
  ngOnInit() {
  }

  openNav() {
    document.getElementById("mySidepanel").style.width = "350px";
    document.getElementById("mySidepanel").style.height = "900px";
    //document.getElementById("mySidepanel").style.display = "none";
  }

  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }

}

