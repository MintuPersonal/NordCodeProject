export class User {
  forEach(arg0: (element: any) => void) {
    throw new Error("Method not implemented.");
  }
    constructor(
        public FullName: string,
        public UserName: string,
        public PassWord: string,
        public ConfirmPassWord: string,
        public FileUrl: string,
        public FileExtention: string,
        public FileImage: string,
        public Birthday: Date,
        public TrackedId: string,
        public IsCounted : Number
    ) { }
}
