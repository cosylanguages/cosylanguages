document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const languageSelect = document.getElementById("language-select");
  const daySelect = document.getElementById("day-select");
  const dayFromSelect = document.getElementById("day-from-select");
  const dayToSelect = document.getElementById("day-to-select");
  const practiceTypeSelect = document.getElementById("practice-type-select");
  const showButton = document.getElementById("show-button");
  const resultContainer = document.getElementById("result-container");
  const vocabSubmenu = document.getElementById("vocabulary-submenu");

  // Vocabulary submenu handling
  practiceTypeSelect.addEventListener('change', function() {
    if (this.value === 'vocabulary_practice') {
      vocabSubmenu.style.display = 'flex';
    } else {
      vocabSubmenu.style.display = 'none';
    }
  });

  // Handle submenu button clicks
  document.querySelectorAll('.submenu-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const practiceType = this.getAttribute('data-practice');
      const language = languageSelect.value;
      const day = daySelect.value;
      
      if (!language || !day) {
        alert("Please select both language and day first");
        return;
      }
      
      // Clear previous result
      resultContainer.innerHTML = '';
      
      // Hide all special containers
      document.getElementById('crossword-container').style.display = 'none';
      document.getElementById('grammar-practice-container').style.display = 'none';
      
      switch(practiceType) {
        case 'random_word':
          handleRandomWord(language, [Number(day)], resultContainer);
          break;
        case 'random_image':
          handleRandomImage(language, [Number(day)], resultContainer);
          break;
        case 'crossword':
          showCrosswordPractice(language);
          break;
      }
    });
  });

  // Main function to handle the "Show" button click
  showButton.addEventListener("click", (e) => {
    e.preventDefault();
    const language = languageSelect.value;
    const day = daySelect.value;
    const dayFrom = dayFromSelect.value;
    const dayTo = dayToSelect.value;
    const practiceType = practiceTypeSelect.value;

    // Clear previous result
    resultContainer.innerHTML = '';
    
    // Hide all special containers
    document.getElementById('crossword-container').style.display = 'none';
    document.getElementById('grammar-practice-container').style.display = 'none';

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
      case "vocabulary_practice":
        // Handled by submenu
        vocabSubmenu.style.display = 'flex';
        break;
      case "random_word":
        handleRandomWord(language, daysToUse, resultContainer);
        break;
      case "random_image":
        handleRandomImage(language, daysToUse, resultContainer);
        break;
      case "random_grammar":
        handleRandomGrammar(language, daysToUse, resultContainer);
        break;
      case "grammar_gender":
        showGrammarGenderPractice(language, daysToUse[0]);
        break;
      case "random_speaking":
        handleRandomSpeaking(language, daysToUse, resultContainer);
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

// Show crossword practice
function showCrosswordPractice(language) {
  const container = document.getElementById('crossword-container');
  const clueEl = document.getElementById('crossword-clue');
  const imageEl = document.getElementById('crossword-image');
  const feedbackEl = document.getElementById('crossword-feedback');
  
  container.style.display = 'block';
  
  // Get random crossword item
  const items = crosswordData[language] || crosswordData.COSYenglish;
  const item = randomElement(items);
  
  if (item.clue) {
    clueEl.textContent = item.clue;
    imageEl.innerHTML = '';
  } else if (item.image) {
    clueEl.textContent = "What is this?";
    imageEl.innerHTML = `<img src="${item.image}" alt="Crossword clue" class="vocab-image">`;
  }
  
  // Clear previous input and feedback
  document.getElementById('crossword-input').value = '';
  feedbackEl.textContent = '';
  
  // Handle answer submission
  document.getElementById('crossword-submit').onclick = function() {
    const userAnswer = document.getElementById('crossword-input').value.trim().toLowerCase();
    if (userAnswer === item.answer.toLowerCase()) {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "#4CAF50";
      setTimeout(() => {
        showCrosswordPractice(language); // Load next question
      }, 1500);
    } else {
      feedbackEl.textContent = "Try again!";
      feedbackEl.style.color = "#F44336";
    }
  };
}

// Show grammar gender practice
function showGrammarGenderPractice(language, day) {
  const container = document.getElementById('grammar-practice-container');
  const questionEl = document.getElementById('grammar-question');
  const optionsEl = document.getElementById('grammar-options');
  const feedbackEl = document.getElementById('grammar-feedback');
  
  container.style.display = 'block';
  
  // Get random word for practice
  const words = genderPracticeData[language]?.[day] || [];
  if (words.length === 0) {
    container.style.display = 'none';
    resultContainer.textContent = "No grammar data available for this selection.";
    return;
  }
  
  const word = randomElement(words);
  questionEl.textContent = word.word;
  questionEl.dataset.answer = word.article;
  
  // Create gender options
  optionsEl.innerHTML = '';
  let articles = [];
  
  // Set articles based on language
  if (language === 'COSYfrançais') {
    articles = ['le', 'la', 'le/la'];
  } else if (language === 'COSYdeutsch') {
    articles = ['der', 'die', 'das'];
  } else if (language === 'COSYitaliano') {
    articles = ['il', 'la', 'lo'];
  } else {
    articles = ['the']; // Default for languages without gender
  }
  
  articles.forEach(article => {
    const option = document.createElement('div');
    option.className = 'gender-option';
    option.textContent = article;
    option.addEventListener('click', function() {
      checkGenderAnswer(this, word.article);
    });
    optionsEl.appendChild(option);
  });
  
  // Show answer when clicking the word
  questionEl.addEventListener('click', function() {
    feedbackEl.textContent = `Correct article: ${word.article}`;
    feedbackEl.style.color = "#FFC107";
  });
  
  feedbackEl.textContent = '';
}

function checkGenderAnswer(selectedOption, correctAnswer) {
  const feedbackEl = document.getElementById('grammar-feedback');
  const selectedArticle = selectedOption.textContent;
  
  // Reset all options
  document.querySelectorAll('.gender-option').forEach(opt => {
    opt.classList.remove('correct', 'incorrect', 'show-answer');
  });
  
  if (selectedArticle === correctAnswer) {
    selectedOption.classList.add('correct');
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "#4CAF50";
  } else {
    selectedOption.classList.add('incorrect');
    // Highlight correct answer
    document.querySelectorAll('.gender-option').forEach(opt => {
      if (opt.textContent === correctAnswer) {
        opt.classList.add('show-answer');
      }
    });
    feedbackEl.textContent = "Incorrect!";
    feedbackEl.style.color = "#F44336";
  }
}

// Practice handlers
function handleRandomWord(language, days, container) {
  let combinedWords = [];
  for (const d of days) {
    if (vocabData[language][d]) combinedWords = combinedWords.concat(vocabData[language][d]);
  }
  if (combinedWords.length === 0) {
    container.textContent = "No words found for this selection.";
    return;
  }
  const word = randomElement(combinedWords);
  container.textContent = word;
  speakText(word, language);
}

function handleRandomGrammar(language, days, container) {
  let combinedGrammar = [];
  for (const d of days) {
    if (grammarData[language][d]) {
      if (d === 3) {
        const optionsDiv = document.createElement("div");
        optionsDiv.className = "grammar-options";
        
        const questions = questionTranslations[language] || questionTranslations.COSYenglish;
        optionsDiv.innerHTML = `<p>${questions.choose}</p>`;
        
        const options = grammarOptionsText[language] || grammarOptionsText.COSYenglish;
        
        const toHaveOption = document.createElement("div");
        toHaveOption.className = "grammar-option";
        toHaveOption.textContent = options.to_have;
        toHaveOption.addEventListener("click", () => {
          const grammar = randomElement(grammarData[language][d].to_have);
          container.innerHTML = "";
          container.appendChild(document.createTextNode(grammar));
          speakText(grammar, language);
        });
        
        const possessivesOption = document.createElement("div");
        possessivesOption.className = "grammar-option";
        possessivesOption.textContent = options.possessives;
        possessivesOption.addEventListener("click", () => {
          const grammar = randomElement(grammarData[language][d].possessives);
          container.innerHTML = "";
          container.appendChild(document.createTextNode(grammar));
          speakText(grammar, language);
        });
        
        optionsDiv.appendChild(toHaveOption);
        optionsDiv.appendChild(possessivesOption);
        container.appendChild(optionsDiv);
        return;
      } else {
        combinedGrammar = combinedGrammar.concat(grammarData[language][d]);
      }
    }
  }
  
  if (combinedGrammar.length === 0) {
    container.textContent = "No grammar data found for this selection.";
    return;
  }
  
  const grammar = randomElement(combinedGrammar);
  container.textContent = grammar;
  speakText(grammar, language);
}

function handleRandomSpeaking(language, days, container) {
  let combinedSpeaking = [];
  for (const d of days) {
    if (speakingData[language][d]) combinedSpeaking = combinedSpeaking.concat(speakingData[language][d]);
  }
  if (combinedSpeaking.length === 0) {
    container.textContent = "No speaking data found for this selection.";
    return;
  }
  const phrase = randomElement(combinedSpeaking);
  container.textContent = phrase;
  speakText(phrase, language);
}

function handleRandomImage(language, days, container) {
  let combinedImages = [];
  for (const d of days) {
    if (imageData.allLanguages[d]) {
      combinedImages = combinedImages.concat(imageData.allLanguages[d]);
    }
  }
  if (combinedImages.length === 0) {
    container.textContent = "No images found for this selection.";
    return;
  }
  const imgObj = randomElement(combinedImages);
  
  const containerDiv = document.createElement("div");
  containerDiv.className = "image-container";
  
  const questions = questionTranslations[language] || questionTranslations.COSYenglish;
  
  const questionDiv = document.createElement("div");
  questionDiv.className = "image-question";
  
  if (days.includes(1)) {
    questionDiv.textContent = questions.what;
  } else {
    questionDiv.innerHTML = `${questions.who}<br>${questions.what}`;
  }
  
  const imgElem = document.createElement("img");
  imgElem.src = imgObj.src;
  imgElem.className = "vocab-image";
  
  const altText = imgObj.translations?.[language] || imgObj.alt || "Image";
  imgElem.alt = altText;
  
  const caption = document.createElement("div");
  caption.className = "image-caption";
  caption.textContent = altText;
  
  imgElem.addEventListener("click", () => {
    caption.style.display = caption.style.display === "none" ? "block" : "none";
  });
  
  caption.style.display = "none";
  
  containerDiv.appendChild(questionDiv);
  containerDiv.appendChild(imgElem);
  containerDiv.appendChild(caption);
  
  container.appendChild(containerDiv);
}

// Utility functions
function validDayRange(from, to) {
  if (!from || !to) return false;
  return Number(from) <= Number(to);
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getBestVoice(languageCode, voiceURI) {
  const voices = window.speechSynthesis.getVoices();
  
  if (voiceURI) {
    const exactVoice = voices.find(v => v.voiceURI === voiceURI);
    if (exactVoice) return exactVoice;
  }
  
  const langVoices = voices.filter(v => v.lang === languageCode);
  if (langVoices.length > 0) {
    const localServiceVoice = langVoices.find(v => v.localService);
    if (localServiceVoice) return localServiceVoice;
    return langVoices[0];
  }
  
  return voices[0] || null;
}

function speakText(text, language) {
  if (!window.speechSynthesis) {
    console.warn("Speech synthesis not supported");
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  const voiceSettings = voiceLanguageMap[language] || voiceLanguageMap.COSYenglish;
  const voice = getBestVoice(voiceSettings.lang, voiceSettings.voiceURI);
  
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
  }

  window.speechSynthesis.speak(utterance);
}
