
export class InvoiceModel {
    date: string;
    amount: number;
    userId: number;
    due_date: string;
    status: string;
    description: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        date: string,
        amount: number,
        userId: number,
        due_date: string,
        status: string,
        description: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.date = date;
        this.amount = amount;
        this.userId = userId;
        this.due_date = due_date;
        this.status = status;
        this.description = description;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;

    }
}