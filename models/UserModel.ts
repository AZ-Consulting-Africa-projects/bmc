
export class UserModel {
    email: string;
firstName: string;
lastName: string;
password?: string;
phone: number;
departement: string;
position: string;
role: string;
isVisible?: boolean;
isActived?: boolean;
hire_date?: string;
imageUrl?: string; 
salary?: number;
id?: number;

constructor(email: string, firstName: string, lastName: string, phone: number, departement: string, position: string, role: string, password?: string, isVisible?: boolean, isActived?: boolean, hire_date?: string, imageUrl?: string,  salary?: number, id?: number) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.departement = departement;
    this.position = position;
    this.role = role;
    this.isVisible = isVisible;
    this.isActived = isActived;
    this.hire_date = hire_date;
    this.imageUrl = imageUrl
    this.salary = salary;
    this.phone = phone;
    this.id = id;
}
}
