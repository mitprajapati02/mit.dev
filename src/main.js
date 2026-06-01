import "./style.css";

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  setupYear();
  setupMobileNav();
  setupDynamicGreeting();
  setupTabs();
  setup3DTilt();
  // setupTwitchWidget();
  setupContactForm();
  setupNavbarActiveScroll();
  setupDeveloperWidget();
});

// 1. Dynamic Footer Year
function setupYear() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// 2. Mobile Drawer Navigation Toggle
function setupMobileNav() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      hamburgerBtn.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close drawer when link clicked
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        hamburgerBtn.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", false);
      });
    });
  }
}

// 3. Time-Aware Greetings
function setupDynamicGreeting() {
  const greetingSpan = document.getElementById("dynamic-greeting");
  if (greetingSpan) {
    const hours = new Date().getHours();
    let message = "Good day";

    if (hours < 12) {
      message = "Good morning";
    } else if (hours >= 12 && hours < 17) {
      message = "Good afternoon";
    } else {
      message = "Good evening";
    }

    greetingSpan.textContent = message;
  }
}

// 4. Radix-Style Tabs Switcher
function setupTabs() {
  const triggers = document.querySelectorAll(".tab-trigger");
  const panels = document.querySelectorAll(".tab-panel");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      // Deactivate all triggers and panels
      triggers.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", false);
        t.setAttribute("tabindex", -1);
      });
      panels.forEach((p) => {
        p.classList.remove("active");
        p.setAttribute("hidden", "");
      });

      // Activate selected
      trigger.classList.add("active");
      trigger.setAttribute("aria-selected", true);
      trigger.setAttribute("tabindex", 0);

      const panelId = trigger.getAttribute("aria-controls");
      const targetPanel = document.getElementById(panelId);
      if (targetPanel) {
        targetPanel.classList.add("active");
        targetPanel.removeAttribute("hidden");
      }
    });

    // Keyboards controls
    trigger.addEventListener("keydown", (e) => {
      const triggersArr = Array.from(triggers);
      const index = triggersArr.indexOf(trigger);
      let targetTrigger = null;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        targetTrigger = triggersArr[(index + 1) % triggersArr.length];
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        targetTrigger =
          triggersArr[(index - 1 + triggersArr.length) % triggersArr.length];
      }

      if (targetTrigger) {
        targetTrigger.focus();
        targetTrigger.click();
      }
    });
  });
}

// 5. 3D Card Interactive Tilt
function setup3DTilt() {
  const tiltCards = document.querySelectorAll("[data-tilt]");

  // Only apply tilt on larger screens with fine pointer inputs
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  function handleMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates around center (from -0.5 to 0.5)
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.height - 0.5;

    // Scale rotation angles (max 12deg tilt)
    const rotateY = normalizedX * 12;
    const rotateX = -normalizedY * 12;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = "transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)";
  }

  function handleLeave(e) {
    const card = e.currentTarget;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.5s ease";
  }

  function initTilt() {
    if (mediaQuery.matches) {
      tiltCards.forEach((card) => {
        card.addEventListener("mousemove", handleMove);
        card.addEventListener("mouseleave", handleLeave);
      });
    } else {
      tiltCards.forEach((card) => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
        card.style.transform = "";
      });
    }
  }

  // Initial call and listener for resize changes
  initTilt();
  mediaQuery.addEventListener("change", initTilt);
}

