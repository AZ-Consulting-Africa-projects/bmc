
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                  
import { LeaveModel } from "@/models/LeaveModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const leaveModel: LeaveModel = body;

        const dataValidation = Dto.leaveDto().validate(leaveModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const leaverequest = await prismadb.leaverequest.create({ data: dataValidation.value });
            return NextResponse.json({leaverequest: leaverequest, ok: true});
        }

    } catch (error) {
        console.error('[leaverequest_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const leaverequest = await prismadb.leaverequest.findMany({
            where: {
                isActived: true,
                isVisible: true
              },
              include: {
                user: true
              }
        });
        return NextResponse.json(leaverequest);
    } catch (error) {
        console.error('[getleaverequest]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}