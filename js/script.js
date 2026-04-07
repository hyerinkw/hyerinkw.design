/* Lightbox Luminous */
// new LuminousGallery(document.querySelectorAll(".grid-gallery"));
new LuminousGallery(document.querySelectorAll('.grid-gallery'), {}, {
  caption: function(trigger) {
    return trigger.querySelector('img').getAttribute('alt');
  }
});

/* Fadeup Animation AOS */
// AOS.init();
AOS.init({
  duration: 3000
});

//name
const nameBtn = document.querySelector(".header-name");
const desc = document.querySelector(".header-desc");

if (nameBtn && desc) {
  nameBtn.addEventListener("click", () => {
    const willShow = desc.hidden;     
    desc.hidden = !willShow;          
    nameBtn.setAttribute("aria-expanded", String(willShow));
  });


  desc.addEventListener("mouseenter", () => {
    desc.hidden = true;
    nameBtn.setAttribute("aria-expanded", "false");
  });
}


document.querySelectorAll('.grid-gallery').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.add('hide-overlay');
  });
});