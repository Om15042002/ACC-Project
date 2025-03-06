function showNotification(message) {
    const notification = document.getElementById('notification');
    const progressBar = document.querySelector('.notification-progress-bar');
    const messageElement = document.getElementById('notification-message');
    
    messageElement.textContent = message;
    notification.classList.add('active');
    
    // Reset animation
    progressBar.style.transition = 'none';
    progressBar.offsetHeight; // Trigger reflow
    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '100%';
  
    setTimeout(() => {
      notification.classList.remove('active');
      progressBar.style.width = '0';
    }, 5000);
  }