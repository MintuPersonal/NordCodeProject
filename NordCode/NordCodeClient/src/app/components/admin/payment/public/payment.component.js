"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaymentComponent = void 0;
var core_1 = require("@angular/core");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(customerService, route, productService, router) {
        this.customerService = customerService;
        this.route = route;
        this.productService = productService;
        this.router = router;
        this.displayedColumn = ['Address'];
        this.displayedColumns = ['Add', 'OrderNo', 'Qty', 'UnitPrice', 'Close'];
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.productService.GetStayThisPage()) {
            this.TOnumber = this.productService.TONumber;
            this.TONumber = this.TOnumber.slice(3, 15);
            this.TotalPrice = this.productService.TotalPrice;
            this.Address = this.productService.Address;
            this.customerService.getOrderDetails(this.TOnumber).subscribe(function (orderModel) {
                _this.OrderObj = orderModel; // FILL THE ARRAY WITH DATA.
                _this.Order = _this.OrderObj['OrderDetails'];
                if (_this.Order.length) {
                    _this.itemState = [];
                    _this.itemState = _this.Order;
                }
            });
        }
        else {
            this.router.navigate(['/']);
        }
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styleUrls: ['./payment.component.css']
        })
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
