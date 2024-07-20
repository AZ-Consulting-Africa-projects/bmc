import {Dto} from "@/DTO/Dto";
import { LeaveModel } from "@/models/LeaveModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const leaveModel: LeaveModel = body;

     

        const dataValidate = Dto.leaveDto().validate(leaveModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const leaverequest = await prismadb.leaverequest.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({leaverequest: leaverequest, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const leaverequest = await prismadb.leaverequest.delete({
            where: { id: id }
        });

        return NextResponse.json({leaverequest: leaverequest, status: 200, ok:true });
    } catch (error) {
        console.error('[leaverequest]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const leaverequest = await prismadb.leaverequest.findUnique({
            where: { id },
            include: {
                user: true
              }
        });
        return NextResponse.json(leaverequest);
    } catch (error) {
        console.error('[leaverequest]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}