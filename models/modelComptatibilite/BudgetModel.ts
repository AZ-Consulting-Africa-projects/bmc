
export class BudgetModel {
    departementId: number;
    budget_allocated: number;
    budget_spent: number;
    budget_remaining: number;
    period: string;
    description: string;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        departementId: number,
        budget_allocated: number,
        budget_spent: number,
        budget_remaining: number,
        period: string,
        description: string,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean
    ) {
        this.departementId = departementId;
        this.budget_allocated = budget_allocated;
        this.budget_spent = budget_spent;
        this.budget_remaining = budget_remaining;
        this.period = period;
        this.description = description;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }
}