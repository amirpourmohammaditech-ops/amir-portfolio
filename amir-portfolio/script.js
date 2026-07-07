/* ==========================================================================
   Amir Pourmohammadi · Amir Tech Lab — site script (vanilla JS, no libraries)
   Everything here is progressive enhancement: the site works without JS.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js-ready");

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    // Close after tapping a link (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scrollspy: highlight the active section in the nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link[data-nav]"));
  if (navLinks.length && "IntersectionObserver" in window) {
    var map = {};
    navLinks.forEach(function (a) {
      var id = a.getAttribute("href").replace("#", "");
      if (id) map[id] = a;
    });
    var sections = Object.keys(map)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var active = map[entry.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Scroll-reveal ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var revObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveals.forEach(function (el) { revObs.observe(el); });
    }
  }

  /* ---------- Contact form: inline loading / success / error states ----------
     Falls back to a normal POST to /thank-you.html if fetch/JS is unavailable. */
  var form = document.getElementById("contactForm");
  if (form && window.fetch) {
    var statusEl = document.getElementById("formStatus");
    var submitBtn = document.getElementById("submitBtn");

    var setStatus = function (msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.classList.remove("is-error", "is-ok");
      if (kind) statusEl.classList.add(kind);
    };

    var encode = function (data) {
      return Object.keys(data).map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    };

    form.addEventListener("submit", function (e) {
      // Basic native validation first
      if (!form.checkValidity()) {
        setStatus("Please fill in every field with a valid value.", "is-error");
        form.reportValidity();
        e.preventDefault();
        return;
      }

      e.preventDefault();

      var data = {};
      new FormData(form).forEach(function (value, key) { data[key] = value; });

      submitBtn.setAttribute("aria-busy", "true");
      var original = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      setStatus("Sending your message…");

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data)
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Network response was not ok");
          // Success — go to the thank-you page (matches the no-JS path)
          setStatus("Message sent. Redirecting…", "is-ok");
          window.location.href = "/thank-you.html";
        })
        .catch(function () {
          submitBtn.removeAttribute("aria-busy");
          submitBtn.textContent = original;
          setStatus(
            "That didn't send. Email amirpourmohammadi.tech@gmail.com or try again.",
            "is-error"
          );
        });
    });
  }

  /* ---------- Lightbox (project galleries) ---------- */
  var shots = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (shots.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    box.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close image">&times;</button>' +
      '<img alt="" />' +
      '<p class="lightbox__cap"></p>';
    document.body.appendChild(box);

    var boxImg = box.querySelector("img");
    var boxCap = box.querySelector(".lightbox__cap");
    var closeBtn = box.querySelector(".lightbox__close");
    var lastFocus = null;

    var openBox = function (src, alt, cap) {
      lastFocus = document.activeElement;
      boxImg.setAttribute("src", src);
      boxImg.setAttribute("alt", alt || "");
      boxCap.textContent = cap || "";
      box.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    };
    var closeBox = function () {
      box.classList.remove("is-open");
      boxImg.setAttribute("src", "");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    shots.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var img = btn.querySelector("img");
        var full = btn.getAttribute("data-full") || (img && img.src);
        var cap = btn.getAttribute("data-caption") || "";
        openBox(full, img ? img.alt : "", cap);
      });
    });

    closeBtn.addEventListener("click", closeBox);
    box.addEventListener("click", function (e) { if (e.target === box) closeBox(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) closeBox();
    });
  }
})();
