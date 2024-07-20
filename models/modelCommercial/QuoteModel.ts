export class QuoteModel {
    type: string;
    customerId: number;
    date_issued: string;
    amount: number;
    description: string;
    status: string;
    id?: number
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        type: string,
        customerId: number,
        date_issued: string,
        amount: number,
        description: string,
        status: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.type = type;
        this.customerId = customerId;
        this.date_issued = date_issued;
        this.amount = amount;
        this.description = description;
        this.status = status;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}