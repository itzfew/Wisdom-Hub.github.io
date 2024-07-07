window.onload = function() {
    const storageKey = 'hasVisited';
    const visitTime = localStorage.getItem(storageKey);

    if (visitTime) {
        const currentTime = new Date().getTime();
        const tenMinutes = 10 * 60 * 1000;

        if (currentTime - visitTime > tenMinutes) {
            // Remove the old timestamp
            localStorage.removeItem(storageKey);
            // Redirect to adrinolinks.com
            window.location.href = 'https://adrinolinks.com';
        }
    } else {
        // Store the visit timestamp
        localStorage.setItem(storageKey, new Date().getTime());
        // Redirect to adrinolinks.com
        window.location.href = 'https://adrinolinks.com';
    }
};
