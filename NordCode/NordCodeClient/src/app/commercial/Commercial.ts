export class Ecom_Commercial {
    PId: string;
    Name: string;
    Qty: number;
    UnitPrice: number;
    Close: any;
    Add: any;

    constructor(pid, pname, qty, unitprice, Close, add) {
        this.PId = pid;
        this.Name = pname;
        this.Qty = qty;
        this.UnitPrice = unitprice;
        this.Close = Close;
        this.Add = add;
    }
}
