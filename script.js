document.addEventListener('DOMContentLoaded', function() {
  // List of alternative redirect links
  const redirectLinks = [
    'https://adrinolinks.com/visit1',
    'https://adrinolinks.com/visit2',
    'https://adrinolinks.com/visit3',
    'https://adrinolinks.com/visit4'
  ];

  // Function to randomly shuffle array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the array of redirect links
  shuffleArray(redirectLinks);

  // Check if user has visited adrinolinks.com
  const hasVisited = localStorage.getItem('visitedAdrinoLinks');

  if (hasVisited) {
    // User has visited before, show content
    document.getElementById('content').style.display = 'block';
  } else {
    // Redirect to a randomly shuffled link
    window.location.href = redirectLinks[0];
  }

  // Store visit in local storage
  localStorage.setItem('visitedAdrinoLinks', true);

  // Remove local storage after 30 minutes and redirect to the next link
  setTimeout(function() {
    localStorage.removeItem('visitedAdrinoLinks');
    // Get the current redirect index from local storage
    let currentIndex = localStorage.getItem('redirectIndex') || 0;
    currentIndex = parseInt(currentIndex);

    // Increment index for the next redirect
    const nextIndex = (currentIndex + 1) % redirectLinks.length;
    localStorage.setItem('redirectIndex', nextIndex);

    // Redirect again to the next link
    window.location.href = redirectLinks[nextIndex];
  }, 30 * 60 * 1000); // 30 minutes in milliseconds

  // List of alternative support links
  const supportLinks = [
    'https://adrinolinks.com/support1',
    'https://adrinolinks.com/support2',
    'https://adrinolinks.com/support3',
    'https://adrinolinks.com/support4',
    'https://adrinolinks.com/support5',
    'https://adrinolinks.com/support6'
  ];

  // Shuffle the array of support links
  shuffleArray(supportLinks);

  // Function to open a random support link
  function openSupportLink() {
    const randomIndex = Math.floor(Math.random() * supportLinks.length);
    window.open(supportLinks[randomIndex], '_blank');
  }

  // Add event listener to the support button
  const supportButton = document.getElementById('supportButton');
  supportButton.addEventListener('click', openSupportLink);

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
