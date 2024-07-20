export class CustomerModel {
    name: string;
    company: string;
    phone: number;
    email: string;
    address: string;
    status: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        name: string,
        company: string,
        phone: number,
        email: string,
        address: string,
        status: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.name = name;
        this.company = company;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.status = status;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
} 