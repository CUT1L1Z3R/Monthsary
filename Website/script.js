// ==========================================
// 1. RUNAWAY BUTTON LOGIC & REDIRECT
// ==========================================
const catchMeBtn = document.getElementById('catchMeBtn');

if (catchMeBtn) {
  // The Runaway Math!
  catchMeBtn.addEventListener('mouseover', () => {
    // Tease her when she misses!
    catchMeBtn.textContent = "Oops, missed! 😝";

    // Lock position to the viewport and clear old rules
    catchMeBtn.style.position = 'fixed';
    catchMeBtn.style.bottom = 'auto';
    catchMeBtn.style.right = 'auto';
    
    const btnWidth = catchMeBtn.offsetWidth || 150;
    const btnHeight = catchMeBtn.offsetHeight || 50;
    
    // The 40px strict safety buffer so it NEVER touches the edge
    const maxX = window.innerWidth - btnWidth - 40; 
    const maxY = window.innerHeight - btnHeight - 40;
    
    // Random math locking it to the screen bounds
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));
    
    // Apply new coordinates
    catchMeBtn.style.left = randomX + 'px';
    catchMeBtn.style.top = randomY + 'px';
  });

  // What happens when she finally clicks it!
  catchMeBtn.addEventListener('click', () => {
    // Instantly sends her to the main surprise page!
    window.location.href = 'main.html';
  });
}

// ==========================================
// 2. ANTI-SNOOPING (HACKER PROTECTION)
// ==========================================
// Disable Right-Click
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable F12 and Inspect Element
document.addEventListener('keydown', event => {
  if (event.key === "F12") return event.preventDefault(), false;
  if (event.ctrlKey && event.shiftKey && (event.key.toLowerCase() === 'i' || event.key.toLowerCase() === 'j')) return event.preventDefault(), false;
  if (event.ctrlKey && event.key.toLowerCase() === 'u') return event.preventDefault(), false;
});

// ==========================================
// 3. FLOATING HEARTS ANIMATION (CANVAS)
// ==========================================
const canvas = document.getElementById("hearts");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  // Resize canvas to fill the screen
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  // Create Heart Objects
  class Heart {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.size = Math.random() * 15 + 5;
      this.speed = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.y -= this.speed;
      // Reset heart to the bottom if it floats off the top
      if (this.y < -50) {
        this.y = canvas.height + 50;
        this.x = Math.random() * canvas.width;
      }
    }
    draw() {
      ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Spawn 50 hearts
  for (let i = 0; i < 50; i++) particles.push(new Heart());

  // Animate loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}
