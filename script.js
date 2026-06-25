document.querySelectorAll(".nav-toggle").forEach((toggle) => {
  const navId = toggle.getAttribute("aria-controls");
  const nav = navId ? document.getElementById(navId) : null;

  if (!nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
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
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipient = form.dataset.email;
    const formData = new FormData(form);
    const lines = [
      "New contact form submission:",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Company: ${formData.get("company") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Project Type: ${formData.get("project-type") || ""}`,
      "",
      "Message:",
      formData.get("message") || ""
    ];

    const subject = encodeURIComponent("Atkinson Electronics Contact Form");
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
});
