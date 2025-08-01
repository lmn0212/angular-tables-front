# Angular Books Table Application

A comprehensive Angular application for managing books with advanced features including search, sorting, CRUD operations, and export functionality.

## Features

### Core Functionality
- **Book Management**: Display, add, edit, and delete books
- **Dynamic Search**: Real-time search by book title as you type
- **Advanced Sorting**: Sort by title, publication date, and number of pages
- **Row Selection**: Click to select and highlight books with visual feedback
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Modal Operations
- **Add New Book**: Modal form for creating new books
- **Edit Existing Book**: Modal form pre-populated with book data
- **Form Validation**: Required fields with proper error messages
- **User-Friendly Interface**: Clean, intuitive form design

### Export Features
- **Excel Export**: Export filtered books to Excel format
- **PDF Export**: Export filtered books to PDF format
- **Filtered Data**: Only exports currently displayed/filtered books

### Technical Features
- **Angular Material**: Modern UI components and design
- **TypeScript**: Type-safe development
- **HTTP Client**: RESTful API integration
- **Reactive Forms**: Advanced form handling
- **Error Handling**: Comprehensive error management
- **Loading States**: User feedback during operations

## API Integration

The application integrates with the Fake REST API:
- **Base URL**: `https://fakerestapi.azurewebsites.net/api/v1/Books`
- **Endpoints**: GET, POST, PUT, DELETE operations
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

### Searching
- Type in the search field to filter books by title
- Search is case-insensitive and works in real-time
- Clear the search field to show all books

### Sorting
- Click on column headers to sort by:
  - Title (alphabetical)
  - Publication Date (chronological)
  - Number of Pages (numerical)
- Click again to reverse sort order

### Selecting Books
- Click on any row to select/highlight a book
- Selected books are highlighted in blue
- Click again to deselect

### Adding Books
1. Click the "Add Book" button
2. Fill in the required fields:
   - Title (minimum 2 characters)
   - Description (minimum 10 characters)
   - Number of Pages (minimum 1)
   - Publication Date
3. Click "Add Book" to save

### Editing Books
1. Click the edit icon (pencil) on any book row
2. Modify the book information in the modal
3. Click "Update Book" to save changes

### Deleting Books
1. Click the delete icon (trash) on any book row
2. Confirm the deletion in the popup dialog

### Exporting Data
- **Excel Export**: Click "Export Excel" to download filtered books as .xlsx
- **PDF Export**: Click "Export PDF" to download filtered books as .pdf
- Only currently displayed/filtered books are exported

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
│   ├── app.module.ts
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
- **jspdf**: PDF generation
- **jspdf-autotable**: PDF table formatting

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

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
