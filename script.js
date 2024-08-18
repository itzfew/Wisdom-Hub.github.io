document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('bookList');
    const searchInput = document.getElementById('search');
    const examFilter = document.getElementById('examFilter');

    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const books = data.books;
            populateBooks(books);
            populateExamOptions(books);

            searchInput.addEventListener('input', () => filterBooks(books));
            examFilter.addEventListener('change', () => filterBooks(books));
        });

    function populateBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card';
            card.innerHTML = `
                <div class="card-content">
                    <h2>${book.title}</h2>
                    <p>For: ${book.exam}</p>
                    <a href="${book.downloadLink}" download>Download</a>
                </div>
            `;
            bookList.appendChild(card);
        });
    }

    function populateExamOptions(books) {
        const exams = [...new Set(books.map(book => book.exam))];
        exams.forEach(exam => {
            const option = document.createElement('option');
            option.value = exam;
            option.textContent = exam;
            examFilter.appendChild(option);
        });
    }

    function filterBooks(books) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedExam = examFilter.value;
        const filteredBooks = books.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm);
            const matchesExam = selectedExam === '' || book.exam === selectedExam;
            return matchesSearch && matchesExam;
        });
        populateBooks(filteredBooks);
    }
});
