import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { NgbCarouselConfig, NgbSlideEvent, NgbSlideEventSource, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  debugger;
  images = [1, 2, 3, 4, 5, 6, 7].map((n) => `../assets/img/product/banner/${n}.png`);
  items: Array<any> = []

  constructor(config: NgbCarouselConfig, private renderer: Renderer2) {
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;    

  }

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`); 

  ngOnInit(): void {
    
  }

  //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

}
