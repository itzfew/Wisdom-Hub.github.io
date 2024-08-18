document.addEventListener('DOMContentLoaded', () => {
    const books = [
        {
            title: 'NEET 11 YEARS PYQ CHAPTERWISE',
            examName: 'NEET',
            downloadLink: 'https://example.com/11yearsneet'
        },
        {
            title: 'Advanced Physics',
            examName: 'Physics Exam',
            downloadLink: 'https://example.com/physics.pdf'
        },
        {
            title: 'Introduction to Chemistry',
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
    const canvas = document.createElement('canvas');
    canvas.width = 220; // Match the width of the .book element
    canvas.height = 330; // Adjust height as needed
    const ctx = canvas.getContext('2d');

    function generateBookImage(title, examName) {
        const width = canvas.width;
        const height = canvas.height;

        // Clear the canvas
        ctx.clearRect(0, 0, width, height);

        // Draw the book texture
        ctx.fillStyle = '#f4f4f4'; // Light book texture color
        ctx.fillRect(0, 0, width, height);

        // Add a gradient border
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#007bff'); // Blue color
        gradient.addColorStop(1, '#0056b3'); // Darker blue
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);

        // Draw title text
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333'; // Dark color for text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        wrapText(ctx, title, width / 2, 20, width - 20, 22);

        // Draw exam name text
        ctx.font = 'italic 14px Arial';
        ctx.fillStyle = '#666'; // Slightly lighter color for text
        ctx.textBaseline = 'bottom';
        ctx.fillText(examName, width / 2, height - 20);

        // Return the data URL of the generated image
        return canvas.toDataURL('image/png');
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = context.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && i > 0) {
                lines.push(line);
                line = words[i] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        for (let j = 0; j < lines.length; j++) {
            context.fillText(lines[j], x, y + (j * lineHeight));
        }
    }

    async function generateDownloadLink(originalUrl) {
        const date = new Date();
        const pdfId = `pdf-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${Math.random().toString(36).substr(2, 9)}`;
        const alias = `${pdfId}-${encodeURIComponent(originalUrl.split('/').pop().split('.')[0])}`;

        try {
            const response = await fetch(`https://adrinolinks.com/api?api=5a2539904639474b5f3da41f528199204eb76f65&url=${encodeURIComponent(originalUrl)}&alias=${alias}`);
            const data = await response.json();
            if (data.status === 'success') {
                return data.shortenedUrl;
            } else {
                console.error('API Error:', data);
                return originalUrl; // Fallback to original URL
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            return originalUrl; // Fallback to original URL
        }
    }

    function openModal(book) {
        modalImage.src = generateBookImage(book.title, book.examName);
        modalTitle.textContent = book.title;
        modalExamName.textContent = book.examName;
        generateDownloadLink(book.downloadLink).then(shortenedUrl => {
            modalDownloadLink.href = shortenedUrl;
            modalDownloadLink.textContent = 'Download PDF';
        });
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

            // Generate image URL
            const imageUrl = generateBookImage(book.title, book.examName);

            bookElement.innerHTML = `
                <img src="${imageUrl}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.examName}</p>
                <a href="#" class="download-link">Download PDF</a>
                <button class="view-details">View Details</button>
            `;

            bookElement.querySelector('.view-details').addEventListener('click', () => openModal(book));
            bookElement.querySelector('.download-link').addEventListener('click', (event) => {
                event.preventDefault();
                generateDownloadLink(book.downloadLink).then(shortenedUrl => {
                    window.location.href = shortenedUrl;
                });
            });
            bookList.appendChild(bookElement);
        });
        updatePaginationControls(filteredBooks);
    }

    function renderBooksForPage(filteredBooks, page) {
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = Math.min(startIndex + booksPerPage, filteredBooks.length);
        renderBooks(filteredBooks.slice(startIndex, endIndex));
        document.getElementById('page-info').textContent = `Page ${page}`;
        document.getElementById('prev-page').disabled = page === 1;
        document.getElementById('next-page').disabled = endIndex >= filteredBooks.length;
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
