const bookList = document.getElementById('bookList');
const searchInput = document.getElementById('searchInput');

async function fetchBooks(query = '') {
  try {
    const res = await fetch(`http://localhost:5000/api/books${query ? '?author=' + query : ''}`);
    if (!res.ok) throw new Error('Failed to fetch books');
    const books = await res.json();
    displayBooks(books);
  } catch (error) {
    bookList.innerHTML = `<p class="text-danger">Error loading books. Please try again later.</p>`;
    console.error(error);
  }
}

function displayBooks(books) {
  bookList.innerHTML = '';
  if (books.length === 0) {
    bookList.innerHTML = `<p class="text-muted">No books found for this author.</p>`;
    return;
  }

  books.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'col-sm-6 col-md-4 col-lg-3 fade-in';
    bookCard.style.animationDelay = `${index * 0.1}s`;

    bookCard.innerHTML = `
      <div class="card h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${book.title}</h5>
            <h6 class="card-subtitle mb-2">${book.author}</h6>
          </div>
          <p class="card-text mt-3">💲${book.price}</p>
        </div>
      </div>`;
    bookList.appendChild(bookCard);
  });
}

// Live search
searchInput.addEventListener('input', (e) => {
  fetchBooks(e.target.value.trim());
});

// Initial fetch
fetchBooks();
