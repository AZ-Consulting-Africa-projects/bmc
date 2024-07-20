export class SaleModel {
    name: string;
customerId: number;
stage: string;
estimated_amount: number;
close_date: string;
description: string;
status: string;
id?: number
isVisible?: boolean;
isActived?: boolean;

    constructor(
        name: string,
        customerId: number,
        stage: string,
        estimated_amount: number,
        close_date: string,
        description: string,
        status: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.name = name;
        this.customerId = customerId;
        this.stage = stage;
        this.estimated_amount = estimated_amount;
        this.close_date = close_date;
        this.description = description;
        this.status = status;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}