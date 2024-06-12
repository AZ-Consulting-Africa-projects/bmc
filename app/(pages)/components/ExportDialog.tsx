"use client";
import { Button } from "@/components/ui/button";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FolderDown } from "lucide-react";
import Image from "next/image";
import { downloadPDF } from "@/lib/utils";

interface Props {
    data: any[],
    idTable: string,
    refTable: any,
}

const ExportDialog = ({ data,
    idTable,
    refTable }: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"} variant="outline" className="flex space-x-2">
                    <h1>Télecharger la liste</h1>
                    <FolderDown />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Exporté les donnés en </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>

                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex justify-center items-center gap-4">
                        <div onClick={() => downloadPDF(refTable)} className="w-[150px] h-[200px] rounded-md items-center justify-center flex flex-col gap-2 ">
                            <Image src={"/image/pdf.png"} width={100} height={100} alt="" className="object-cover " />
                            <h1>PDF</h1>
                        </div>

                        <div className="w-[150px] h-[200px] rounded-md items-center justify-center flex flex-col gap-2 ">
                            <Image src={"/image/exceller.png"} width={100} height={100} alt="" className="object-cover " />
                            <h1>EXCEL</h1>
                                                     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        </div>

                        <div className="w-[150px] h-[200px] rounded-md items-center justify-center flex flex-col gap-2 ">
                        <Image src={"/image/csv.png"} width={100} height={100} alt="" className="object-cover " />
                                <h1>CSV</h1>
                           

                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default ExportDialog;