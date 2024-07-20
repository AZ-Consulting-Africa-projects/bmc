
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import { BudgetModel } from "@/models/modelComptatibilite/BudgetModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const budgetModel: BudgetModel = body;

        const dataValidation = Dto.budgetDto().validate(budgetModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const budget = await prismadb.budget.create({ data: dataValidation.value });
            return NextResponse.json({postes: budget, ok: true});
        }

    } catch (error) {
        console.error('[poste_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const budget = await prismadb.budget.findMany({
            include: {
                deparetement: true,
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(budget);
    } catch (error) {
        console.error('[getposte]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}