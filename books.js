 document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { title: '11 Years NEET PYQ', downloadLink: 'https://drive.google.com/drive/folders/1nW33hL87BTTZt-TMCRi6x-YRwDQ1ZBAY', examName: 'NEET' },
        { title: '33 Years NEET PYQ', downloadLink: 'https://drive.google.com/drive/folders/1nTLeTTRO8m4RDKfJY8mtJ74P_E7chzVx', examName: 'NEET' },
        { title: '45 Days Crash Course', downloadLink: 'https://drive.google.com/drive/folders/14Bs9AwzgAIOUEjwW6unVkFnluqDsdUQW', examName: 'NEET' },
        { title: 'Akash Mindmaps', downloadLink: 'https://drive.google.com/drive/folders/1nnuvmyZCOOzDQOTG5OgSiWIZacBsQTCK', examName: 'NEET' },
        { title: 'Akash Modules', downloadLink: 'https://drive.google.com/drive/folders/1nQgjv5LsE0Mc-Yy6J40lpmlDBxu7hn3Z', examName: ['NEET', 'AKASH'] },
        { title: 'Akash Test Series', downloadLink: 'https://drive.google.com/drive/folders/1nCgD_HXNlKel6cbCPXHuelazG730v9AF', examName: ['NEET', 'AKASH'] },
        { title: 'Allen Modules', downloadLink: 'https://drive.google.com/drive/folders/1nNOPW1OUniPt2JFCZwS8Er0Rso78GeNE', examName: ['NEET', 'Allen'] },
        { title: 'Allen Test Series', downloadLink: 'https://drive.google.com/drive/folders/1nHtAPGDqxfFe9rS4Stf1QJ85xnsYRFg8', examName: ['NEET', 'ALLEN'] },
        { title: 'Hacks by Parthgoyal', downloadLink: 'https://drive.google.com/drive/folders/1niJChK5JuUXyuaOaS95zY2KiT0CXF3ZH', examName: 'NEET' }
        // Add more books as needed
    ];

    const booksPerPage = 6;
    let currentPage = 1;
    let filteredBooks = books;

    const bookList = document.getElementById('book-list');
    const categoryFilter = document.getElementById('category-filter');
    const modal = document.getElementById('book-modal');
    const closeModal = document.getElementById('close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalExamName = document.getElementById('modal-exam-name');
    const modalDownloadLink = document.getElementById('modal-download-link');

    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 330;
    const ctx = canvas.getContext('2d');

    function generateBookImage(title, examName) {
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#f4f4f4';
        ctx.fillRect(0, 0, width, height);

        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#007bff');
        gradient.addColorStop(1, '#0056b3');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, width, height);

        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        wrapText(ctx, title, width / 2, 20, width - 20, 22);

        ctx.font = 'italic 14px Arial';
        ctx.fillStyle = '#666';
        ctx.textBaseline = 'bottom';
        ctx.fillText(examName, width / 2, height - 20);

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

    function renderBooksForPage(page) {
        const startIndex = (page - 1) * booksPerPage;
        const endIndex = startIndex + booksPerPage;
        renderBooks(filteredBooks.slice(startIndex, endIndex));
    }

    function updatePaginationControls() {
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = (currentPage * booksPerPage) >= filteredBooks.length;
        document.querySelector('.page-info').textContent = `Page ${currentPage} of ${Math.ceil(filteredBooks.length / booksPerPage)}`;
    }

    function openModal(book) {
        modalImage.src = generateBookImage(book.title, book.examName);
        modalTitle.textContent = book.title;
        modalExamName.textContent = book.examName;

        const baseUrl = 'https://adrinolinks.in/st?api=5a2539904639474b5f3da41f528199204eb76f65&url=';
        const downloadUrl = baseUrl + book.downloadLink;

        modalDownloadLink.href = downloadUrl;
        modalDownloadLink.textContent = 'Download PDF';

        modal.style.display = 'flex';
    }

    function closeModalHandler() {
        modal.style.display = 'none';
    }

    function renderBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            const imageUrl = generateBookImage(book.title, book.examName);

            bookElement.innerHTML = `
                <img src="${imageUrl}" alt="${book.title}">
                <h2>${book.title}</h2>
                <p>${book.examName}</p>
                <a href="#" class="download-button" data-link="${book.downloadLink}">Download PDF</a>
                <button class="view-details">View Details</button>
            `;

            bookElement.querySelector('.download-button').addEventListener('click', (event) => {
                event.preventDefault();
                const baseUrl = 'https://adrinolinks.in/st?api=5a2539904639474b5f3da41f528199204eb76f65&url=';
                const downloadUrl = baseUrl + event.target.getAttribute('data-link');
                window.open(downloadUrl, '_blank');
            });

            bookElement.querySelector('.view-details').addEventListener('click', () => openModal(book));
            bookList.appendChild(bookElement);
        });
        updatePaginationControls();
    }

    function filterBooks(category) {
        filteredBooks = books.filter(book =>
            category === '' || (Array.isArray(book.examName) ? book.examName.includes(category) : book.examName === category)
        );
        renderBooksForPage(1); // Reset to first page
    }

    function handleFilterChange() {
        const category = categoryFilter.value;
        filterBooks(category);
    }

    categoryFilter.addEventListener('change', handleFilterChange);

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderBooksForPage(currentPage);
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage * booksPerPage < filteredBooks.length) {
            currentPage++;
            renderBooksForPage(currentPage);
        }
    });

    closeModal.addEventListener('click', closeModalHandler);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalHandler();
        }
    });

    // Initial render
    renderBooksForPage(currentPage);
});
