(() => {
  const root = document.documentElement;
  let savedTheme;

  try {
    savedTheme = localStorage.getItem("theme");
  } catch {
    // Theme switching still works when storage is unavailable.
  }

  if (savedTheme !== "light" && savedTheme !== "dark") savedTheme = null;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const button = document.querySelector(".theme-toggle");
    if (button) {
      const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
      button.setAttribute("aria-label", label);
      button.title = label;
    }
  }

  applyTheme(savedTheme || "dark");

  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".theme-toggle");
    if (!button) return;
    applyTheme(root.dataset.theme);
    button.hidden = false;
    button.addEventListener("click", () => {
      savedTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(savedTheme);
      try {
        localStorage.setItem("theme", savedTheme);
      } catch {
        // Keep the selected theme for this page even without storage.
      }
    });
  });
})();
