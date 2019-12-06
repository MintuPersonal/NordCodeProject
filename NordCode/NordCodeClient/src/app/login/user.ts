export class User {
    constructor(
        public UserName: string,
        public PassWord: string,
        public FileUrl: string,
        public FileExtention: string,
        public FileImage: string,
        public Birthday: Date,
        public TrackedId: string
    ) { }
}
