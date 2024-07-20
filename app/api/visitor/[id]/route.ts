import {Dto} from "@/DTO/Dto";
import { VisitorModel } from "@/models/VisitorModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const visitorModel: VisitorModel = body;

     

        const dataValidate = Dto.visitorDto().validate(visitorModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const visitor = await prismadb.visitor.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({visitor: visitor, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateVisitor]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const visitor = await prismadb.visitor.delete({
            where: { id: id }
        });

        return NextResponse.json({visitor: visitor, status: 200, ok:true });
    } catch (error) {
        console.error('[visitor]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const visitor = await prismadb.visitor.findUnique({
            where: { id },
            
        });
        return NextResponse.json(visitor);
    } catch (error) {
        console.error('[visitor]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}