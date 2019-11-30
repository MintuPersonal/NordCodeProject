export class Task {
    constructor(
        public Title: string,
        public Description: string,
        public Date: Date,
        public From: any,
        public To: any,
        public Location: string,
        public Priority: number,
        public Notify: string,
        public Email: string,
        public IsDelete: boolean,
        public IsDone: boolean,
        //public Users_user_id: BigInteger
    ) { }
}
