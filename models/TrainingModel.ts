export class TrainingProgramModel {

    name: string;
    description: string;
    startDate: string;
    endDate: string;
    userIds: number;
    id?: number;

    constructor(name: string, description: string, startDate: string, endDate: string, userIds: number, id?: number) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userIds = userIds;
        this.id = id;
    }

}