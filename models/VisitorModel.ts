
export class VisitorModel {

    name: string;
    company: string;
    purpose_of_visit: string;
    arrival_date: string;
    arrival_time: string;
    departure_date: string;
    person_to_meet: string;
    status: string;
    visitor_id_card: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        name: string,
        company: string,
        purpose_of_visit: string,
        arrival_date: string,
        arrival_time: string,
        departure_date: string,
        person_to_meet: string,
        status: string,
        visitor_id_card: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.name = name;
        this.company = company;
        this.purpose_of_visit = purpose_of_visit;
        this.arrival_date = arrival_date;
        this.arrival_time = arrival_time;
        this.departure_date = departure_date;
        this.person_to_meet = person_to_meet;
        this.status = status;
        this.visitor_id_card = visitor_id_card;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    
    }
}