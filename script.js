  //LOCOMOTIVE SCROLL

function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smoothMobile: false,
    multiplier: 1.0,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

  return locoScroll;
}

const locoScroll = initLocomotiveScroll();

  //  2. CUSTOM MAGNETIC CURSOR

(function initCursor() {
  const cursor     = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");
  
  if (!cursor || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;

  // Mouse dot follows immediately
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";
  });

  // Ring follows with smooth lerp
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover states for interactive UI elements
  const hoverTargets = document.querySelectorAll(
    "a, button, .work-card, .social-link, .bold-phrase, canvas"
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
})();


  //  3. CLICK GLITCH BURST EFFECT
  //  ========================================================== */
// (function initClickBurst() {
//   const INTERACTIVE_SELECTOR = "a, button, .work-card, .social-link, .nav-links a";

//   function spawnFragment(container, isStrong) {
//     const frag = document.createElement("div");
//     frag.className = "glitch-frag" + (Math.random() > 0.6 ? " frag-alt" : "");

//     const w = isStrong ? rand(10, 26) : rand(6, 16);
//     const h = isStrong ? rand(2, 5) : rand(1, 3);
//     const angle = rand(0, 360);
//     const dist = isStrong ? rand(30, 70) : rand(14, 36);
//     const rot = rand(-40, 40);

//     frag.style.width = w + "px";
//     frag.style.height = h + "px";
//     frag.style.setProperty("--fx0", "0px");
//     frag.style.setProperty("--fy0", "0px");
//     frag.style.setProperty("--fx1", Math.cos(angle) * dist + "px");
//     frag.style.setProperty("--fy1", Math.sin(angle) * dist + "px");
//     frag.style.setProperty("--fr", rot + "deg");

//     container.appendChild(frag);
//   }

//   function rand(min, max) {
//     return Math.random() * (max - min) + min;
//   }

//   function triggerBurst(x, y, isStrong) {
//     const container = document.createElement("div");
//     container.className = "glitch-burst";
//     container.style.left = x + "px";
//     container.style.top = y + "px";
//     document.body.appendChild(container);

//     const ring = document.createElement("div");
//     ring.className = "glitch-ring";
//     container.appendChild(ring);

//     const fragCount = isStrong ? 7 : 4;
//     for (let i = 0; i < fragCount; i++) {
//       spawnFragment(container, isStrong);
//     }

//     setTimeout(() => container.remove(), 420);
//   }

//   function triggerScanLine(target) {
//     const scan = document.createElement("div");
//     scan.className = "click-scan";
//     target.style.position = target.style.position || "relative";
//     target.appendChild(scan);
//     setTimeout(() => scan.remove(), 420);

//     target.classList.add("click-flash");
//     setTimeout(() => target.classList.remove("click-flash"), 260);
//   }

//   document.addEventListener("click", (e) => {
//     const target = e.target.closest(INTERACTIVE_SELECTOR);
//     const isStrong = !!target;

//     triggerBurst(e.clientX, e.clientY, isStrong);

//     if (isStrong) {
//       triggerScanLine(target);
//     }
//   });
// })();


  //  4. CANVAS — 300-FRAME SCROLL SEQUENCE 
