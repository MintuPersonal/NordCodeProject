export class Ecom_Commercial {
    PId: string;
    Name: string;
    Qty: number;
    UnitPrice: number;

    constructor(pid, pname, qty, unitprice) {
        this.PId = pid;
        this.Name = pname;
        this.Qty = qty;
        this.UnitPrice = unitprice;
    }
}
