(function () {
  var links = document.querySelectorAll(".toc--desktop .toc__list a");
  if (!links.length || !("IntersectionObserver" in window)) return;
  var sections = [];
  links.forEach(function (link) {
    var el = document.getElementById((link.getAttribute("href") || "").slice(1));
    if (el) sections.push({ el: el, link: link });
  });
  if (!sections.length) return;
  function setActive(active) {
    links.forEach(function (link) {
      var on = link === active;
      link.classList.toggle("is-active", on);
      if (on) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  }
  var observer = new IntersectionObserver(function (entries) {
    var hit = entries.filter(function (e) { return e.isIntersecting; })
      .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; })[0];
    if (!hit) return;
    var match = sections.find(function (s) { return s.el === hit.target; });
    if (match) setActive(match.link);
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
  sections.forEach(function (s) { observer.observe(s.el); });
})();
