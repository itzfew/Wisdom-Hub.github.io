document.addEventListener('DOMContentLoaded', function() {
  // Check if user has visited adrinolinks.com
  const hasVisited = localStorage.getItem('visitedAdrinoLinks');

  if (hasVisited) {
    // User has visited before, show content
    document.getElementById('content').style.display = 'block';
  } else {
    // Redirect to adrinolinks.com
    window.location.href = 'https://adrinolinks.com//visit1';
  }

  // Store visit in local storage
  localStorage.setItem('visitedAdrinoLinks', true);

  // Remove local storage after 30 minutes
  setTimeout(function() {
    localStorage.removeItem('visitedAdrinoLinks');
    // Redirect again to adrinolinks.com
    window.location.href = 'https://adrinolinks.com//visit1';
  }, 30 * 60 * 1000); // 30 minutes in milliseconds

  // Dummy data for dropdowns (replace with your actual data)
  const akashLinks = [
    { text: 'Link 1', url: 'https://example.com/link1' },
    { text: 'Link 2', url: 'https://example.com/link2' },
    { text: 'Link 3', url: 'https://example.com/link3' }
  ];

  const allenLinks = [
    { text: 'Link A', url: 'https://example.com/linkA' },
    { text: 'Link B', url: 'https://example.com/linkB' },
    { text: 'Link C', url: 'https://example.com/linkC' }
  ];

  // Function to populate dropdown content
  function populateDropdown(dropdownId, links) {
    const dropdownContent = document.getElementById(dropdownId);
    dropdownContent.innerHTML = ''; // Clear previous content
    links.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.textContent = link.text;
      dropdownContent.appendChild(linkElement);
    });
  }

  // Show dropdown content on button click
  document.getElementById('akashDropdown').previousElementSibling.addEventListener('click', function() {
    document.getElementById('akashDropdown').classList.toggle('show');
  });

  document.getElementById('allenDropdown').previousElementSibling.addEventListener('click', function() {
    document.getElementById('allenDropdown').classList.toggle('show');
  });

  // Populate dropdowns with links
  populateDropdown('akashDropdown', akashLinks);
  populateDropdown('allenDropdown', allenLinks);
});
