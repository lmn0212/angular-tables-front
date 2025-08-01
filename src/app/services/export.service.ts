import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  // Export to Excel
  exportToExcel(books: Book[], filename: string = 'books'): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(books);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  }

  // Export to PDF
  exportToPDF(books: Book[], filename: string = 'books'): void {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Books List', 14, 22);
    
    // Prepare table data
    const tableData = books.map(book => [
      book.title,
      book.description.substring(0, 50) + (book.description.length > 50 ? '...' : ''),
      book.pageCount.toString(),
      new Date(book.publishDate).toLocaleDateString()
    ]);

    // Add table using autoTable
    autoTable(doc, {
      head: [['Title', 'Description', 'Pages', 'Publish Date']],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 60 },
        2: { cellWidth: 20 },
        3: { cellWidth: 30 }
      }
    });

    doc.save(`${filename}.pdf`);
  }
} 