// --- 1. Catch Me Button Logic (Runs only on index.html) ---
const catchMeBtn = document.getElementById('catchMeBtn');

if (catchMeBtn) {
  let catchCount = 0;
  const teasingTexts = [
    "Oops, missed! 😝",
    "Too slow! 🐢",
    "Try again! 🤭",
    "Almost got it! 🏃‍♂️",
    "Okay, okay, click me now! 💖"
  ];

  catchMeBtn.addEventListener('click', () => {
    if (catchCount < 5) {
      catchMeBtn.style.position = 'fixed'; 
      
      const btnWidth = catchMeBtn.offsetWidth;
      const btnHeight = catchMeBtn.offsetHeight;
      const maxX = window.innerWidth - btnWidth - 20;
      const maxY = window.innerHeight - btnHeight - 20;
      
      const randomX = Math.floor(Math.random() * maxX) + 10;
      const randomY = Math.floor(Math.random() * maxY) + 10;
      
      catchMeBtn.style.left = `${randomX}px`;
      catchMeBtn.style.top = `${randomY}px`;
      
      catchMeBtn.textContent = teasingTexts[catchCount];
      catchCount++;
    } else {
      window.location.href = 'main.html';
    }
  });
}

// --- 2. Main Page Logic (Runs only on main.html) ---
const noteBtn = document.getElementById('noteBtn');
const letterBtn = document.getElementById('letterBtn');

if (noteBtn && letterBtn) {
  const noteText = document.getElementById('loveNote');
  const secretLetter = document.getElementById('secretLetter');
  
  const notes = [
    "Your laugh is literally my favorite sound in the world.",
    "How cute you look when you're focusing on something.",
    "The way you always know how to brighten up my mood.",
    "You make even the most boring errands fun.",
    "Your big heart and how caring you are to everyone.",
    "Simply because you're you, and nobody else compares."
  ];

  noteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * notes.length);
    noteText.style.opacity = '0';
    noteText.style.transform = 'scale(0.8)';
    setTimeout(() => {
      noteText.textContent = `"${notes[randomIndex]}"`;
      noteText.style.opacity = '1';
      noteText.style.transform = 'scale(1)';
    }, 250);
  });

  letterBtn.addEventListener('click', () => {
    secretLetter.classList.toggle('active');
    letterBtn.textContent = secretLetter.classList.contains('active') ? "Close Letter 🔒" : "Unlock Letter 🔐";
  });
}

// --- 3. Floating Background (Runs on BOTH pages) ---
const canvas = document.getElementById('hearts');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas(); 

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * window.innerWidth;
      this.y = window.innerHeight + Math.random() * 100;
      this.size = Math.random() * 6 + 3; 
      this.speedY = Math.random() * 1 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.5 ? '#ffffff' : '#ffb3c6';
    }
    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.02) * 0.5;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 35; i++) { particles.push(new Particle()); }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// --- 4. Auto-Generate Photo Gallery ---
const photoGallery = document.getElementById('photoGallery');

if (photoGallery) {
  const totalPhotos = 38; 
  
  for (let i = 1; i <= totalPhotos; i++) {
    const img = document.createElement('img');
    img.src = `memories/${i}.jpg`; 
    img.className = 'gallery-img';
    img.alt = `Memory ${i}`;
    img.loading = 'lazy'; 
    photoGallery.appendChild(img);
  }
}

// --- 5. Relationship Timer ---
const daysEl = document.getElementById('days');

if (daysEl) {
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

// --- 6. Smart Autoplay & Music Player Toggle ---
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

if (musicBtn && bgMusic) {
  // 1. Try to autoplay the moment she lands on the page
  bgMusic.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = '⏸️'; // Set to pause icon if it worked
  }).catch(() => {
    // 2. If her phone blocks autoplay, wait for her first tap on the screen
    isPlaying = false;
    musicBtn.textContent = '🎵'; 
    
    // Create a one-time listener that starts the music on her first touch
    const startAudioOnFirstTouch = () => {
      bgMusic.play();
      isPlaying = true;
      musicBtn.textContent = '⏸️';
      document.removeEventListener('click', startAudioOnFirstTouch);
      document.removeEventListener('touchstart', startAudioOnFirstTouch);
    };
    
    document.addEventListener('click', startAudioOnFirstTouch);
    document.addEventListener('touchstart', startAudioOnFirstTouch);
  });

  // 3. The manual play/pause button logic
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stops the button tap from triggering the background tap
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
  if(e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'img') return;

  const heart = document.createElement('div');
  heart.innerHTML = '💖';
  heart.className = 'tap-heart';
  
  heart.style.left = `${e.pageX}px`;
  heart.style.top = `${e.pageY}px`;
  
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1200);
});
