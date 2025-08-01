import { Routes } from '@angular/router';
import { BooksTableComponent } from './components/books-table/books-table.component';

export const routes: Routes = [
  { path: '', component: BooksTableComponent },
  { path: '**', redirectTo: '' }
];
