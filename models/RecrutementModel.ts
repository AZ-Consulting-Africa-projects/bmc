
export class RecrutementModel {
   
email: string;
firstName: string;
lastName: string;
phone: number;
post: string;
position: string;
documents: string;
status: string;
 id?: number;

constructor( email: string, firstName: string, lastName: string, phone : number, post: string, position: string, documents: string, status: string,id?: number) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone  = phone;
    this.post = post;
    this.position = position;
    this.documents = documents;
    this.status = status;
}
}