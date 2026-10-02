/* ===== 영상처럼 재생 (필름 여러 개) ===== */
document.querySelectorAll('.a-film').forEach(film => {
  const SPEED  = Number(film.dataset.speed) || 900;   // 필름별 속도(ms)
  const frames = [...film.querySelectorAll('img')];
  const count  = film.querySelector('.a-count');
  const bar    = film.querySelector('.a-bar');
  let i = 0, timer = null;

  function show(n) {
    frames[i].classList.remove('on');
    i = (n + frames.length) % frames.length;
    frames[i].classList.add('on');
    count.textContent = (i + 1) + '/' + frames.length;
    bar.style.width = ((i + 1) / frames.length * 100) + '%';
  }
  function play()  { timer = setInterval(() => show(i + 1), SPEED); }
  function pause() { clearInterval(timer); timer = null; }

film.addEventListener('click', () => {
  if (matchMedia('(hover:hover)').matches) { timer ? pause() : play(); }
  else { film.classList.toggle('clear'); }
});

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) play();
});

  /* 커스텀 커서 */
  const cursor = document.querySelector('.cursor');
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, .a-film').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hov'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hov'));
  });

  /* 스크롤 내리면 헤더 숨김 */
  const header = document.querySelector('header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('hide', y > lastY && y > 80);
    lastY = y;
  });


  /* 스크롤하면 뿌연 첫 화면이 선명해짐 */
const hero = document.getElementById('hero');
const heroImg = hero.querySelector('img');
const heroTxt = hero.querySelector('p');
const MAX_BLUR = 40;   // 처음 뿌연 정도(px)
const CLEAR_AT = 0.6;  // 히어로 높이의 몇 % 스크롤하면 완전히 선명해지는지

function heroUpdate() {
  const p = Math.min(window.scrollY / (hero.offsetHeight * CLEAR_AT), 1);
  heroImg.style.filter = 'blur(' + (MAX_BLUR * (1 - p)) + 'px)';
  heroTxt.style.opacity = Math.max(1 - p * 1.4, 0);
}
window.addEventListener('scroll', heroUpdate, { passive: true });
heroUpdate();