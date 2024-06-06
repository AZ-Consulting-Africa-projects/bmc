
export class AttendanceModel {

    userId: number;
    date: string;
    inTime: string;
    outTime: string;
    status: string;
    id?: number;

    constructor(userId: number, date: string, inTime: string, outTime: string, status: string, id?: number) {
        this.date = date;
        this.inTime = inTime;
        this.outTime = outTime;
        this.status = status;
        this.userId = userId;
        this.id = id;
    }
}