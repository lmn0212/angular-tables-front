# Angular Books Table Application

A comprehensive Angular application for managing books with advanced features including search, sorting, pagination, CRUD operations, and export functionality.

## Features

### Core Functionality
- **Book Management**: Display and add books
- **Dynamic Search**: Real-time search by book title as you type
- **Advanced Sorting**: 
  - Natural sorting for titles (text first, then numbers)
  - Sort by publication date (chronological)
  - Sort by number of pages (numerical)
- **Pagination**: Navigate through large datasets with configurable page sizes
- **Row Selection**: Click to select and highlight books with visual feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Modal Operations
- **Add New Book**: Modal form for creating new books
- **Form Validation**: Required fields with proper error messages
- **User-Friendly Interface**: Clean, intuitive form design
- **Focus Management**: Proper focus handling after modal operations

### Export Features
- **Excel Export**: Export current page books to Excel format
- **PDF Export**: Export current page books to PDF format
- **Page-Specific Export**: Only exports books currently visible on the current page
- **Export Feedback**: Shows number of items exported in success message

### Technical Features
- **Angular Material**: Modern UI components and design
- **TypeScript**: Type-safe development
- **HTTP Client**: RESTful API integration
- **Reactive Forms**: Advanced form handling
- **Error Handling**: Comprehensive error management
- **Loading States**: User feedback during operations
- **Date Picker**: Native date selection with proper validation

## API Integration

The application integrates with the Fake REST API:
- **Base URL**: `https://fakerestapi.azurewebsites.net/api/v1/Books`
- **Endpoints**: GET (fetch books), POST (create new books)
- **Data Structure**: Books with title, description, page count, and publication date

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd angular-tables
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   ng serve
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

## Usage

### Viewing Books
- The application loads books automatically when started
- Books are displayed in a sortable table format
- Use pagination to navigate through large datasets
- Default page size is 25 items per page

### Searching
- Type in the search field to filter books by title
- Search is case-insensitive and works in real-time
- Clear the search field to show all books
- Search results are automatically paginated

### Sorting
- Click on column headers to sort by:
  - **Title**: Natural sorting (text first, then numbers)
    - Example: "Book 1", "Book 2", "Book 10", "Book 20"
  - **Publication Date**: Chronological order
  - **Number of Pages**: Numerical order
- Click again to reverse sort order
- Sorting works with pagination and search

### Pagination
- **Page Size Options**: 25, 50, 100, 200 items per page
- **Navigation**: First, previous, next, and last page buttons
- **Page Information**: Shows current page and total items
- **Responsive**: Pagination adapts to current data and filters

### Selecting Books
- Click on any row to select/highlight a book
- Selected books are highlighted in blue
- Click again to deselect
- Selection persists across pagination and sorting

### Adding Books
1. Click the "Add Book" button
2. Fill in the required fields:
   - Title (minimum 2 characters)
   - Description (minimum 10 characters)
   - Number of Pages (minimum 1)
   - Publication Date (using date picker)
3. Click "Add Book" to save
4. New books appear at the top of the table
5. Automatically resets to first page to show new book

### Exporting Data
- **Excel Export**: Click "Export Excel" to download current page books as .xlsx
- **PDF Export**: Click "Export PDF" to download current page books as .pdf
- **Page-Specific**: Only exports books currently visible on the current page
- **Export Feedback**: Success message shows number of items exported
- **File Naming**: Files are named "books-list-page.xlsx/pdf"

## Advanced Features

### Natural Sorting
The application implements intelligent sorting for book titles:
- **Text Priority**: Sorts by text portion first
- **Number Handling**: Sorts numbers naturally (1, 2, 10, 20)
- **Mixed Content**: Handles titles with both text and numbers
- **Fallback**: Regular alphabetical sorting for titles without numbers

### Pagination Integration
- **Search + Pagination**: Search results are properly paginated
- **Sort + Pagination**: Sorting works correctly with pagination
- **Export + Pagination**: Export only current page items
- **State Management**: Pagination state is maintained across operations

### Focus Management
- **Modal Focus**: Proper focus handling after modal operations
- **Button Focus**: Edit/delete buttons don't interfere with row selection
- **Accessibility**: Improved keyboard navigation and screen reader support

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── books-table/
│   │   │   ├── books-table.component.ts
│   │   │   ├── books-table.component.html
│   │   │   └── books-table.component.scss
│   │   └── book-modal/
│   │       ├── book-modal.component.ts
│   │       ├── book-modal.component.html
│   │       └── book-modal.component.scss
│   ├── models/
│   │   └── book.ts
│   ├── services/
│   │   ├── book.service.ts
│   │   └── export.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.config.ts
│   └── app.routes.ts
├── styles.scss
└── main.ts
```

## Dependencies

### Core Dependencies
- Angular 17.x
- Angular Material 17.x
- TypeScript

### Additional Libraries
- **xlsx**: Excel file generation
- **jspdf**: PDF generation (v2.5.1)
- **jspdf-autotable**: PDF table formatting (v3.8.2)

## Development

### Running Tests
```bash
ng test
```

### Building for Production
```bash
ng build
```

### Code Quality
The project follows Angular best practices and includes:
- TypeScript strict mode
- Angular Material design system
- Responsive design principles
- Error handling and user feedback
- Clean code architecture
- Proper data source management
- Efficient pagination and sorting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Recent Updates

### Version 2.0 Features
- **Enhanced Pagination**: Improved pagination with better state management
- **Natural Sorting**: Intelligent sorting for titles with numbers
- **Page-Specific Exports**: Export only current page items
- **Focus Management**: Better accessibility and user experience
- **Date Picker Integration**: Native date selection with proper validation
- **Performance Improvements**: Optimized data source handling
- **Better Error Handling**: Enhanced error messages and user feedback

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please create an issue in the repository.