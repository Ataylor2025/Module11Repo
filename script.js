const quizForm = document.querySelector("#quiz-form");
const resultCard = document.querySelector("#quiz-result");
const galleryGrid = document.querySelector("#gallery-grid");
const selectedNote = document.querySelector("#selected-note");
const themeToggleButton = document.querySelector("#theme-toggle");

function buildRecommendation(goal, timeline, style) {
  const packageMap = {
    "lead-generation": "Growth Sprint",
    "brand-awareness": "Brand Spotlight",
    "online-sales": "Commerce Launch",
  };

  const timelineMap = {
    fast: "with a fast-turnaround roadmap and weekly checkpoints",
    standard: "with a structured 6-week delivery plan",
    flexible: "with an iterative discovery-first process",
  };

  const styleMap = {
    minimal: "clean layouts and focused messaging",
    bold: "high-contrast visuals and energetic animations",
    editorial: "refined typography and story-driven sections",
  };

  return {
    title: packageMap[goal],
    body: `We recommend the ${packageMap[goal]} package ${timelineMap[timeline]}, designed around ${styleMap[style]}.`,
  };
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(quizForm);
  const goal = formData.get("goal");
  const timeline = formData.get("timeline");
  const style = formData.get("style");

  const recommendation = buildRecommendation(goal, timeline, style);

  resultCard.innerHTML = `
    <h3>Your best-fit package: ${recommendation.title}</h3>
    <p>${recommendation.body}</p>
  `;
});

galleryGrid.addEventListener("click", (event) => {
  const selectedCard = event.target.closest(".gallery-card");

  if (!selectedCard) {
    return;
  }

  const cards = galleryGrid.querySelectorAll(".gallery-card");
  cards.forEach((card) => card.classList.remove("is-selected"));
  selectedCard.classList.add("is-selected");

  const selectedTitle = selectedCard.dataset.title;
  const selectedDesc = selectedCard.dataset.desc;
  selectedNote.textContent = `Featured concept: ${selectedTitle} — ${selectedDesc}`;
});

themeToggleButton.addEventListener("click", () => {
  const darkModeEnabled = document.body.classList.toggle("dark-mode");
  themeToggleButton.setAttribute("aria-pressed", String(darkModeEnabled));
  themeToggleButton.textContent = darkModeEnabled ? "Switch to Light Mode" : "Toggle Dark Mode";
});
