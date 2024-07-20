import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import Image from "next/image";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Props {
    data: any[];
}

const ExportCSVButton = ({data}: Props) => {
    const generateCSV = () => {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return <button onClick={generateCSV} className=" rounded-md items-center justify-center flex flex-col gap-2 ">
        <Image src={"/image/csv.png"} width={100} height={100} alt="" className="object-cover " />
        <h1>CSV</h1>
    </button>;
};

const ExportPDFButton = ({data}: Props) => {

    const generatePDF = () => {
        const docDefinition = {
            content: [
                { text: 'Données Exportées', style: 'header' },
                {
                    table: {
                        body: data,
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
            },
        };

        pdfMake.createPdf(docDefinition).download('data.pdf');
    };

    return <button onClick={generatePDF} className=" rounded-md items-center justify-center flex flex-col gap-2 ">
        <Image src={"/image/pdf.png"} width={100} height={100} alt="" className="object-cover " />
        <h1>PDF</h1>
    </button>;
};


const ExportExcelButton = ({data}: Props) => {
    const generateExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    return <button onClick={generateExcel} className=" rounded-md items-center justify-center flex flex-col gap-2 ">
        <Image src={"/image/exceller.png"} width={100} height={100} alt="" className="object-cover " />
        <h1>EXCEL</h1>
    </button>;
};


export { ExportPDFButton, ExportExcelButton, ExportCSVButton };


