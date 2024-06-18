/**
 * Template Name: QuickStart
 * Template URL: https://bootstrapmade.com/quickstart-bootstrap-startup-website-template/
 * Updated: May 01 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 *
 *
 */

// protect.js

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu .navmenu-link").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      if (document.querySelector(".mobile-nav-active")) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      }
    });
  });

  const dropdowns = document.querySelectorAll(".has-dropdown");

  if (window.innerWidth < 769) {
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector("a");
      trigger.addEventListener("click", function (e) {
        // Prevent the default anchor behavior
        e.preventDefault();

        // Toggle the dropdown menu
        const dropdownMenu = dropdown.querySelector(".list-dropdown");
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".swiper").forEach(function (swiper) {
      let config = JSON.parse(
        swiper.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiper, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("user");
    window.location.href = `/index.html`;

    updateUI();
  });

  document
    .getElementById("logout-icon")
    .addEventListener("click", function (event) {
      event.preventDefault();

      localStorage.removeItem("user");
      window.location.href = `/index.html`;

      updateUI();
    });

  function updateUI() {
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn) {
      document.getElementById("dashboard").classList.remove("d-none");
      document.getElementById("signin").classList.add("d-none");
      // const timeout = 30 * 60 * 1000;
    } else {
      document.getElementById("dashboard").classList.add("d-none");
      document.getElementById("signin").classList.remove("d-none");
      document.getElementById("logout-icon").classList.remove("d-md-block");
      document.getElementById("logout").classList.add("d-none");
    }
  }
  updateUI();

  const tabs = document.querySelectorAll(".nav-link");
  const tabContent = document.querySelector(".tab-pane");
  const tabContentImg = tabContent.querySelector(".tab-img");

  const ImgLinks = [
    "assets/img/chatter_2.gif",
    "assets/img/sign_l_1.gif",
    "assets/img/chatter_3.gif",
  ];
  let currentIndex = 0;

  const switchTabs = () => {
    tabs[currentIndex].classList.remove("active", "show");
    tabContentImg.setAttribute("src", ImgLinks[currentIndex]);

    currentIndex = (currentIndex + 1) % tabs.length;

    tabs[currentIndex].classList.add("active", "show");
  };

  setInterval(switchTabs, 5000);
})();
