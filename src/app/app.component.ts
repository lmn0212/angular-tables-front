import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksTableComponent } from './components/books-table/books-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BooksTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-tables';
}
