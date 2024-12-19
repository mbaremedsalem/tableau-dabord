import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vir-mult',
  templateUrl: './vir-mult.component.html',
  styleUrls: ['./vir-mult.component.scss']
})
export class VirMultComponent {
  searchTerm: string = '';
  isUpLoaded: boolean = true; // Par défaut, la page est la page d'accueil

  applyFilter() {
    // Apply the filter directly to the MatTableDataSource
    // this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  fileData: any[] = [];

  // Function to export data to Excel
  exportToExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'exported_data');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/octet-stream'});
    saveAs(data, fileName + '.xlsx');
  }

  // Function to handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data: Uint8Array = new Uint8Array(e.target.result);
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet contains the data
        const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
        this.fileData = XLSX.utils.sheet_to_json(worksheet);
      };
      reader.readAsArrayBuffer(file);
      this.isUpLoaded=false; 
    }
  }

  data = [
    // Example data structure
    { DOC_TYPE: 'Invoice', DOC_ID: '123', DOC_DATE: '2023-01-01', DEBTOR_ACCOUNT: '100', C_BRANCH: '002', CREDITOR_ACCOUNT: '200', C_NAME: 'John Doe', TYPE_DC: 'Debit', SUMMA: '100.00', KOD: 'A1', Beneficiary_Bic: 'BANK123', Description: 'Payment for services' },
    // Add more records as necessary
  ];

}

function saveAs(data: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

