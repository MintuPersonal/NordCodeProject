import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor() { }

  urls = []
  ngOnInit(): void {
  }

  onselect(event) {    
    if (event.target.files) {
      let total = event.target.files.length;
      for (let index = 0; index < total; index++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[index]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);
          debugger;
          setTimeout(() => { }, 1000);
        }
      }
    }
  }

  UploadAll(){
    alert('File Upload')
  }
}
