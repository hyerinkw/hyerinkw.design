  // hide header on scroll down, show on scroll up
  let lastY = 0;
  const hdr = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 60) {
      hdr.classList.add('hidden');
    } else {
      hdr.classList.remove('hidden');
    }
    lastY = y;
  });

  // cursor
  const cur = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hovered'));
  });

  // filter tabs
  function setPill(btn) {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
  }

  // staggered animation on scroll (IntersectionObserver)
  const items = document.querySelectorAll('.item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  items.forEach(item => {
    item.style.animationPlayState = 'paused';
    obs.observe(item);
  });