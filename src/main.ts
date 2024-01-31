import Lenis from "@studio-freight/lenis";

const lenis = new Lenis();

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function toggleLogoColor(scrollVal: number) {
  const logicLogo = document.querySelector<SVGAElement>(".logo svg");
  logicLogo?.classList.toggle("changeColor", scrollVal > 25);
}

function clamp(val: number, min: number, max: number) {
  return val > max ? max : val < min ? min : val;
}

function setCssScrollVar() {
  const root = document.documentElement;

  const scrollPercentage = (100 * root.scrollTop) / root.clientHeight;

  const heroScrollPercentage = clamp(scrollPercentage, 0, 100);
  const bottomSectionScrollPercentage = clamp(scrollPercentage - 400, 0, 100);

  root.style.setProperty("--scroll", `${heroScrollPercentage}`);
  root.style.setProperty("--bottom-scroll", `${bottomSectionScrollPercentage}`);

  toggleLogoColor(heroScrollPercentage);
}

["scroll", "resize", "load"].forEach((event) =>
  window.addEventListener(event, setCssScrollVar)
);

const screens = document.querySelectorAll(".screen");

function toggleShowImgClassName(className: string) {
  screens.forEach((screen) => {
    screen.classList.toggle("show", screen.classList.contains(className));
  });
}
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      if (!(entry.target instanceof HTMLElement)) return;
      const imageToShowClassName = entry.target.dataset.screenTrigger || "";
      toggleShowImgClassName(imageToShowClassName);
    }
  }
});

document.querySelectorAll("[data-screen-trigger]").forEach((trigger) => {
  observer.observe(trigger);
});
