export class User {
    constructor(
        public FullName: string,
        public UserName: string,
        public PassWord: string,
        public ConfirmPassWord: string,
        public FileUrl: string,
        public FileExtention: string,
        public FileImage: string,
        public Birthday: Date,
        public TrackedId: string
    ) { }
}
