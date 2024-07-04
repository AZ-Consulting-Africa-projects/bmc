
export class SettingsModel {

    entreprise_name: string;
    logo: string;
    adress: string;
    phone: number;
    email: string;
    isVisible?: boolean;
    isActived?: boolean;
    id?: number;

    constructor(
        entreprise_name: string,
        logo: string,
        adress: string,
        phone: number,
        email: string,
        isVisible?: boolean,
        isActived?: boolean,
        id?: number,
    ) {
        this.entreprise_name = entreprise_name;
        this.logo = logo;
        this.adress = adress;
        this.phone = phone;
        this.email = email;
        this.isVisible = isVisible;
        this.isActived = isActived;
        this.id = id;
    }
}