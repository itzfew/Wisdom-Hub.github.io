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
    { text: 'AIATS Schedule', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/aiats/aiatsschedule.pdf' },
    { text: 'Aiats(01)-QP', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/akash/aiats-01-QP.pdf' },
    { text: 'Aiats(01)-SN', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/akash/aiats-01-SN.pdf' }
  ];

  const allenLinks = [
    { text: 'Leader Schedule', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/Leaderschedule.pdf' },
    { text: 'Leader(01)-QP', url: 'https://adrinolinks.com/allenleader1' },
    { text: 'Leader(01)-SN', url: 'https://adrinolinks.com/allenleader1S' },
    { text: 'Leader(02)-QP', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/UNIT Test-02-QP.pdf' },
    { text: 'Leader(02)-SN', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/Leader-02-SN.pdf' },
    { text: 'Leader(03)-QP', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/UNIT Test-03-QP.pdf' },
    { text: 'Leader(03)-SN', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/Leader-03-SN.pdf' },
    { text: 'Leader(04)-QP', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/UNIT Test-04-QP.pdf' },
    { text: 'Leader(04)-SN', url: 'https://itzfew.github.io/Wisdom-Hub.github.io/allen/Leader-04-SN.pdf' }
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
