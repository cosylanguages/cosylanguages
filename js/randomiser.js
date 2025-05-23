function startGrammarPractice(language, day) {
  document.getElementById("grammarOptions").classList.remove("hidden");
  const genderButton = document.getElementById("genderPracticeBtn");

  // Show Gender button only if language isn't English and day >= 2
  if (language !== "COSYenglish" && day >= 2) {
    genderButton.classList.remove("hidden");
  } else {
    genderButton.classList.add("hidden");
  }

  document.getElementById("verbPracticeBtn").onclick = () => {
    practiceVerbs(language, day);
  };
  genderButton.onclick = () => {
    practiceGender(language, day);
  };
}



function getRandomWord(language, days) {
  // Use vocabData and randomElement
}
function getRandomGrammar(language, days) {
  // Use grammarData and randomElement
}
// etc.