(function initCanvas() {
  const canvas  = document.getElementById("hero-canvas") || document.querySelector("#page>canvas") || document.querySelector("canvas");
  if (!canvas) return;
  
  const context = canvas.getContext("2d");

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function getFramePath(index) {
    const num = String(index + 1).padStart(4, "0");
    return `./model/male${num}.png`;
  }

  const frameCount = 300;
  const images     = [];
  const imageSeq   = { frame: 0 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src   = getFramePath(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.15,
      trigger: "#page",
      start: "top top",
      endTrigger: "#page2",
      end: "bottom top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  ScrollTrigger.create({
    trigger: "#page",
    pin: true,
    scroller: "#main",
    start: "top top",
    end: "400% top",
  });

  images[0].onload = render;

  function render() {
    const img = images[imageSeq.frame];
    if (!img || !img.complete) return;
    scaleImage(img, context);
  }

  function scaleImage(img, ctx) {
    const c = ctx.canvas;
    const hRatio = c.width  / img.width;
    const vRatio = c.height / img.height;
    const ratio  = Math.max(hRatio, vRatio);
    const shiftX = (c.width  - img.width  * ratio) / 2;
    const shiftY = (c.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
  }
})();

  //  5. PAGE PINNING SYSTEM
["#page1", "#page2", "#page3", "#page4"].forEach((selector) => {
  if (!document.querySelector(selector)) return;
  gsap.to(selector, {
    scrollTrigger: {
      trigger: selector,
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: "#main",
    },
  });
});

  //  6. MOUSE-PARALLAX ON MANIFESTO COLUMNS
(function initParallax() {
  const colLeft  = document.getElementById("col-left");
  const colRight = document.getElementById("col-right");
  const page1    = document.getElementById("page1");

  if (!colLeft || !colRight || !page1) return;

  let targetLX = 0, targetLY = 0;
  let targetRX = 0, targetRY = 0;
  let currentLX = 0, currentLY = 0;
  let currentRX = 0, currentRY = 0;

  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; 
    const dy = (e.clientY - cy) / cy; 

    targetLX = -dx * 18;
    targetLY = -dy * 10;
    targetRX =  dx * 18;
    targetRY =  dy * 10;
  });

  function lerpParallax() {
    const ease = 0.06;
    currentLX += (targetLX - currentLX) * ease;
    currentLY += (targetLY - currentLY) * ease;
    currentRX += (targetRX - currentRX) * ease;
    currentRY += (targetRY - currentRY) * ease;

    colLeft.style.transform  = `translate(${currentLX}px, ${currentLY}px)`;
    colRight.style.transform = `translate(${currentRX}px, ${currentRY}px)`;

    requestAnimationFrame(lerpParallax);
  }
  lerpParallax();
})();


/* ==========================================================
   7. ENTRANCE STAGGER ANIMATIONS
   ========================================================== */
(function initEntrances() {
  // Hero Copy
  gsap.from(".hero-copy", {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.4,
  });

  // Scroll Hint Arrow
  gsap.from(".scroll-hint", {
    opacity: 0,
    duration: 1.0,
    delay: 1.2,
    ease: "power2.out",
  });

  // Typography Phrases (Page 1)
  if (document.querySelector(".bold-phrase")) {
    gsap.from(".bold-phrase", {
      scrollTrigger: {
        trigger: "#page1",
        start: "top 80%",
        scroller: "#main",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power3.out",
    });
  }

  // Cards Entrance (Page 2)
  if (document.querySelector(".work-card")) {
    gsap.from(".work-card", {
      scrollTrigger: {
        trigger: "#page2",
        start: "top 70%",
        scroller: "#main",
      },
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
    });
  }

  // Contact Header and Social Strip (Page 4)
  if (document.querySelector("#page4")) {
    gsap.from("#page4 .contact-heading", {
      scrollTrigger: {
        trigger: "#page4",
        start: "top 70%",
        scroller: "#main",
      },
      y: 50,
      opacity: 0,
      duration: 1.0,
      ease: "power3.out",
    });

    gsap.from("#page4 .social-strip", {
      scrollTrigger: {
        trigger: "#page4",
        start: "top 70%",
        scroller: "#main",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    });
  }
})();


/* ==========================================================
   8. NAVIGATION DISCRETE SCROLL FX
   ========================================================== */
(function initNavEffect() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  locoScroll.on("scroll", ({ scroll }) => {
    if (scroll.y > 60) {
      nav.style.borderBottomColor = "rgba(30, 30, 30, 0.8)";
    } else {
      nav.style.borderBottomColor = "rgba(30, 30, 30, 0.3)";
    }
  });
})();