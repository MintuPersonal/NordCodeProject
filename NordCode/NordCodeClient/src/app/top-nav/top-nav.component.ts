import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../components/shared/navbar/navbar.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  constructor(public navService: NavbarService) { }

  ngOnInit(): void {
  }

}
