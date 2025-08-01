import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ExportService } from '../../services/export.service';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss']
})
export class BooksTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'pageCount', 'publishDate', 'actions'];
  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>([]);
  filteredBooks: Book[] = [];
  selectedBook: Book | null = null;
  searchTerm: string = '';
  loading: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private exportService: ExportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.filteredBooks = books;
        this.dataSource.data = books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading books:', error);
        this.snackBar.open('Error loading books', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  applySearch(): void {
    const searchValue = this.searchTerm.toLowerCase();
    this.filteredBooks = this.dataSource.data.filter(book =>
      book.title.toLowerCase().includes(searchValue)
    );
    this.dataSource.data = this.filteredBooks;
  }

  onSortChange(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.filteredBooks;
      return;
    }

    this.dataSource.data = this.filteredBooks.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return this.compare(a.title, b.title, isAsc);
        case 'publishDate':
          return this.compare(new Date(a.publishDate), new Date(b.publishDate), isAsc);
        case 'pageCount':
          return this.compare(a.pageCount, b.pageCount, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: any, b: any, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  selectBook(book: Book): void {
    this.selectedBook = this.selectedBook?.id === book.id ? null : book;
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.createBook(result).subscribe({
          next: (newBook) => {
            this.loadBooks();
            this.snackBar.open('Book added successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error adding book:', error);
            this.snackBar.open('Error adding book', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.updateBook(book.id, result).subscribe({
          next: (updatedBook) => {
            this.loadBooks();
            this.snackBar.open('Book updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating book:', error);
            this.snackBar.open('Error updating book', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteBook(book: Book): void {
    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          this.loadBooks();
          this.snackBar.open('Book deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting book:', error);
          this.snackBar.open('Error deleting book', 'Close', { duration: 3000 });
        }
      });
    }
  }

  exportToExcel(): void {
    this.exportService.exportToExcel(this.filteredBooks, 'books-list');
    this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.filteredBooks, 'books-list');
    this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
  }

  isSelected(book: Book): boolean {
    return this.selectedBook?.id === book.id;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
} 