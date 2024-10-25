const scrollContainer = document.querySelector(".wrapper");
const locoScroll = new LocomotiveScroll({
  el: scrollContainer,
  smooth: true,
});

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.scrollerProxy(scrollContainer, {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: scrollContainer.style.transform ? "transform" : "fixed",
});

// Refresh ScrollTrigger after Locomotive Scroll update
locoScroll.on("scroll", ScrollTrigger.update);

// Function to wrap each character of <p> tags within specified sections in <span> tags
function wrapTextInSpans(sectionClass) {
  document.querySelectorAll(`${sectionClass} p`).forEach((paragraph) => {
    let clutter = "";
    const splitText = paragraph.textContent.split("");

    // Wrap each character in a <span>
    splitText.forEach((char) => {
      clutter += `<span>${char}</span>`;
    });
    paragraph.innerHTML = clutter;
  });
}

wrapTextInSpans(".Intro");
wrapTextInSpans(".Explore");

// GSAP animation 
gsap.to(".Intro p span, .Explore p span", {
  color: "#233040", // Target color for animation
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".Intro",
    scroller: scrollContainer, 
    start: "top 80%",
    end: "bottom 20%",
    scrub: 1,
    // markers: true, 
  },
});

// Refresh ScrollTrigger after Locomotive has set everything up
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();


gsap.utils.toArray('.page > div').forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 2,
    scrollTrigger: {
      trigger: section,
      scroller: scrollContainer,
      start: "top 80%",
      end: "top 60%",
      scrub: true,
    },
  });
});





gsap.utils.toArray('.CoreTeamCard').forEach((card, i) => {
  gsap.from(card, {
    x: -50,
    // opacity: 0,
    duration: 1.2,
    delay: i * 0.1,
    scrollTrigger: {
      trigger: card,
      scroller: scrollContainer,
      start: "top 80%",
      end: "bottom 40%",
      scrub: true,
      // markers: true,
    },
  });
});
