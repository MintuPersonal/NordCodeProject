import { Ecom_OrderDetails } from './OrderDetails';

export class Ecom_Orders {
    OID: any;
    TONumber: string;
    CustomerId: number;
    CouponId: number;
    PaymentId: number;
    Discount: number;
    Reason: any;
    ProductId: number;

    NetPrice: number;
    TotalItemQty: number;
    DeliveryCharge: number;
    TotalPrice: number;
    Address: any;
    Aria: any;
    DeliveryTime: any;
    OrderStatus: number;

    TrackedId: any;
    CreateBy: any;
    CreateDate: Date;
    Delete: boolean;
    Active: boolean;
    
    PaymentModeId: number;
    OrderDetails: Ecom_OrderDetails[];
}