document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
    });
    
    document.getElementById('removeBookForm').addEventListener('submit', function(event) {
        event.preventDefault();
        removeBook();
    });
    
    displayBooks();
});

function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const bookId = document.getElementById('book_id').value;
    
    let books = getBooksFromStorage();
    books.push({title: title, author: author, bookId: bookId});
    saveBooksToStorage(books);
    displayBooks();
}

function removeBook() {
    const removeId = document.getElementById('remove_id').value;
    
    let books = getBooksFromStorage();
    books = books.filter(book => book.bookId !== removeId);
    saveBooksToStorage(books);
    displayBooks();
}

function displayBooks() {
    const books = getBooksFromStorage();
    const bookListDiv = document.getElementById('bookList');
    bookListDiv.innerHTML = '';

    if (books.length > 0) {
        const ul = document.createElement('ul');
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = `Title: ${book.title}, Author: ${book.author}, ID: ${book.bookId}`;
            ul.appendChild(li);
        });
        bookListDiv.appendChild(ul);
    } else {
        bookListDiv.textContent = 'No books available.';
    }
}

function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books') || '[]');
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}
