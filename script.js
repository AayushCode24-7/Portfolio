// GLOBAL REFERENCE CLOSURE FOR COORDINATED INTERFACES
let locoScroll;

// 1. SYSTEM INITIALIZATION OVERLAY AND SEQUENCING
window.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.getElementById("loader-counter");
  const progressBar = document.getElementById("loader-progress-bar");
  const loaderLayer = document.getElementById("loader-layer");
  
  if (!counterEl || !progressBar || !loaderLayer) {
    initAppCore();
    return;
  }

  const loaderData = { value: 0 };
  const loaderTl = gsap.timeline({
    onComplete: () => {
      loaderLayer.style.pointerEvents = "none";
      initAppCore(); // Safely spins up heavy layouts after structural overlays exit
    }
  });

  loaderTl.to(loaderData, {
    value: 100,
    duration: 2.0,
    ease: "power2.out",
    onUpdate: () => {
      const roundedVal = Math.floor(loaderData.value);
      counterEl.textContent = String(roundedVal).padStart(2, "0");
      progressBar.style.width = `${roundedVal}%`;
    }
  });

  loaderTl.to(".loader-center-content", {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: "power2.in"
  }, "+=0.1");

  loaderTl.to(".pane-top", {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut"
  }, "split");

  loaderTl.to(".pane-bottom", {
    yPercent: 100,
    duration: 0.8,
    ease: "power4.inOut"
  }, "split");

  loaderTl.fromTo("#main", 
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
    "split+=0.2"
  );
});

// CORE WRAPPER TO SPIN UP SCROLL ENGINES AND CANVASES SAFELY
function initAppCore() {
  locoScroll = initLocomotiveScroll();
  initNavSmoothLinks();
  initCursor();
  initCanvas();
  initParallax();
  initEntrances();
  initNavEffect();
}

// LOCOMOTIVE SCROLL WITH GSAP SCROLLTRIGGER PROXIES
function initLocomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const scrollContainer = document.querySelector("#main");
  const scrollEngine = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
  smartphone: {
    smooth: true
  },
  tablet: {
    smooth: true
  }
});

  scrollEngine.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? scrollEngine.scrollTo(value, 0, 0)
        : scrollEngine.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => scrollEngine.update());
  ScrollTrigger.refresh();

  return scrollEngine;
}

// Nav Links Smooth Scroll
function initNavSmoothLinks() {
  document.querySelectorAll('#nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target && locoScroll) {
        locoScroll.scrollTo(target);
      }
    });
  });
}

// CUSTOM MAGNETIC CURSOR INTERACTION
function initCursor() {
  const cursor     = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");
  
  if (!cursor || !cursorRing) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX  = mouseX;
  let ringY  = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top  = mouseY + "px";
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top  = ringY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactableSelector = "a, button, .work-card, .social-link, canvas, .badge";
  
  document.body.addEventListener("mouseenter", (e) => {
    if (e.target && e.target.matches && e.target.matches(interactableSelector)) {
      document.body.classList.add("cursor-hover");
    }
  }, true);

  document.body.addEventListener("mouseleave", (e) => {
    if (e.target && e.target.matches && e.target.matches(interactableSelector)) {
      document.body.classList.remove("cursor-hover");
    }
  }, true);
}

// CANVAS SCRUB TIMELINE
function initCanvas() {
  const canvas  = document.getElementById("hero-canvas");
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

  const frameCount = 75;
  const images     = [];
  const imageSeq   = { frame: 0 };
  let imagesLoaded = 0;

  function render() {
    const img = images[imageSeq.frame];
    if (!img || !img.complete) return;
    
    const c = context.canvas;
    const hRatio = c.width  / img.width;
    const vRatio = c.height / img.height;
    const ratio  = Math.max(hRatio, vRatio);
    const shiftX = (c.width  - img.width  * ratio) / 2;
    const shiftY = (c.height - img.height * ratio) / 2;

    context.clearRect(0, 0, c.width, c.height);
    context.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
  }

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.onload = () => {
      imagesLoaded++;
      if (i === 0) render(); 
      if (imagesLoaded === frameCount) {
        setupScrollAnimation();
      }
    };
    img.src = getFramePath(i);
    images.push(img);
  }

  function setupScrollAnimation() {
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
  }
}

