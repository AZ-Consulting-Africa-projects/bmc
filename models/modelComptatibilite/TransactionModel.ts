
export class TransactionModel {
    date: string;
    amount: number;
    type: string;
    category: string;
    status: string;
    description: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        date: string,
        amount: number,
        type: string,
        category: string,
        status: string,
        description: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.date = date;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.status = status;
        this.description = description;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}