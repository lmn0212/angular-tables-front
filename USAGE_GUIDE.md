# 📚 Angular Books Table Application - Usage Guide

## 🚀 Quick Start

### Option 1: Using the smart script (Recommended)
```bash
./run.sh
```

### Option 2: Using npm
```bash
npm start
```

### Option 3: Using npx
```bash
npx ng serve --open
```

## 🌐 Access the Application

Once started, open your browser and go to:
**http://localhost:4200**

## 🎯 Features Overview

### 📊 Book Table Display
- **Automatic Loading**: Books load automatically when the page opens
- **Material Design**: Professional, modern table interface
- **Responsive Layout**: Works on desktop, tablet, and mobile

### 🔍 Search Functionality
- **Real-time Search**: Type to search by book title
- **Case-insensitive**: Works regardless of capitalization
- **Dynamic Filtering**: Results update as you type

### 📈 Sorting Features
Click any column header to sort:
- **Title**: Alphabetical order (A-Z or Z-A)
- **Publication Date**: Chronological order (oldest-newest or newest-oldest)
- **Number of Pages**: Numerical order (lowest-highest or highest-lowest)

### 🎯 Row Selection
- **Click to Select**: Click any row to highlight it in blue
- **Visual Feedback**: Selected rows have blue background and left border
- **Toggle Selection**: Click again to deselect

### ➕ Add New Books
1. Click the **"Add Book"** button (blue button with + icon)
2. Fill in the required fields:
   - **Title**: Minimum 2 characters
   - **Description**: Minimum 10 characters
   - **Number of Pages**: Minimum 1 page
   - **Publication Date**: Select from date picker
3. Click **"Add Book"** to save

### ✏️ Edit Existing Books
1. Click the **edit icon** (pencil) on any book row
2. Modify the book information in the modal
3. Click **"Update Book"** to save changes

### 🗑️ Delete Books
1. Click the **delete icon** (trash) on any book row
2. Confirm the deletion in the popup dialog
3. Click **"OK"** to delete the book

### 📤 Export Features
- **Excel Export**: Click **"Export Excel"** to download as .xlsx file
- **PDF Export**: Click **"Export PDF"** to download as .pdf file
- **Filtered Data**: Only exports currently displayed/filtered books

## 🎨 User Interface Features

### Visual Design
- **Material Design**: Modern, professional appearance
- **Color-coded Actions**: 
  - Blue for edit operations
  - Red for delete operations
  - Green for success messages
- **Hover Effects**: Visual feedback on interactive elements

### Loading States
- **Spinner**: Shows while loading books from API
- **Progress Indicators**: Clear indication of ongoing operations

### Error Handling
- **User-friendly Messages**: Clear error notifications
- **Success Messages**: Confirmation of successful operations
- **Form Validation**: Real-time validation with helpful error messages

## 📱 Responsive Design

### Desktop View
- Full table with all columns visible
- Side-by-side action buttons
- Optimal spacing and typography

### Tablet View
- Responsive button layout
- Optimized column widths
- Touch-friendly interface

### Mobile View
- Stacked button layout
- Scrollable table
- Touch-optimized controls

## 🔧 Technical Features

### API Integration
- **Base URL**: `https://fakerestapi.azurewebsites.net/api/v1/Books`
- **Methods**: GET, POST, PUT, DELETE
- **Error Handling**: Comprehensive error management

### Data Management
- **TypeScript**: Full type safety
- **Reactive Programming**: RxJS for data streams
- **State Management**: Local component state

### Performance
- **Lazy Loading**: Components load as needed
- **Efficient Filtering**: Real-time search without API calls
- **Optimized Rendering**: Angular's change detection

## 🛠️ Troubleshooting

### Port Already in Use
If you see "Port 4200 is already in use":
```bash
# Use the smart script that handles this automatically
./run.sh

# Or manually kill processes
lsof -ti:4200 | xargs kill -9
npm start
```

### Application Not Loading
1. Check if the development server is running
2. Verify the browser is pointing to `http://localhost:4200`
3. Check the terminal for any error messages

### API Errors
- The application uses a fake API that may occasionally be unavailable
- Check the browser console for detailed error messages
- The application will show user-friendly error notifications

## 📋 Keyboard Shortcuts

- **Ctrl+C**: Stop the development server
- **F5**: Refresh the page
- **Ctrl+F**: Browser search (can be used to find books)

## 🎯 Best Practices

### Using the Search
- Type slowly to see real-time results
- Clear the search field to show all books
- Search is case-insensitive

### Sorting
- Click column headers to sort
- Click again to reverse sort order
- Sort works with filtered results

### Exporting
- Apply filters first, then export
- Only filtered/displayed books are exported
- Files download to your default download folder

## 🚀 Development Commands

### Start Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Install Dependencies
```bash
npm install
```

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all dependencies are installed
3. Ensure you're using a modern browser
4. Check the terminal for compilation errors

The application is designed to be user-friendly and provide clear feedback for all operations! 