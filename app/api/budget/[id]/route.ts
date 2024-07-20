

import {Dto} from "@/DTO/Dto";
import { BudgetModel } from "@/models/modelComptatibilite/BudgetModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const budgetModel: BudgetModel = body;

     

        const dataValidate = Dto.budgetDto().validate(budgetModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const budget = await prismadb.budget.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({budget: budget, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const budget = await prismadb.budget.delete({
            where: { id: id }
        });

        return NextResponse.json({budget: budget, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const budget = await prismadb.budget.findUnique({
            where: { id }
        });

        return NextResponse.json(budget);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}