// CHANFER Website - Main JavaScript

// ─── Language Toggle ───
let isCN = false;
function toggleLang() {
  isCN = !isCN;
  document.body.classList.toggle('cn-mode', isCN);
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = isCN ? el.dataset.cn : el.dataset.en;
    if (text) el.textContent = text;
  });
  localStorage.setItem('chanfer_lang', isCN ? 'cn' : 'en');
}
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('chanfer_lang') === 'cn') toggleLang();
});

// ─── Mobile Menu ───
function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMenu);
});

// ─── Navbar Scroll Effect ───
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── Smooth Scroll ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ─── Intersection Observer for Animations ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ─── Active Nav Link ───
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ─── YouTube Video Loader ───
function loadYouTube() {
  const iframe = document.getElementById('youtube-player');
  const cover = document.getElementById('video-cover');
  if (!iframe || !cover) return;
  
  const videoId = iframe.dataset.videoId;
  if (!videoId || videoId === 'REPLACE_WITH_YOUTUBE_VIDEO_ID') {
    alert('Please set your YouTube video ID in the HTML. Replace REPLACE_WITH_YOUTUBE_VIDEO_ID with your video ID.');
    return;
  }
  
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  iframe.style.display = 'block';
  cover.style.display = 'none';
}

// ─── WhatsApp Floating Button ───
(function() {
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/8618718916678?text=Hi%20CHANFER%2C%20I%20am%20interested%20in%20your%20detergent%20packaging%20line.';
  wa.target = '_blank';
  wa.rel = 'noopener noreferrer';
  wa.className = 'whatsapp-float';
  wa.setAttribute('aria-label', 'Chat on WhatsApp');
  wa.innerHTML = '<svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor"><path d="M16 0C7.164 0 0 7.164 0 16c0 2.83.74 5.484 2.036 7.788L0 32l8.376-2.204A15.93 15.93 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm6.308 22.72c-.272.77-.912 1.384-1.752 1.564-.48.104-1.108.188-1.808-.04-.604-.192-1.764-.72-3.364-2.216-1.66-1.552-2.776-3.476-3.096-4.292a3.42 3.42 0 01-.272-2.58c.18-.54.504-.984.852-1.332l.008-.008c.228-.232.464-.352.684-.44.168-.068.34-.116.496-.156.144-.036.264-.056.36-.072.084-.012.148-.02.196-.02h.256c.172 0 .368.012.556.176.152.132.964 1.268 1.056 1.428.092.16.14.312.14.456 0 .124-.032.236-.076.344-.044.108-.112.212-.184.304-.144.188-.3.396-.456.552-.128.128-.252.264-.108.52.144.252.64 1.06 1.376 1.716.992.884 1.82 1.164 2.06 1.248.136.048.244.076.348.076.104 0 .208-.028.296-.096.404-.296 1.004-.884 1.148-1.056.144-.172.284-.248.456-.248h.008c.168 0 .312.068.46.168.292.192 1.84 1.16 2.096 1.368.252.208.312.388.248.592z"/></svg>';
  document.body.appendChild(wa);
})();
