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
                    link.href = actualLink;
                    setTimeout(() => {
                        link.href = `https://adrinolinks.in?target=${encodeURIComponent(item.url)}`;
                    }, 2 * 60 * 1000); // 2 minutes
                    window.open(actualLink, '_blank');
                });

                linkDiv.appendChild(link);
                linkContainer.appendChild(linkDiv);
            });
        })
        .catch(error => console.error('Error fetching the links:', error));
});