// 6. Infinite Scrolling Twitch Widget Simulation
function setupTwitchWidget() {
  const lane1 = document.getElementById("scroll-lane-1");
  const lane2 = document.getElementById("scroll-lane-2");
  const counterSpan = document.getElementById("twitch-counter");

  if (!lane1 || !lane2) return;

  const mockTasks = [
    { name: "4l1c3_0", task: "mental breakdance", done: false },
    { name: "arcanexviii", task: "babysit streamer", done: true },
    { name: "brisim_claimhte", task: "rewrite history thesis", done: false },
    { name: "Bubxmicn", task: "drive a truck", done: false },
    { name: "charliosaurus", task: "praise the code lord", done: true },
    { name: "clari_miu", task: "be sweaty in Valorant", done: false },
    { name: "cloudydayzzz", task: "stay up all night coding", done: false },
    { name: "creativepepper", task: "develop custom Svelte app", done: true },
    { name: "DATJI_", task: "setup IRL KBBQ stream overlay", done: false },
    { name: "EarliestTea", task: "discuss personality types", done: true },
    { name: "Ellyskey", task: "design merch logo vector", done: false },
    {
      name: "HarryIsTrying",
      task: "be a strategy consultant intern",
      done: false,
    },
    { name: "itsbrandonut", task: "cowork for 4 hours then sleep", done: true },
    { name: "lala_xitlali", task: "build rust microservices api", done: false },
    { name: "lyricalclove", task: "teach english grammar", done: true },
    {
      name: "nachoburrit0",
      task: "update compliance spreadsheet",
      done: false,
    },
    { name: "nihn_", task: "release new lo-fi coding music track", done: true },
    { name: "lanezzz_", task: "strike a supermodel pose", done: false },
    {
      name: "PineappleEffect",
      task: "edit stream highlights video",
      done: false,
    },
    { name: "pinsaregood", task: "go on another stream hiatus", done: true },
    { name: "lilylikesrocks", task: "read mineralogy chapter 4", done: false },
    {
      name: "snowxcone",
      task: "solve three medium leetcode questions",
      done: true,
    },
    { name: "studypaws", task: "study veterinary anatomy", done: false },
    { name: "sunfflawer", task: "grow taller like a sunflower", done: true },
  ];

  // Calculate completed task ratio
  const completedCount = mockTasks.filter((t) => t.done).length;
  if (counterSpan) {
    counterSpan.textContent = `${completedCount}/${mockTasks.length} Done`;
  }

  // Render items into lanes
  const makeItemHTML = (item) => {
    const symbol = item.done ? "✓" : "O";
    const doneClass = item.done ? "done" : "";
    return `<div class="widget-item ${doneClass}" title="@${item.name} : ${item.task}">
      <span>${symbol} ${item.name}</span> : <span>${item.task}</span>
    </div>`;
  };

  const contentHTML = mockTasks.map(makeItemHTML).join("");

  lane1.innerHTML = contentHTML;
  lane2.innerHTML = contentHTML;
}
// Full-Stack + AI Developer Widget
function setupDeveloperWidget() {
  const lane1 = document.getElementById("scroll-lane-1");
  const lane2 = document.getElementById("scroll-lane-2");
  const counterSpan = document.getElementById("dev-counter");

  if (!lane1 || !lane2) return;

  const mockTasks = [
    {
      name: "mitkumar_dev",
      task: "build portfolio website",
      done: true,
    },

    {
      name: "ai_pipeline",
      task: "train dropout prediction ML model",
      done: true,
    },

    {
      name: "frontend_flow",
      task: "design responsive React dashboard UI",
      done: false,
    },

    {
      name: "cloud_sync",
      task: "deploy Node.js backend on AWS EC2",
      done: false,
    },

    {
      name: "craftora_app",
      task: "integrate MongoDB REST APIs",
      done: true,
    },

    {
      name: "vision_ai",
      task: "analyze student performance dataset",
      done: true,
    },

    {
      name: "travel_agent",
      task: "generate AI-powered travel itinerary",
      done: false,
    },

    {
      name: "backend_core",
      task: "optimize Express.js middleware",
      done: true,
    },

    {
      name: "data_insight",
      task: "visualize analytics dashboard graphs",
      done: false,
    },

    {
      name: "devops_stack",
      task: "configure CI/CD deployment workflow",
      done: true,
    },

    {
      name: "photo_booth",
      task: "implement real-time camera capture",
      done: false,
    },

    {
      name: "ml_engine",
      task: "improve prediction model accuracy",
      done: true,
    },

    {
      name: "api_gateway",
      task: "connect OpenAI API with backend",
      done: false,
    },

    {
      name: "ui_system",
      task: "create animated portfolio interactions",
      done: true,
    },

    {
      name: "analytics_lab",
      task: "perform SQL data analysis queries",
      done: false,
    },

    {
      name: "mern_workspace",
      task: "develop scalable full-stack architecture",
      done: true,
    },

    {
      name: "ai_assistant",
      task: "build intelligent recommendation engine",
      done: false,
    },

    {
      name: "security_layer",
      task: "implement JWT authentication flow",
      done: true,
    },
  ];

  // Completed Tasks Count
  const completedCount = mockTasks.filter((t) => t.done).length;

  if (counterSpan) {
    counterSpan.textContent = `${completedCount}/${mockTasks.length} Completed`;
  }

  // Create HTML
  const makeItemHTML = (item) => {
    const symbol = item.done ? "✓" : "○";
    const doneClass = item.done ? "done" : "";

    return `
      <div class="widget-item ${doneClass}"
        title="${item.name} : ${item.task}">

        <span>${symbol} ${item.name}</span> :
        <span>${item.task}</span>

      </div>
    `;
  };

  // Render
  const contentHTML = mockTasks.map(makeItemHTML).join("");

  lane1.innerHTML = contentHTML;
  lane2.innerHTML = contentHTML;
}

