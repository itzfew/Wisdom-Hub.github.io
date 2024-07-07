document.addEventListener('DOMContentLoaded', () => {
    const linkContainer = document.getElementById('link-container');

    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const linkDiv = document.createElement('div');
                linkDiv.className = 'link-item';

                const link = document.createElement('a');
                link.href = `https://adrinolinks.in?target=${encodeURIComponent(item.url)}`;
                link.textContent = item.text;
                link.target = '_blank';

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const actualLink = item.url;
                    const linkKey = `link_${btoa(actualLink)}`;
                    const now = new Date().getTime();

                    const lastVisit = localStorage.getItem(linkKey);

                    if (lastVisit && now - lastVisit < 2 * 60 * 1000) {
                        // If less than 2 minutes have passed since last visit, open actual link
                        window.open(actualLink, '_blank');
                    } else {
                        // Redirect to adrinolinks.in and set the unlock time
                        window.open(`https://adrinolinks.in?target=${encodeURIComponent(actualLink)}`, '_blank');
                        localStorage.setItem(linkKey, now);
                    }
                });

                linkDiv.appendChild(link);
                linkContainer.appendChild(linkDiv);
            });
        })
        .catch(error => console.error('Error fetching the links:', error));
});
