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

// --- 4. Auto-Generate Photo Gallery (Runs only on main.html) ---
const photoGallery = document.getElementById('photoGallery');

if (photoGallery) {
  // Pulling the exact 38 photos from the "memories" folder
  const totalPhotos = 38; 
  
  for (let i = 1; i <= totalPhotos; i++) {
    const img = document.createElement('img');
    
    // Points directly to your memories folder
    img.src = `memories/${i}.jpg`; 
    
    img.className = 'gallery-img';
    img.alt = `Memory ${i}`;
    
    // Ensures fast loading on her phone
    img.loading = 'lazy'; 
    
    photoGallery.appendChild(img);
  }
}
