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
  originalBooks: Book[] = [];
  selectedBook: Book | null = null;
  searchTerm: string = '';
  loading: boolean = false;
  Math = Math; // Make Math available in template

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private exportService: ExportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupDataSource();
    this.loadBooks();
  }

  ngAfterViewInit() {
    // Connect the data source to sort and paginator after view is initialized
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  setupDataSource(): void {
    // Create a new data source instance
    this.dataSource = new MatTableDataSource<Book>([]);
    
    this.dataSource.sortingDataAccessor = (item: Book, property: string) => {
      switch (property) {
        case 'publishDate':
          return new Date(item.publishDate).getTime();
        case 'pageCount':
          return Number(item.pageCount);
        default:
          return item[property as keyof Book];
      }
    };

    // Set up custom filter predicate for search
    this.dataSource.filterPredicate = (data: Book, filter: string) => {
      return data.title.toLowerCase().includes(filter.toLowerCase());
    };
  }

  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.originalBooks = books; 
        this.dataSource.data = books;
        console.log('Books loaded:', books.length);
        console.log('Data source data length:', this.dataSource.data.length);
        
        // Reconnect sort and paginator after data is loaded
        setTimeout(() => {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
        
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
    this.dataSource.filter = this.searchTerm;
  }

  selectBook(book: Book, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent click from propagating
    }
  
    if (this.selectedBook?.id === book.id) {
      this.selectedBook = null; // Deselect the book
    } else {
      this.selectedBook = book; // Select the clicked book
    }
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // Remove focus from the triggering button
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      
      if (result) {
        this.bookService.createBook(result).subscribe({
          next: (newBook) => {
            // Add the new book to the beginning of the original books array
            this.originalBooks.unshift(newBook);
            
            // Clear search term and update data source
            this.searchTerm = '';
            this.dataSource.data = [...this.originalBooks];
            
            // Reset to first page when adding new book
            if (this.paginator) {
              this.paginator.firstPage();
            }
            
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

  openEditBookDialog(book: Book, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent the click event from propagating
    }
  
    const dialogRef = this.dialog.open(BookModalComponent, {
      width: '600px',
      data: { book }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Remove focus from the triggering button
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      
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

  deleteBook(book: Book, event?: Event): void {
    if (event) {
      event.stopPropagation(); // Prevent the click event from propagating
    }
  
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
    this.exportService.exportToExcel(this.dataSource.filteredData, 'books-list');
    this.snackBar.open('Excel file exported successfully', 'Close', { duration: 3000 });
  }

  exportToPDF(): void {
    this.exportService.exportToPDF(this.dataSource.filteredData, 'books-list');
    this.snackBar.open('PDF file exported successfully', 'Close', { duration: 3000 });
  }

  isSelected(book: Book): boolean {
    return this.selectedBook?.id === book.id;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
} 