// ---- Мобильное меню ----
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
}));

// ---- Слайдер: смена каждые 10 секунд ----
const INTERVAL = 10000;
const slides = document.querySelectorAll('.slide');
const dotsBox = document.querySelector('.dots');
let current = 0;
let timer;

const dots = [...slides].map((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Слайд ' + (i + 1));
    d.innerHTML = '<i></i>';
    d.addEventListener('click', () => go(i));
    dotsBox.appendChild(d);
    return d;
});

function go(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    // перезапуск анимаций (zoom и прогресс)
    void slides[current].offsetWidth;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    restart();
}

function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), INTERVAL);
}

document.querySelector('.arrow--next').addEventListener('click', () => go(current + 1));
document.querySelector('.arrow--prev').addEventListener('click', () => go(current - 1));

// свайп на телефоне
let startX = 0;
const hero = document.getElementById('hero');
hero.addEventListener('touchstart', e => startX = e.touches[0].clientX, {
    passive: true
});
hero.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
});

restart();