export class UserRecrutementModel {
    userId: number;
    recrutementId: number;
    cv: string;
    lettre?: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        userId: number,
        recrutementId: number,
        cv: string,
        lettre?: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.userId = userId;
        this.recrutementId = recrutementId;
        this.cv = cv;
        this.lettre = lettre;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }

}