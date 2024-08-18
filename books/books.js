document.addEventListener('DOMContentLoaded', () => {
    const books = [
        {
            title: 'NEET 11 YEARS PYQ CHAPTERWISE',
            image: 'https://itzfew.github.io/Wisdom-Hub.github.io/books/Img/neetpyq11.png',
            examName: 'NEET',
            downloadLink: 'https://adrinolinks.com/11yearsneet'
        },
        {
            title: 'Advanced Physics',
            image: 'https://via.placeholder.com/200x300?text=Physics',
            examName: 'Physics Exam',
            downloadLink: 'https://example.com/physics.pdf'
        },
        {
            title: 'Introduction to Chemistry',
            image: 'https://via.placeholder.com/200x300?text=Chemistry',
            examName: 'Chemistry Exam',
            downloadLink: 'https://example.com/chemistry.pdf'
        }
        // Add more books as needed
    ];

    const booksPerPage = 5;
    let currentPage = 1;
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const categoryFilter = document.getElementById('category-filter');
    const modal = document.getElementById('book-modal');
    const closeModal = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalExamName = document.getElementById('modal-exam-name');
    const modalDownloadLink = document.getElementById('modal-download-link');

    function renderBooksForPage(filteredBooks, page) {
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        renderBooks(filteredBooks.slice(startIndex, endIndex));
    }

    function updatePaginationControls(filteredBooks) {
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = (currentPage * booksPerPage) >= filteredBooks.length;
        document.getElementById('page-info').textContent = `Page ${currentPage}`;
    }

    function openModal(book) {
        modalImage.src = book.image;
        modalTitle.textContent = book.title;
        modalExamName.textContent = book.examName;
        modalDownloadLink.href = book.downloadLink;
        modal.style.display = 'block';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    function renderBooks(filteredBooks) {
        bookList.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.examName}</p>
                <a href="${book.downloadLink}" download>Download PDF</a>
                <button class="view-details">View Details</button>
            `;

            bookElement.querySelector('.view-details').addEventListener('click', () => openModal(book));
            bookList.appendChild(bookElement);
        });
        updatePaginationControls(filteredBooks);
    }

    function sortBooks(books, criterion) {
        return books.slice().sort((a, b) => a[criterion].localeCompare(b[criterion]));
    }

    function filterBooks(query, category) {
        return books.filter(book => 
            (category === '' || book.examName.includes(category)) &&
            (book.title.toLowerCase().includes(query.toLowerCase()) || 
            book.examName.toLowerCase().includes(query.toLowerCase()))
        );
    }

    function handleSearch() {
        const query = searchInput.value;
        const category = categoryFilter.value;
        const filteredBooks = filterBooks(query, category);
        renderBooksForPage(filteredBooks, currentPage);
    }

    searchInput.addEventListener('input', handleSearch);
    sortSelect.addEventListener('change', () => {
        const criterion = sortSelect.value;
        const filteredBooks = sortBooks(filterBooks(searchInput.value, categoryFilter.value), criterion);
        renderBooksForPage(filteredBooks, currentPage);
    });

    categoryFilter.addEventListener('change', handleSearch);

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            const filteredBooks = filterBooks(searchInput.value, categoryFilter.value);
            renderBooksForPage(filteredBooks, currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const filteredBooks = filterBooks(searchInput.value, categoryFilter.value);
        if (currentPage * booksPerPage < filteredBooks.length) {
            currentPage++;
            renderBooksForPage(filteredBooks, currentPage);
        }
    });

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    // Initial render
    renderBooksForPage(books, currentPage);
});
