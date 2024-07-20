export class RecrutementModel {

    title: string;
    poste: string;
    description: string;
    responsability: string;
    requirement: string;
    location: string;
    salary: number;
    posting_date: string;
    closing_date: string;
    status: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        title: string,
        poste: string,
        description: string,
        responsability: string,
        requirement: string,
        location: string,
        salary: number,
        posting_date: string,
        closing_date: string,
        status: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.title = title;
        this.poste = poste;
        this.description = description;
        this.responsability = responsability;
        this.requirement = requirement;
        this.location = location;
        this.salary = salary;
        this.posting_date = posting_date;
        this.closing_date = closing_date;
        this.status = status;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }

}