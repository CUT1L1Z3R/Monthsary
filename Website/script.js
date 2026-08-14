// --- 1. Catch Me Button Logic ---
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

// --- 2. Main Page Logic (Custom Notes & Letter) ---
const noteBtn = document.getElementById('noteBtn');
const letterBtn = document.getElementById('letterBtn');

if (noteBtn && letterBtn) {
  const noteText = document.getElementById('loveNote');
  const secretLetter = document.getElementById('secretLetter');
  
  const notes = [
    "Ikaw lang wala ng iba nag papatibok ng puso ko at utak din ehhehe jk",
    "Kahit maldita asawa ko mahal ko parin yan 😘❤️",
    "I LOVE YOU SO MUCH ASAWA NAKO 😘❤️😘❤️😘❤️",
    "Kahit seloso ako subra you still accept me that's why I love you 😘❤️",
    "Will you still accept me kahit ganito ugali ko? (Accept nalang wala kang choice AAHAHHAHAH)"
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

// --- 3. Floating Background ---
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

// --- 4. Auto-Generate Photo Gallery, Fullscreen & Auto-Scroll ---
const photoGallery = document.getElementById('photoGallery');
const photoModal = document.getElementById('photoModal');
const expandedImg = document.getElementById('expandedImg');
const closePhotoBtn = document.getElementById('closePhotoBtn');

if (photoGallery) {
  const totalPhotos = 38; 
  
  for (let i = 1; i <= totalPhotos; i++) {
    const img = document.createElement('img');
    img.src = `memories/${i}.jpg`; 
    img.className = 'gallery-img';
    img.alt = `Memory ${i}`;
    img.loading = 'lazy'; 
    img.width = 200;
    img.height = 260;
    img.style.cursor = 'pointer'; 
    
    img.addEventListener('click', () => {
      if (photoModal && expandedImg) {
        expandedImg.src = img.src;
        photoModal.classList.add('active');
      }
    });
    
    photoGallery.appendChild(img);
  }

  if (photoModal && closePhotoBtn) {
    closePhotoBtn.addEventListener('click', () => {
      photoModal.classList.remove('active');
    });
    
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        photoModal.classList.remove('active');
      }
    });
  }

  let autoScrollInterval;
  
  const startAutoScroll = () => {
    autoScrollInterval = setInterval(() => {
      if (photoGallery.scrollLeft + photoGallery.clientWidth >= photoGallery.scrollWidth - 10) {
        photoGallery.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        photoGallery.scrollBy({ left: 212, behavior: 'smooth' });
      }
    }, 2500); 
  };

  startAutoScroll();

  photoGallery.addEventListener('touchstart', () => clearInterval(autoScrollInterval));
  photoGallery.addEventListener('mouseenter', () => clearInterval(autoScrollInterval)); 

  photoGallery.addEventListener('touchend', () => {
    setTimeout(startAutoScroll, 3000); 
  });
  photoGallery.addEventListener('mouseleave', () => {
    setTimeout(startAutoScroll, 3000); 
  });
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
  bgMusic.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = '⏸️'; 
  }).catch(() => {
    isPlaying = false;
    musicBtn.textContent = '🎵'; 
    
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

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
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

// --- 8. Voice Note Player (Pauses BG Music) ---
const playVoiceBtn = document.getElementById('playVoiceBtn');
const voiceNote = document.getElementById('voiceNote');

if (playVoiceBtn && voiceNote) {
  let wasMusicPlaying = false; 

  playVoiceBtn.addEventListener('click', () => {
    if (voiceNote.paused) {
      if (bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        musicBtn.textContent = '🎵';
        wasMusicPlaying = true; 
      }
      
      voiceNote.play();
      playVoiceBtn.textContent = '⏸️ Pause Message';
    } else {
      voiceNote.pause();
      playVoiceBtn.textContent = '▶️ Play My Voice Message';
    }
  });

  voiceNote.addEventListener('ended', () => {
     playVoiceBtn.textContent = '▶️ Play My Voice Message';
     if (wasMusicPlaying && bgMusic) {
        bgMusic.play();
        musicBtn.textContent = '⏸️';
        wasMusicPlaying = false;
     }
  });
}

// --- 9. Secret Easter Egg Logic ---
const mainTitle = document.getElementById('easterEggTrigger');
const easterEggModal = document.getElementById('easterEggModal');
const closeEggBtn = document.getElementById('closeEggBtn');

if (mainTitle && easterEggModal && closeEggBtn) {
  let titleClickCount = 0;

  mainTitle.addEventListener('click', () => {
    titleClickCount++;
    if (titleClickCount === 5) {
      easterEggModal.classList.add('active');
      titleClickCount = 0; 
    }
  });

  closeEggBtn.addEventListener('click', () => {
    easterEggModal.classList.remove('active');
  });
}
