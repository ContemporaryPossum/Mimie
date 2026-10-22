/* The Mimie's Catering & Food Delivery - site behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var WA_NUMBER = "60189733642";

  /* ---------- Nav: shadow on scroll (IntersectionObserver, no scroll listener) ---------- */
  var nav = document.getElementById("nav");
  var sentinel = document.getElementById("top-sentinel");
  if (nav && sentinel && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      nav.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }, { rootMargin: "-8px 0px 0px 0px" }).observe(sentinel);
  }

  /* ---------- Nav: mobile menu ---------- */
  var burger = document.getElementById("nav-burger");
  var links = document.getElementById("nav-links");
  function closeMenu() {
    if (!burger || !links) return;
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Buka menu");
    links.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  }
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      if (open) { closeMenu(); return; }
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Tutup menu");
      links.classList.add("is-open");
      document.body.classList.add("nav-open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Nav: active section highlight (ids read from the nav itself) ---------- */
  var navAnchors = {};
  var sectionIds = [];
  if (links) {
    Array.prototype.forEach.call(links.querySelectorAll('a[href^="#"]'), function (a) {
      var id = a.getAttribute("href").slice(1);
      if (id && document.getElementById(id)) { navAnchors[id] = a; sectionIds.push(id); }
    });
  }
  if ("IntersectionObserver" in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(navAnchors).forEach(function (k) { navAnchors[k].classList.remove("is-active"); });
        var a = navAnchors[en.target.id];
        if (a) a.classList.add("is-active");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) activeObs.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); revObs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { revObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Tabs: menu + katalog (ARIA tabs pattern) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll('[role="tablist"]'), function (tablist) {
    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
    function selectTab(tab) {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute("aria-selected", selected ? "true" : "false");
        t.setAttribute("tabindex", selected ? "0" : "-1");
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { selectTab(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); n.focus(); selectTab(n); }
      });
    });
  });

  /* ---------- Lightbox (gallery, katalog posters, feedback, bento sets) ----------
     Prev/next stay inside the nearest [data-lb] group and skip items hidden by filters. */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-full]"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-cap");
  var set = [], current = 0, lastFocus = null;

  function showAt(i) {
    current = (i + set.length) % set.length;
    var btn = set[current];
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = btn.querySelector("img").alt || "";
    lbCap.textContent = btn.getAttribute("data-caption") || "";
  }
  function openLb(btn) {
    lastFocus = document.activeElement;
    var group = btn.closest("[data-lb]");
    set = group ? Array.prototype.slice.call(group.querySelectorAll("[data-full]")).filter(function (el) {
      return el === btn || el.offsetParent !== null;
    }) : [btn];
    lb.classList.toggle("is-single", set.length < 2);
    showAt(set.indexOf(btn));
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  if (lb && items.length) {
    items.forEach(function (btn) { btn.addEventListener("click", function () { openLb(btn); }); });
    lb.querySelector(".lightbox__close").addEventListener("click", closeLb);
    lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { showAt(current - 1); });
    lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { showAt(current + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") showAt(current - 1);
      if (e.key === "ArrowRight") showAt(current + 1);
    });
    // basic swipe
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) showAt(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

  /* ---------- Set menu price filters (bento.html) ---------- */
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter[data-filter]"));
  var setCards = Array.prototype.slice.call(document.querySelectorAll(".set[data-band]"));
  if (filterBtns.length && setCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        setCards.forEach(function (c) {
          var show = f === "all" || c.getAttribute("data-band") === f;
          c.hidden = !show;
          if (show) c.classList.add("is-in");
        });
      });
    });
  }

  /* ---------- Feedback rail: prev/next buttons (no scroll listeners) ---------- */
  var rail = document.getElementById("feedback-rail");
  if (rail) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-rail]"), function (b) {
      b.addEventListener("click", function () {
        var dir = b.getAttribute("data-rail") === "next" ? 1 : -1;
        var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
      });
    });
  }

  /* ---------- Katalog: carry the chosen category into the quote form ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-katalog]"), function (a) {
    a.addEventListener("click", function () {
      var nota = document.getElementById("f-nota");
      if (!nota) return;
      var line = "Berminat: " + a.getAttribute("data-katalog");
      if (nota.value.indexOf(line) === -1) nota.value = nota.value ? nota.value + "\n" + line : line;
    });
  });

  /* ---------- Quotation form -> WhatsApp ---------- */
  var form = document.getElementById("quote-form");
  var formError = document.getElementById("form-error");
  if (form) {
    var brand = form.getAttribute("data-brand") || "The Mimie's";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var nama = f.nama.value.trim();
      var jenis = f.jenis.value.trim();
      if (!nama || !jenis) {
        formError.hidden = false;
        (!nama ? f.nama : f.jenis).focus();
        return;
      }
      formError.hidden = true;

      var tarikh = f.tarikh.value;
      if (tarikh) {
        var p = tarikh.split("-");
        if (p.length === 3) tarikh = p[2] + "/" + p[1] + "/" + p[0];
      }
      var lines = [
        "Salam " + brand + ", saya nak minta sebut harga.",
        "",
        "Nama: " + nama,
        "Jenis majlis: " + jenis,
        "Tarikh: " + (tarikh || "-"),
        "Anggaran pax: " + (f.pax.value || "-"),
        "Lokasi: " + (f.lokasi.value.trim() || "-")
      ];
      var nota = f.nota.value.trim();
      if (nota) lines.push("Catatan: " + nota);
      lines.push("", "(Dihantar dari laman web)");

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
