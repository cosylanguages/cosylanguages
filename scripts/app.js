document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const languageSelect = document.getElementById("language-select");
  const daySelect = document.getElementById("day-select");
  const dayFromSelect = document.getElementById("day-from-select");
  const dayToSelect = document.getElementById("day-to-select");
  const practiceTypeSelect = document.getElementById("practice-type-select");
  const showButton = document.getElementById("show-button");
  const resultContainer = document.getElementById("result-container");

  // Main function to handle the "Show" button click
  showButton.addEventListener("click", () => {
    const language = languageSelect.value;
    const day = daySelect.value;
    const dayFrom = dayFromSelect.value;
    const dayTo = dayToSelect.value;
    const practiceType = practiceTypeSelect.value;

    // Clear previous result
    resultContainer.innerHTML = "";

    // Validation
    if (!language) {
      alert("Please select a language.");
      return;
    }
    if (!practiceType) {
      alert("Please select a type of practice.");
      return;
    }
    if (!day && !(dayFrom && dayTo && validDayRange(dayFrom, dayTo))) {
      alert("Please select either a day or a valid day range (from <= to).");
      return;
    }

    // Determine day(s) to select from
    let daysToUse = [];
    if (day) {
      daysToUse = [Number(day)];
    } else if (dayFrom && dayTo && validDayRange(dayFrom, dayTo)) {
      for (let d = Number(dayFrom); d <= Number(dayTo); d++) {
        daysToUse.push(d);
      }
    }

    // Depending on practiceType, get the random content
    switch (practiceType) {
      case "random_word":
        handleRandomWord(language, daysToUse, resultContainer);
        break;
      case "random_grammar":
        handleRandomGrammar(language, daysToUse, resultContainer);
        break;
      case "random_speaking":
        handleRandomSpeaking(language, daysToUse, resultContainer);
        break;
      case "random_image":
        handleRandomImage(language, daysToUse, resultContainer);
        break;
      default:
        resultContainer.textContent = "Invalid practice type selected.";
    }
  });

  // Load voices asynchronously
  if (typeof speechSynthesis !== "undefined") {
    speechSynthesis.onvoiceschanged = () => {
      console.log("Voices changed, available voices:", window.speechSynthesis.getVoices());
    };
    window.speechSynthesis.getVoices();
  }
});
