(function () {
  const toc = document.querySelector("[data-toc]");
  const content = document.querySelector("[data-article]");
  if (!toc || !content) return;

  // Build TOC from h2 headings
  const headings = Array.from(content.querySelectorAll("h2"));
  if (!headings.length) {
    toc.innerHTML = "<p style='margin:0;color:rgba(255,255,255,.6)'>No sections</p>";
    return;
  }

  // Ensure ids
  const slug = (s) =>
    s.toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  headings.forEach((h, i) => {
    if (!h.id) h.id = slug(h.textContent) || `section-${i + 1}`;
  });

  toc.innerHTML = headings
    .map((h) => `<a href="#${h.id}">${h.textContent}</a>`)
    .join("");

  const links = Array.from(toc.querySelectorAll("a"));

  // Active highlight on scroll
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = headings[0].id;

    for (const h of headings) {
      if (h.offsetTop <= y) current = h.id;
    }

    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
