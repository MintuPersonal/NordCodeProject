"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var CustomerService = /** @class */ (function () {
    function CustomerService(_http, router, productService) {
        this._http = _http;
        this.router = router;
        this.productService = productService;
    }
    CustomerService.prototype.updateCustomer = function (customerModel) {
        return this._http.post(environment_1.environment.baseurl + 'updatecustomer', customerModel);
    };
    CustomerService.prototype.getCustomer = function (cmobileno) {
        return this._http.get(environment_1.environment.baseurl + 'getcustomer?cmobileno=' + cmobileno);
    };
    CustomerService.prototype.getcustomerinfo = function (cmobileno) {
        return this._http.get(environment_1.environment.baseurl + 'getcustomerinfo?cmobileno=' + cmobileno);
    };
    CustomerService.prototype.getOrders = function (customerid) {
        return this._http.get(environment_1.environment.baseurl + 'getorders?customerid=' + customerid);
    };
    CustomerService.prototype.getOrder = function (TOnumber) {
        return this._http.get(environment_1.environment.baseurl + 'getorder?TONumber=' + TOnumber);
    };
    CustomerService.prototype.getOrderDetails = function (TOnumber) {
        return this._http.get(environment_1.environment.baseurl + 'getorderdetails?TONumber=' + TOnumber);
    };
    CustomerService.prototype.SetOrder = function (order) {
        return this._http.post(environment_1.environment.baseurl + 'setorder', order);
    };
    ;
    CustomerService.prototype.updateOrder = function (order) {
        return this._http.post(environment_1.environment.baseurl + 'updateorder', order);
    };
    ;
    CustomerService.prototype.getCommercial = function () {
        return this._http.get(environment_1.environment.baseurl + 'gethomes');
    };
    CustomerService.prototype.getAddtoCart = function () {
        return this._http.get(environment_1.environment.baseurl + 'getaddtocart');
    };
    CustomerService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
;
