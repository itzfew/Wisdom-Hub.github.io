document.addEventListener('DOMContentLoaded', function() {
  // List of alternative support links
  const supportLinks = [
    'https://adrinolinks.com/support1',
    'https://adrinolinks.com/support2',
    'https://adrinolinks.com/support3',
    'https://adrinolinks.com/support4',
    'https://adrinolinks.com/support5',
    'https://adrinolinks.com/support6'
  ];

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
    { text: 'AIATS Schedule ■', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/akash/aiatsschedule.pdf' },
{ text: 'FT Schedule', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/akash/ftschedule.pdf' },

    { text: 'FT(01)-QP', url: 'https://adrinolinks.com/akashft1' },
    { text: 'FT(01)-SN', url: 'https://adrinolinks.com/akashft1S' }
  ];

  const allenLinks = [
    { text: 'Leader Schedule ■', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/Leaderschedule.pdf' },

    { text: 'Leader(01)-QP ■', url: 'https://adrinolinks.com/allenleader1' },
    { text: 'Leader(01)-SN ■', url: 'https://adrinolinks.com/allenleader1S' },
    { text: 'Leader(02)-QP', url: 'https://adrinolinks.com/allenleader2' },
    { text: 'Leader(02)-SN', url: 'https://adrinolinks.com/allenleader2S' },
    { text: 'Leader(03)-QP', url: 'https://adrinolinks.com/allenleader3' },
    { text: 'Leader(03)-SN', url: 'https://adrinolinks.com/allenleader3S' },
    { text: 'Leader(04)-QP', url: 'https://adrinolinks.com/allenleader4' },
    { text: 'Leader(04)-SN', url: 'https://adrinolinks.com/allenleader4S' }
  ];

  // Function to populate column content
  function populateLinks(containerId, links) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    links.forEach(link => {
      const linkElement = document.createElement('a');
      linkElement.href = link.url;
      linkElement.textContent = link.text;
      container.appendChild(linkElement);
    });
  }

  // Populate columns with links
  populateLinks('akashLinks', akashLinks);
  populateLinks('allenLinks', allenLinks);
});
