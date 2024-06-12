
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function searchFuction (e: any, setActif: any, setQuery: any, table: any[], tableElement: any, setResults: any) {
  const searchTerm = e.target.value;
  if(searchTerm.trim() !== '') {
      setActif(true)
      setQuery(searchTerm);
      // Simulation d'une recherche avec un tableau de données statique
      const filteredResults = table.filter(item =>
          item.tableElement.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
  }
  else  {
      setActif(false)
      setQuery('');
      setResults([]);
  }

};


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
