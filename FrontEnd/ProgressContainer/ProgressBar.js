const progressBar = document.getElementById('progressBar');
let simulatedProgress = 0;

// Initial animation
progressBar.style.width = '0%';
progressBar.style.transition = 'width 2s ease';

// Simulated loading progress
let index=0;
const simulateProgress = () => {
    simulatedProgress += index * 10;
    if(simulatedProgress < 90) {
        progressBar.style.width = simulatedProgress + '%';
        setTimeout(simulateProgress, 1000);
    }
    index++
};

// Start simulated progress
// setTimeout(simulateProgress,1000);

// When page is fully loaded
window.addEventListener('load', () => {
    // Complete the progress bar
    progressBar.style.width = '100%';
    // progressBar.style.transition = 'width 0.3s ease-out';

    // Add loaded class to show content
    document.documentElement.classList.add('loaded');

    // Remove progress bar after animation
    setTimeout(() => {
        document.querySelector('.progress-container').remove();
    }, 2000);
});

// Fallback in case load event doesn't fire
// setTimeout(() => {
//     document.documentElement.classList.add('loaded');
//     document.querySelector('.progress-container').remove();
// }, 5000);