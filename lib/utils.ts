
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//search function
export function searchFunction (setQuery: any, data: any[], element: any, setResults: any ,e: React.ChangeEvent<HTMLInputElement>): any {
  const searchTerm = e.target.value;
  if (searchTerm.trim() !== '') {
      setQuery(searchTerm);
      // Simulation d'une recherche avec un tableau de données statique
      const filteredResults = data.filter(item =>
          item[element].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
  }
  else {
      setQuery('');
      setResults([]);
  }

}


export function downloadPDF  (refpdf: any) {
  const input: any = refpdf.current;
  html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
      const  imgX = (pdfWidth - imgWidth * ratio) /2
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);
      pdf.save('SeBco_invoice.pdf');
  });
}

export const onGetExportProduct = async (data: any[], setLoading: any, title?: string, worksheetname?: string) => {
  try {
    setLoading(true);
    const response = await fetch('https://fakestoreapi.com/products');
    // Check if the action result contains data and if it's an array
    if (data && Array.isArray(data)) {
      const dataToExport = data.map((pro: any) => ({
        title: pro.title,
        price: pro.lastname,
        category: pro.category,
        description: pro.description,
      })
        ,);
      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("#==================Export Error")
    }
  } catch (error: any) {
    setLoading(false);
    console.log("#==================Export Error", error.message);

  }
};