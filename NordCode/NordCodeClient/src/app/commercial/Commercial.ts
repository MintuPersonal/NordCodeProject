export class Ecom_Commercial {
    Add: any;
    PID: string;
    Name: string;
    Qty: number;
    UnitPrice: number;
    Close: any;
    

    constructor( add, pid, pname, qty, unitprice, Close) {
        this.Add = add;
        this.PID = pid;
        this.Name = pname;
        this.Qty = qty;
        this.UnitPrice = unitprice;
        this.Close = Close;
        
    }
}
