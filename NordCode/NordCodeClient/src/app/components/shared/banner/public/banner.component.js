"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BannerComponent = void 0;
var core_1 = require("@angular/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var BannerComponent = /** @class */ (function () {
    function BannerComponent(config, renderer) {
        this.renderer = renderer;
        this.showNavigationArrows = false;
        this.showNavigationIndicators = false;
        this.images = [1, 2, 3, 4, 5, 6, 7].map(function (n) { return "../assets/img/product/banner/" + n + ".png"; });
        this.items = [];
        //images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);
        this.paused = false;
        this.unpauseOnArrow = false;
        this.pauseOnIndicator = false;
        this.pauseOnHover = true;
        config.showNavigationArrows = true;
        config.showNavigationIndicators = true;
    }
    //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`); 
    BannerComponent.prototype.ngOnInit = function () {
    };
    BannerComponent.prototype.togglePaused = function () {
        if (this.paused) {
            this.carousel.cycle();
        }
        else {
            this.carousel.pause();
        }
        this.paused = !this.paused;
    };
    BannerComponent.prototype.onSlide = function (slideEvent) {
        if (this.unpauseOnArrow && slideEvent.paused &&
            (slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.ARROW_LEFT || slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.ARROW_RIGHT)) {
            this.togglePaused();
        }
        if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === ng_bootstrap_1.NgbSlideEventSource.INDICATOR) {
            this.togglePaused();
        }
    };
    __decorate([
        core_1.ViewChild('carousel', { static: true })
    ], BannerComponent.prototype, "carousel");
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.css']
        })
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
