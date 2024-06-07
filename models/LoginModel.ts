
export class LoginModel {
    phone: number;
    password: string;

    constructor(phone: number, password: string) {
        this.phone = phone;
        this.password = password;
    }
}