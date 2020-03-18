export class Ecom_Orders {
    OId: any;
    OrderNo: any;
    CustomerId: any;
    CouponId: any;
    PaymentId: any;
    Discount: any;
    Reason: any;
    Active: any;
    ProductId: any;
    UnitPrice: any;
    Qty: any;
    NetPrice: any;

    constructor(oid, orderid, customerid, couponid, paymentid, discount, reason, active, productid, unitprice, qty, netprice) {
        this.OId = oid;
        this.OrderNo = orderid;
        this.CustomerId = customerid;
        this.CouponId = couponid;
        this.PaymentId = paymentid;
        this.Discount = discount;
        this.Reason = reason;
        this.Active = active;
        this.ProductId = productid;
        this.UnitPrice = unitprice;
        this.Qty = qty;
        this.NetPrice = netprice
    }
}