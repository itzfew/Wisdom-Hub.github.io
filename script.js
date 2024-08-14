document.addEventListener('DOMContentLoaded', () => {
    const books = [
        { id: 1, title: 'The Great Gatsby', price: 10, image: 'images/gatsby.jpg', description: 'A classic novel by F. Scott Fitzgerald.' },
        { id: 2, title: '1984', price: 15, image: 'images/1984.jpg', description: 'A dystopian social science fiction novel by George Orwell.' },
        { id: 3, title: 'To Kill a Mockingbird', price: 20, image: 'images/mockingbird.jpg', description: 'A novel by Harper Lee published in 1960.' }
    ];

    let cart = [];
    let discountApplied = false;
    const discountCode = 'SAVE10'; // Example discount code for 10% off

    const booksContainer = document.getElementById('books');
    const cartCount = document.getElementById('cart-count');
    const checkoutSection = document.getElementById('checkout');
    const checkoutItems = document.getElementById('checkout-items');
    const totalPriceElement = document.getElementById('total-price');
    const discountMessage = document.getElementById('discount-message');

    function renderBooks() {
        booksContainer.innerHTML = '';
        books.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <p>$${book.price}</p>
                <button onclick="addToCart(${book.id})">Add to Cart</button>
            `;
            booksContainer.appendChild(bookDiv);
        });
    }

    window.addToCart = function(id) {
        const book = books.find(b => b.id === id);
        cart.push(book);
        updateCart();
    };

    function updateCart() {
        cartCount.textContent = cart.length;
        if (cart.length > 0) {
            checkoutSection.classList.remove('hidden');
            renderCartItems();
        } else {
            checkoutSection.classList.add('hidden');
        }
    }

    function renderCartItems() {
        checkoutItems.innerHTML = '';
        const cartItems = cart.reduce((acc, item) => {
            if (!acc[item.id]) acc[item.id] = { ...item, quantity: 0 };
            acc[item.id].quantity += 1;
            return acc;
        }, {});

        let totalPrice = 0;

        for (const item of Object.values(cartItems)) {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                ${item.title} - $${item.price} x ${item.quantity}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            checkoutItems.appendChild(itemDiv);
            totalPrice += item.price * item.quantity;
        }

        if (discountApplied) {
            totalPrice *= 0.9; // 10% discount
        }

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    window.removeFromCart = function(id) {
        cart = cart.filter(book => book.id !== id);
        updateCart();
    };

    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Thank you for your purchase!');
        cart = [];
        updateCart();
        discountApplied = false;
        document.getElementById('discount-code').value = '';
        discountMessage.textContent = '';
    });

    document.getElementById('apply-discount').addEventListener('click', () => {
        const code = document.getElementById('discount-code').value;
        if (code === discountCode) {
            discountApplied = true;
            discountMessage.textContent = 'Discount applied!';
        } else {
            discountMessage.textContent = 'Invalid discount code.';
        }
        renderCartItems();
    });

    // Initial render of books
    renderBooks();
});
