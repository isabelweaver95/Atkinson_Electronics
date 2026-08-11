document.querySelectorAll(".nav-toggle").forEach((toggle) => {
  const navId = toggle.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;

  if (!nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true") return;

    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    toggle.focus();
  });
});

document.querySelectorAll(".accordion").forEach((accordion) => {
  accordion.querySelectorAll(".accordion-item").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;

      accordion.querySelectorAll(".accordion-item[open]").forEach((openItem) => {
        if (openItem !== item) {
          openItem.open = false;
        }
      });
    });
  });
});

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('[type="submit"]');
    const status = form.querySelector(".form-status");
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    status.textContent = "";
    status.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      status.textContent = "Thank you. Your message has been sent successfully.";
      status.classList.add("form-status-success");
    } catch (error) {
      status.textContent = "We couldn't send your message. Please try again or call 800-261-3602.";
      status.classList.add("form-status-error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
});
