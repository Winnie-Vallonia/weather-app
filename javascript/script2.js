// Font size adjustment
document.getElementById('increase-font').addEventListener('click', function() {
    changeFontSize(1.15); // Increase font size
});
  
document.getElementById('decrease-font').addEventListener('click', function() {
    changeFontSize(0.95); // Decrease font size
});
  
function changeFontSize(factor) {
    let body = document.body;
    let currentFontSize = window.getComputedStyle(body).fontSize;
    let newFontSize = parseFloat(currentFontSize) * factor;
    body.style.fontSize = `${newFontSize}px`;
}
  
// Apply saved theme on page load
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Theme toggle functionality
document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    // Save theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