// SMOOTH INTERACTIVE LERP PARALLAX ON PROFILE COLUMNS
function initParallax() {
  const colLeft  = document.getElementById("col-left");
  const colRight = document.getElementById("col-right");
  const page3    = document.getElementById("page3");

  if (!colLeft || !colRight || !page3) return;

  let targetLX = 0, targetLY = 0, targetRX = 0, targetRY = 0;
  let currentLX = 0, currentLY = 0, currentRX = 0, currentRY = 0;
  let isPage3Visible = false;

  const observer = new IntersectionObserver(([entry]) => {
    isPage3Visible = entry.isIntersecting;
  }, { threshold: 0.01 });

  observer.observe(page3);

  document.addEventListener("mousemove", (e) => {
    if (!isPage3Visible) return;
    
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
    requestAnimationFrame(lerpParallax);
    if (!isPage3Visible) return;

    const ease = 0.06;
    currentLX += (targetLX - currentLX) * ease;
    currentLY += (targetLY - currentLY) * ease;
    currentRX += (targetRX - currentRX) * ease;
    currentRY += (targetRY - currentRY) * ease;

    colLeft.style.transform  = `translate3d(${currentLX}px, ${currentLY}px, 0)`;
    colRight.style.transform = `translate3d(${currentRX}px, ${currentRY}px, 0)`;
  }
  lerpParallax();
}

// TIMED DISPLAY ELEMENT ENTRANCES
function initEntrances() {
  gsap.from(".hero-copy", {
    y: 30,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    delay: 0.2
  });

  if (document.querySelector(".work-card")) {
    gsap.from(".work-card", {
      scrollTrigger: {
        trigger: "#page1",
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

  if (document.querySelector(".about-bio")) {
    gsap.from(".about-bio > *, .profile-meta-item", {
      scrollTrigger: {
        trigger: "#page3",
        start: "top 75%",
        scroller: "#main",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }

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
  }
}

// BORDER COLOR NAV SHIFT
function initNavEffect() {
  const nav = document.getElementById("nav");
  if (!nav || !locoScroll) return;

  locoScroll.on("scroll", ({ scroll }) => {
    if (scroll.y > 60) {
      nav.style.borderBottomColor = "rgba(30, 30, 30, 0.8)";
    } else {
      nav.style.borderBottomColor = "rgba(30, 30, 30, 0.3)";
    }
  });
}

// FETCH REAL-TIME GITHUB METRICS FOR WORK SECTION
async function fetchGithubTelemetry() {
  const username = "AayushCode24-7";

  const repoEl = document.getElementById("git-repos");
  const pushEl = document.getElementById("git-activity");
  const commitEl = document.getElementById("git-commits");

  if (!repoEl || !pushEl || !commitEl) return;

  try {
    const profileRes = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!profileRes.ok) {
      throw new Error("Profile API failed");
    }

    const profileData = await profileRes.json();

    repoEl.textContent = String(
      profileData.public_repos
    ).padStart(2, "0");

    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public`
    );

    if (!eventsRes.ok) {
      throw new Error("Events API failed");
    }

    const events = await eventsRes.json();

    const lastPushEvent = events.find(
      event => event.type === "PushEvent"
    );

    if (lastPushEvent) {
      const pushDate = new Date(lastPushEvent.created_at);

      pushEl.textContent = pushDate.toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric"
        }
      ).toUpperCase();
    } else {
      pushEl.textContent = "NO PUSHES";
    }

    commitEl.textContent = "140+";
  } catch (error) {
    console.error("GitHub telemetry error:", error);

    repoEl.textContent = "--";
    commitEl.textContent = "--";
    pushEl.textContent = "--";
  }
}


window.addEventListener("load", () => {
  fetchGithubTelemetry();
});