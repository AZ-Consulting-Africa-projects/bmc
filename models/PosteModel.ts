export class PostModel {

    posteName: string;
    deparetementId: number;
    description?: string;
    isVisible?: boolean;
    isActived?: boolean;
    id?: number;

    constructor(
        posteName: string,
        deparetementId: number,
        description?: string,
        isVisible?: boolean,
        isActived?: boolean,
        id?: number,
    ) {
        this.posteName = posteName;
        this.deparetementId = deparetementId;
        this.description = description;
        this.isVisible = isVisible;
        this.isActived = isActived;
        this.id = id;
    }
}