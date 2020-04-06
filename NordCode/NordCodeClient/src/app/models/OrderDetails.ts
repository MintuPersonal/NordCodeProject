export class Ecom_OrderDetails {
    OrderId: any;
    ProductId: any;
    TONumber: string;
    PName: string;

    PQty: number;
    ItemQty: number;
    UnitPrice: number;
    NetPrice: number;
    HostAddress: string;

    TrackedId: string;
    CreateBy: string;
    CreateDate: Date;
    UpdateBy: string;
    UpdateDate: Date;
    Delete: boolean;
    Active: boolean;
    ImgPath: string;
}