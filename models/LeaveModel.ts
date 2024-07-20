export class LeaveModel {
    userId: number;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: string;
    request_date: string;
    approval_date?: string;
    id?: number;
    isActived?: boolean;
    isVisible?: boolean;

    constructor(
        userId: number,
        leave_type: string,
        start_date: string,
        end_date: string,
        reason: string,
        status: string,
        request_date: string,
        approval_date?: string,
        id?: number,
        isActived?: boolean,
        isVisible?: boolean
    ) {
        this.userId = userId;
        this.leave_type = leave_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.reason = reason;
        this.status = status;
        this.request_date = request_date;
        this.approval_date = approval_date;
        this.id = id;
        this.isActived = isActived;
        this.isVisible = isVisible;
    }

}