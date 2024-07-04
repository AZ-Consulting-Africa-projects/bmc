
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                                                                                                                             
import { SettingsModel } from "@/models/SettingsModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const settingsModel: SettingsModel = body;

        const dataValidation = Dto.settingsDto().validate(settingsModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const settings = await prismadb.settings.create({ data: dataValidation.value });
            return NextResponse.json({settings: settings, ok: true});
        }

    } catch (error) {
        console.error('[settings_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const settings = await prismadb.settings.findMany();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('[getSettings]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}