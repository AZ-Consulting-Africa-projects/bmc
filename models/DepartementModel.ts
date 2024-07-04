export class DepartementModel {
    departementName: string;
    description?: string;
    isVisible?: boolean;
    isActived?: boolean;
    id?: number;

    constructor(
        departementName: string,
        description?: string,
        isVisible?: boolean,
        isActived?: boolean,
        id?: number,
    ) {
        this.departementName = departementName;
        this.description = description;
        this.isVisible = isVisible;
        this.isActived = isActived;
        this.id = id;
    }
}