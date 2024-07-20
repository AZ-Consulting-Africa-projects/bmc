import Joi from "joi";

export class Dto {

    static postDto() {
        const schema = Joi.object({
            posteName: Joi.string().required(),
            deparetementId: Joi.number().required(),
            description: Joi.string().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            id: Joi.number().optional(),
        });

        return schema;
    }

    static departementDto() {
        const schema = Joi.object({
            departementName: Joi.string().required(),
            description: Joi.string().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            id: Joi.number().optional(),
        });

        return schema;
    }

    static settingsDto() {
        const schema = Joi.object({
            entreprise_name: Joi.string().required(),
            logo: Joi.string().required(),
            adress: Joi.string().required(),
            phone: Joi.number().required(),
            email: Joi.string().email().required(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            id: Joi.number().optional(),
        });

        return schema;
    }


    static userDto() {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            password: Joi.string().required(),
            departement: Joi.string().optional(),
            position: Joi.string().required(),
            role: Joi.string().required(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            hire_date: Joi.string().optional(),
            salary: Joi.number().optional(),
            phone: Joi.number().required(),
            imageUrl: Joi.string().optional(),
            id: Joi.number().optional(),
        });
        return schema;
    }

    static loginDto() {
        const schema = Joi.object({
            phone: Joi.number().required(),
            password: Joi.string().required(),
        });
        return schema;
    }

    static attendanceDto() {
        const schema = Joi.object({
            date: Joi.string().required(),
            inTime: Joi.string().required(),
            outTime: Joi.string().required(),
            status: Joi.string().required(),
            userId: Joi.number().required(),
            id: Joi.number().optional(),
        });
        return schema;
    }

    static recrutementDto() {
        const schema = Joi.object({
            title: Joi.string().required(),
            poste: Joi.string().required(),
            description: Joi.string().required(),
            responsability: Joi.string().required(),
            requirement: Joi.string().required(),
            location: Joi.string().required(),
            salary: Joi.number().required(),
            posting_date: Joi.string().required(),
            closing_date: Joi.string().required(),
            status: Joi.string().required(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            id: Joi.number().optional(),
        });

        return schema;
    }

    static userRecrutementDto() {
        const schema = Joi.object({
            userId: Joi.number().required(),
            recrutementId: Joi.number().required(),
            cv: Joi.string().required(),
            lettre: Joi.string().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional(),
            id: Joi.number().optional(),
        });

        return schema;
    }

    static trainingDto() {
        const schema = Joi.object({
            id: Joi.number().optional(),
            name: Joi.string().required(),
            description: Joi.string().required(),
            startDate: Joi.string().required(),
            endtDate: Joi.string().required(),
            userId: Joi.number().required(),
        });

        return schema;
    }

    static leaveDto() {
        const schema = Joi.object({
            userId: Joi.number().required(),
            leave_type: Joi.string().required(),
            start_date: Joi.string().required(),
            end_date: Joi.string().required(),
            reason: Joi.string().required(),
            status: Joi.string().required(),
            request_date: Joi.string().required(),
            approval_date: Joi.string().optional(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static visitorDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            company: Joi.string().required(),
            purpose_of_visit: Joi.string().required(),
            arrival_date: Joi.string().required(),
            arrival_time: Joi.string().required(),
            departure_date: Joi.string().required(),
            person_to_meet: Joi.string().required(),
            status: Joi.string().required(),
            visitor_id_card: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static invoiceDto() {
        const schema = Joi.object({
            date: Joi.string().required(),
            amount: Joi.number().required(),
            userId: Joi.number().required(),
            due_date: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static transactionDto() {
        const schema = Joi.object({
            date: Joi.string().required(),
            amount: Joi.number().required(),
            type: Joi.string().required(),
            category: Joi.string().required(),
            status: Joi.string().required(),
            description: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static budgetDto() {
        const schema = Joi.object({
            departementId: Joi.number().required(),
            budget_allocated: Joi.number().required(),
            budget_spent: Joi.number().required(),
            budget_remaining: Joi.number().required(),
            period: Joi.string().required(),
            description: Joi.string().required(),            
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()        
        });
        return schema;
       
    }

    static customerDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            company: Joi.string().required(),
            phone: Joi.number().required(),
            email: Joi.string().email().required(),
            address: Joi.string().required(),
            status: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });
        return schema;
    }

    static saleDto() {
        const schema = Joi.object({
            name: Joi.string().required(),
            costomerId: Joi.number().required(),
            stage: Joi.string().required(),
            estimated_amount: Joi.number().required(),
            close_date: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema;
    }

    static quoteDto() {
        const schema = Joi.object({
            type: Joi.string().required(),
            customerId: Joi.number().required(),
            date_issued: Joi.string().required(),
            amount: Joi.number().required(),
            description: Joi.string().required(),
            status: Joi.string().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema;
    }

    static salereportDto() {
        const schema = Joi.object({
            report_type: Joi.string().required(),
            start_date: Joi.string().required(),
            end_date: Joi.string().required(),
            total_revenue: Joi.number().required(),
            total_opportunities: Joi.number().required(),
            conversion_rate: Joi.number().required(),
            id: Joi.number().optional(),
            isVisible: Joi.boolean().optional(),
            isActived: Joi.boolean().optional()
        });

        return schema
    }

    
}
