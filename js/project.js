const base = "images/";

const projects = {
  "window-between-us": {
    title: "The Window Between Us",
    year: "2026",
    type: "Moving Image · Installation",
    client: "Independent project",
    desc: "At the center of the installation, scenes from my daily life are projected onto the sheet of paper inside a typewriter. The typewriter becomes a device for sending an ordinary day as a letter. In this gesture, the present is transformed into a message, and daily routine becomes an act of care. A Super 8 movie projector functions as a medium between past and present, carrying memory through the texture of film. On the wall, a separate projection evokes my grandmother’s loneliness, longing, and the space left by absence.",
    rows: [
      ["g-full", [["video1.mp4", "r-wide", true]]],
      [
        "g-full",
        [[
          "https://player.vimeo.com/video/1180381253",
          "r-vimeo",
          "vimeo"
        ]]
      ]
    ],
    next: ["born-in-seoul-1939", "Born in Seoul, 1939"]
  },

  "born-in-seoul-1939": {
    title: "Born in Seoul, 1939",
    year: "2026",
    type: "Writer · Bookbinding · Print",
    client: "Independent project",
    desc: "As people grow older, their world can become quieter, smaller, and shaped by absence. This project reflects on longing, memory, and communication with my grandmother, asking how everyday gestures might hold emotional weight across distance. Together, these elements weave two parallel narratives into conversation, holding her life and my attempt to reach her through film, letters, and everyday rituals. The work asks what it means to stay close to someone when distance, time, and silence remain between you. It proposes that the act of reaching toward another person, even without certainty of arrival, is itself a form of closeness. What does it mean to stay close to someone when distance, time, and silence remain between you?",
    rows: [
      ["g-full", [["web01.jpg","r-tall"]]],
      ["g-full", [["web02.jpg","r-tall"]]],
      ["g-full", [["web03.jpg","r-tall"]]],
      ["g-full", [["web04.jpg","r-tall"]]],
      ["g-full", [["book.GIF", "r-std"]]]
    ],
    next: ["wheres-your-moment", "Where’s Your Moment?"]
  },

  "wheres-your-moment": {
    title: "Where’s Your Moment?",
    year: "2026",
    type: "Campaign · Installation",
    client: "Independent project",
    desc: "A campaign and installation project exploring the small, defining moments that shape our everyday experience.",
    rows: [
      ["g-full", [["img4-400.jpg", "r-wide"]]],
      ["g-full", [["video3.mp4", "r-wide", true]]]
    ],
    next: ["stellar-symphony", "Stellar Symphony"]
  },

  "stellar-symphony": {
    title: "Stellar Symphony",
    year: "2026",
    type: "Print",
    client: "Independent project",
    desc: "A print-led exploration of visual rhythm, scale, and celestial imagery.",
    rows: [
      ["g-full", [["img5-500.jpg", "r-wide"]]],
      ["g-full", [["1.png", "r-tall"]]]
    ],
    next: ["see", "SEE"]
  },

  see: {
    title: "SEE",
    year: "2026",
    type: "Web Development",
    client: "Independent project",
    desc: "A web project that brings moving image and editorial visual language into a digital space.",
    rows: [
      ["g-full", [["see.jpeg", "r-std"]]]
    ],
    next: ["window-between-us", "The Window Between Us"]
  }
};

const id = new URLSearchParams(location.search).get("id") || "window-between-us";
const project = projects[id] || projects["window-between-us"];

document.title = `${project.title} — Hyerin KW`;

const info = document.getElementById("info");

info.innerHTML = `
  <div class="info-left"><h1></h1><p class="desc"></p></div>
  <div class="info-right">
    <div class="meta">Year<strong></strong></div>
    <div class="meta">Type<strong></strong></div>
    <div class="meta">Client<strong></strong></div>
  </div>
`;

info.querySelector("h1").textContent = project.title;
info.querySelector(".desc").textContent = project.desc;

[project.year, project.type, project.client].forEach((value, index) => {
  info.querySelectorAll(".meta strong")[index].textContent = value;
});

const grids = document.getElementById("grids");

project.rows.forEach(([className, items]) => {
  const group = document.createElement("div");
  group.className = `g ${className}`;

  items.forEach(([source, ratio, mediaType]) => {
    let media;

    if (mediaType === "vimeo") {
      media = document.createElement("iframe");
      media.title = project.title;
      media.frameBorder = "0";
      media.allow =
        "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";
      media.referrerPolicy = "strict-origin-when-cross-origin";
      media.allowFullscreen = true;
      media.src = source;
    } else if (mediaType) {
      media = document.createElement("video");
      media.autoplay = true;
      media.muted = true;
      media.loop = true;
      media.playsInline = true;
      media.controls = true;
      media.src = base + source;
    } else {
      media = document.createElement("img");
      media.alt = "";
      media.loading = "lazy";
      media.src = base + source;
    }

    media.className = `media ${ratio || ""}`;

    const loadEvent = mediaType === true ? "loadeddata" : "load";

    media.addEventListener(
      loadEvent,
      () => media.classList.add("on"),
      { once: true }
    );

    group.appendChild(media);
  });

  grids.appendChild(group);
});

const next = document.getElementById("next");

next.href = `project.html?id=${project.next[0]}`;
next.innerHTML =
  '<div><div class="next-label">Next project</div><div class="next-title"></div></div><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 9h12m-4-5 5 5-5 5" stroke="#888" stroke-width="1.2"/></svg>';

next.querySelector(".next-title").textContent = project.next[1];

let lastY = 0;
const header = document.getElementById("hdr");

window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    header.classList.toggle("hide", currentY > lastY && currentY > 60);
    lastY = currentY;
  },
  { passive: true }
);

const cursor = document.getElementById("cur");

document.addEventListener("mousemove", event => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("mouseenter", () => cursor.classList.add("hov"));
  link.addEventListener("mouseleave", () => cursor.classList.remove("hov"));
});

