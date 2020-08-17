// Make the scroll count
// Scroll event, update the scroll position

const pixelCount = document.querySelector(".pixels-scrolled");
const progressBar = document.querySelector(".progress-bar");
const sections = document.querySelectorAll("section");
const clientTag = document.querySelector(".client");
const pageTag = document.querySelector(".page-count");
const headerTag = document.querySelector("header");

// PROGRESS INDICATOR
document.addEventListener("scroll", () => {
  let scrollPosition;

  // Update scrollPosition with the amount scrolled
  scrollPosition = window.scrollY;

  // Update the pixel count with the scroll position
  pixelCount.textContent = scrollPosition;

  // Update the progress bar by setting the width of the
  // progress bar equal to the value the calcScrollProgress
  // return. Give calcScrollProgress the scroll position as an
  // argument so it can use it in the calculations
  progressBar.style.width = calcScrollProgress(scrollPosition);
});

let calcScrollProgress = (scrollPosition) => {
  let browserHeight = document.documentElement.clientHeight;
  let pageHeight = document.documentElement.scrollHeight;
  let totalHeight = pageHeight - browserHeight;
  let scrollProgress = (scrollPosition / totalHeight) * 100;

  return scrollProgress + "%";
};

// WAYPOINTS AND THRESHOLDS
// When we scoll, see how far we scrolled
// Then for each section, check wether we passed it and if we have
// (the number is bigger than the element's offsetTop)
// Then update the text in the header
document.addEventListener("scroll", function () {
  // Update and store how far down the page we've scrolled
  const pixels = window.pageYOffset;

  // Loop though the sections
  sections.forEach((section) => {
    // Each section has a position on the page 'offsetTop' so check
    // if the distance scrolled number 'pixels' is larger then each
    // of the individual section - 60px
    if (section.offsetTop - 60 < pixels) {
      // Pull from the section's data attributes and
      // load the content
      clientTag.innerHTML = section.getAttribute("data-client");
      pageTag.innerHTML = section.getAttribute("data-page");

      // Whilst checking for pixels scrolled, also check if
      // the section has the attribute 'data-is-dark'. If true,
      // make the header and progress bar white
      if (section.hasAttribute("data-is-dark")) {
        headerTag.classList.add("white");
        progressBar.classList.add("white");
        // if not, remove the white classes
      } else {
        headerTag.classList.remove("white");
        progressBar.classList.remove("white");
      }
    }
  });
});

// PARALLAX SECTION
document.addEventListener("scroll", function () {
  // Determine the midpoint of the viewport
  const topViewport = window.pageYOffset;
  const midViewport = topViewport + window.innerHeight / 2;

  sections.forEach((section) => {
    const topOfSection = section.offsetTop;
    const midOfSection = topOfSection + section.offsetHeight / 2;

    const distanceToSection = midViewport - midOfSection;
    const parallaxTags = section.querySelectorAll(`[data-parallax]`);

    // Loop over each tag
    parallaxTags.forEach((tag) => {
      const speed = parseFloat(tag.getAttribute("data-parallax"));
      tag.style.transform = `translateY(${distanceToSection * speed}px)`;
    });
  });
});
