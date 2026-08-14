// --- 5. Relationship Timer ---
const daysEl = document.getElementById('days');

if (daysEl) {
  // Set to April 21, 2026
  const startDate = new Date('April 21, 2026 00:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('mins').textContent = mins.toString().padStart(2, '0');
      document.getElementById('secs').textContent = secs.toString().padStart(2, '0');
    }
  }

  setInterval(updateTimer, 1000);
  updateTimer(); 
}

// --- 6. Music Player Toggle ---
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

if (musicBtn && bgMusic) {
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.textContent = '🎵'; 
    } else {
      bgMusic.play();
      musicBtn.textContent = '⏸️'; 
    }
    isPlaying = !isPlaying;
  });
}

// --- 7. Tap-to-Heart Effect ---
document.addEventListener('click', (e) => {
  // We don't want hearts blocking buttons or images when tapped
  if(e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'img') return;

  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.className = 'tap-heart';
  
  // Get exact tap coordinates
  heart.style.left = `${e.pageX}px`;
  heart.style.top = `${e.pageY}px`;
  
  document.body.appendChild(heart);

  // Clean up the heart from the HTML after animation finishes
  setTimeout(() => {
    heart.remove();
  }, 1200);
});