// Initialize Widget
// setupDeveloperWidget();

// 7. Premium Client Contact Form Logic
function setupContactForm() {
  const form = document.getElementById("portfolio-contact-form");
  const submitBtn = document.getElementById("contact-submit-btn");
  const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
  const feedback = document.getElementById("form-feedback-message");
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Validate Fields
    const validateField = (id, checkValid) => {
      const input = document.getElementById(id);
      const group = input ? input.parentElement : null;

      if (!input || !group) return;

      const isValid = checkValid(input.value.trim());

      if (isValid) {
        group.classList.remove("invalid");
      } else {
        group.classList.add("invalid");
        isFormValid = false;
      }
    };

    validateField("contact-name", (val) => val.length > 0);
    validateField("contact-email", (val) => emailRegex.test(val));
    validateField("contact-message", (val) => val.length > 0);

    // Invalid Form
    if (!isFormValid) {
      feedback.className = "form-feedback error";
      feedback.textContent = "Please fill out all fields correctly.";
      feedback.style.display = "block";
      return;
    }

    // Loading State
    submitBtn.disabled = true;
    btnText.textContent = "Sending Message...";

    try {
      const formData = new FormData(form);
      if (web3FormsAccessKey) {
        formData.set("access_key", web3FormsAccessKey);
      }

      if (!web3FormsAccessKey) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Contact form is not configured.";
        feedback.style.display = "block";
        submitBtn.disabled = false;
        btnText.textContent = "Send Message";
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        feedback.className = "form-feedback success";
        feedback.textContent =
          "Thank you! Your message has been sent successfully.";
        feedback.style.display = "block";

        form.reset();
      } else {
        feedback.className = "form-feedback error";
        feedback.textContent = "Something went wrong. Please try again.";
        feedback.style.display = "block";
      }
    } catch (error) {
      feedback.className = "form-feedback error";
      feedback.textContent = "Network error. Please try again.";
      feedback.style.display = "block";
    }

    // Reset Button
    submitBtn.disabled = false;
    btnText.textContent = "Send Message";
  });

  // Remove validation styles while typing
  const fields = ["contact-name", "contact-email", "contact-message"];

  fields.forEach((id) => {
    const input = document.getElementById(id);

    if (input) {
      input.addEventListener("input", () => {
        const group = input.parentElement;

        if (group) {
          group.classList.remove("invalid");
        }
      });
    }
  });
}

// Initialize
setupContactForm();

// 8. Active Scroll Navigation Link Highlighting
function setupNavbarActiveScroll() {
  const sections = document.querySelectorAll("section");
  const navLi = document.querySelectorAll(".nav-links li");
  const mobileDrawerLi = document.querySelectorAll(".mobile-drawer a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLi.forEach((li) => {
      li.classList.remove("active");
      const href = li.querySelector("a").getAttribute("href").replace("#", "");
      if (href === current) {
        li.classList.add("active");
      }
    });

    mobileDrawerLi.forEach((a) => {
      a.classList.remove("active");
      const href = a.getAttribute("href").replace("#", "");
      if (href === current) {
        a.classList.add("active");
      }
    });
  });
}
