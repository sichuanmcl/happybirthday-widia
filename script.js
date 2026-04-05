const confettiBtn = document.getElementById('confettiBtn');
const playBtn = document.getElementById('playSong');

const song = new Audio('https://raw.githubusercontent.com/sichuanmcl/happybirthday-widia/main/assets/the_mountain-happy-birthday-508020.mp3');
let currentSlide = 0;
let idleTimeout;

const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.carousel-indicator');
const carouselInner = document.querySelector('.carousel-inner');

confettiBtn.addEventListener('click', () => {
  // multi-shot confetti
  const duration = 2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    const particleCount = 40 * (timeLeft / duration);
    // left burst
    confetti(Object.assign({}, defaults, { particleCount: Math.floor(particleCount), origin: { x: 0.1, y: 0.4 } }));
    // center burst
    confetti(Object.assign({}, defaults, { particleCount: Math.floor(particleCount), origin: { x: 0.5, y: 0.3 } }));
    // right burst
    confetti(Object.assign({}, defaults, { particleCount: Math.floor(particleCount), origin: { x: 0.9, y: 0.4 } }));
  }, 250);
  // small visual feedback
  confettiBtn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 360 });
});

playBtn.addEventListener('click', () => {
  if (!song) return;
  if (song.paused) {
    song.currentTime = 0;
    song.play();
    playBtn.textContent = 'Play Song';
  } else {
    song.pause();
    playBtn.textContent = 'Pause Song';
  }
});

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlide();
}

function updateSlide() {
  carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
  slides.forEach((slide, index) => {
    if (index === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });

  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => {
    nextSlide();
  }, 3000);
}

carouselInner.addEventListener('touchstart', () => {
  clearTimeout(idleTimeout);
});

carouselInner.addEventListener('touchend', () => {
  idleTimeout = setTimeout(() => {
    nextSlide();
  }, 3000);
});

idleTimeout = setTimeout(() => {
  nextSlide();
}, 3000);