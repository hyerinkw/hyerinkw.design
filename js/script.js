const hdr  = document.querySelector('header');
  const hero = document.getElementById('hero');   // 메인 페이지에만 있음

  // header: 비디오 위에서는 투명 + 흰 글씨 / 스크롤 내리면 숨김, 올리면 표시
  let lastY = 0;
  function onScroll() {
    const y  = window.scrollY;
    const vh = window.innerHeight;

    if (hero) {
      const over = y < vh - hdr.offsetHeight;
      hdr.classList.toggle('over-hero', over);

      // 본문이 올라오는 동안 비디오가 서서히 어두워짐 (문구도 함께)
      const p = Math.min(y / vh, 1);
      hero.style.filter = 'brightness(' + (1 - p * 0.6) + ')';

      // 비디오 구간에서는 헤더를 숨기지 않음
      if (over) {
        hdr.classList.remove('hidden');
        lastY = y;
        return;
      }
    }

    if (y > lastY && y > 60) {
      hdr.classList.add('hidden');
    } else {
      hdr.classList.remove('hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // cursor
  const cur = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    if (!cur) return;
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur && cur.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cur && cur.classList.remove('hovered'));
  });

  // filter tabs
  function setPill(btn) {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }

  // 스크롤 안내 클릭 → 본문으로 부드럽게 이동
  if (hero) {
    const hint = hero.querySelector('.hero-scroll');
    if (hint) {
      hint.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      });
    }

    // 자동재생이 막힌 환경 대비 / 움직임 줄이기 설정 존중
    const heroVideo = hero.querySelector('video');
    if (heroVideo) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        heroVideo.pause();
      } else {
        const tryPlay = () => heroVideo.play().catch(() => {});
        tryPlay();
        document.addEventListener('touchstart', tryPlay, { once: true });
      }
    }

    // staggered animation on scroll (IntersectionObserver)
    // 카드가 화면에 들어올 때 fadeUp 시작
    const items = document.querySelectorAll('.item');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(el => obs.observe(el));
  }
