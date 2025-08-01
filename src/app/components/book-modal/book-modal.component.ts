import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss']
})
export class BookModalComponent implements OnInit {
  bookForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { book?: Book }
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      pageCount: ['', [Validators.required, Validators.min(1)]],
      publishDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data?.book) {
      this.isEditMode = true;
      this.bookForm.patchValue({
        title: this.data.book.title,
        description: this.data.book.description,
        pageCount: this.data.book.pageCount,
        publishDate: this.data.book.publishDate
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      if (this.isEditMode && this.data.book) {
        bookData.id = this.data.book.id;
      }
      this.dialogRef.close(bookData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.bookForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('minlength')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field?.errors?.['minlength'].requiredLength} characters`;
    }
    if (field?.hasError('min')) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field?.errors?.['min'].min}`;
    }
    return '';
  }
} 