export class Task {
    constructor(
        public task_id: string,
        public title: string,
        public description: string,
        public date: Date,
        public time_from: any,
        public time_to: any,
        public location: string,
        public priority: number,
        public notify: string,
        public email: string,
        public isDelete: boolean,
        public isDone: boolean,
        public create_at: Date,
        public user_Information_user_id: string
    ) { }
}

//   {
//     "task_id": 2,
//     "title": "Title",
//     "description": "Description",
//     "date": "12/12/2020",
//     "time_from": "12/12/2020",
//     "time_to": "12/12/2020",
//     "location": "Dhaka-1207",
//     "priority": "50",
//     "notify": "20",
//     "email": "md@gmail.com",
//     "isDelete": "0",
//     "isDone": "1",
//     "create_at": "12/12/2020",
//     "user_Information_user_id":1
// }
