import Joi from "joi";

export class Dto {
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
            hire_date: Joi.string().required(),
            salary: Joi.number().optional(),
            phone: Joi.number().required(),
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
            userId: Joi.number().required(),
            id: Joi.number().optional(),
        });
        return schema;
    }

    static recrutementDto() {
        const schema = Joi.object({
            id: Joi.number().optional(),
            email: Joi.string().email().required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.number().required(),
            post: Joi.string().required(),
            position: Joi.string().required(),
            documents: Joi.string().required(),
            status: Joi.string().required(),
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
}
