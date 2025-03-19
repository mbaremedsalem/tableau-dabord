import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Virement {
  date_operation: string;
  agence: string;
  montant_debit: number;
  montant_credit: number;
  client: string;
  compte_debit: string;
  compte_credit: string;
  status: string;
}

// Export to Excel
export const exportToExcel = (data: Virement[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

// Export to PDF
export const exportToPdf = (data: Virement[], filename: string) => {
  const doc = new jsPDF();

  // Define table columns
  const tableColumn = [
    'Date Operation',
    'Agence',
    'Montant Debit',
    'Montant Credit',
    'Client',
    'Compte Debit',
    'Compte Credit',
    'Status',
  ];

  // Prepare table rows
  const tableRows: any[] = data.map((item) => [
    item.date_operation.slice(0, 10), // Format date
    item.agence,
    item.montant_debit,
    item.montant_credit,
    item.client,
    item.compte_debit,
    item.compte_credit,
    item.status,
  ]);

  // Add autoTable to the document
  (doc as any).autoTable({
    head: [tableColumn], // Table header
    body: tableRows, // Table data
    startY: 20, // Start position (top margin)
  });

  // Save the PDF
  doc.save(`${filename}.pdf`);
};