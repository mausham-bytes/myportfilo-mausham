// Dark mode functionality
export function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply initial theme
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
    enableDarkMode();
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', toggleTheme);
  
  // Add transition class to all elements for smooth theme changes
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.add('theme-transition-loaded');
    }, 100);
  });
}

// Toggle between light and dark themes
function toggleTheme() {
  if (document.body.classList.contains('dark-mode')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

// Enable dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
}

// Disable dark mode
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
}

// Listen for system preference changes
function setupSystemPreferenceListener() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    if (!localStorage.getItem('theme')) {
      if (newTheme === 'dark') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
}

// Initialize system preference listener
setupSystemPreferenceListener();