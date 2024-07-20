export class SalereportModel {
    report_type: string;
    start_date: string;
    end_date: string;
    total_revenue: number;
    total_opportunities: number;
    conversion_rate: number;
    id?: number;
    isVisible?: boolean;
    isActived?: boolean;

    constructor(
        report_type: string,
        start_date: string,
        end_date: string,
        total_revenue: number,
        total_opportunities: number,
        conversion_rate: number,
        id?: number,
        isVisible?: boolean,
        isActived?: boolean,
    ) {
        this.report_type = report_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.total_revenue = total_revenue;
        this.total_opportunities = total_opportunities;
        this.conversion_rate = conversion_rate;
        this.id = id;
        this.isVisible = isVisible;
        this.isActived = isActived;
    }

}