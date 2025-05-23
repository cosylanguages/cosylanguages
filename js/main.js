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
      // Check that either day is selected OR a valid range is selected
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
          {
            // Random word from selected day(s)
            let combinedWords = [];
            for (const d of daysToUse) {
              if (vocabData[language][d]) combinedWords = combinedWords.concat(vocabData[language][d]);
            }
            if (combinedWords.length === 0) {
              resultContainer.textContent = "No words found for this selection.";
              break;
            }
            const word = randomElement(combinedWords);
            resultContainer.textContent = word;
            speakText(word, language);
          }
          break;

        case "random_grammar":
          {
            let combinedGrammar = [];
            for (const d of daysToUse) {
              if (grammarData[language][d]) {
                if (d === 3) {
                  // For day 3, show options to choose grammar type
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
                    resultContainer.innerHTML = "";
                    resultContainer.appendChild(document.createTextNode(grammar));
                    speakText(grammar, language);
                  });
                  
                  const possessivesOption = document.createElement("div");
                  possessivesOption.className = "grammar-option";
                  possessivesOption.textContent = options.possessives;
                  possessivesOption.addEventListener("click", () => {
                    const grammar = randomElement(grammarData[language][d].possessives);
                    resultContainer.innerHTML = "";
                    resultContainer.appendChild(document.createTextNode(grammar));
                    speakText(grammar, language);
                  });
                  
                  optionsDiv.appendChild(toHaveOption);
                  optionsDiv.appendChild(possessivesOption);
                  resultContainer.appendChild(optionsDiv);
                  return;
                } else {
                  combinedGrammar = combinedGrammar.concat(grammarData[language][d]);
                }
              }
            }
            
            if (combinedGrammar.length === 0) {
              resultContainer.textContent = "No grammar data found for this selection.";
              break;
            }
            
            const grammar = randomElement(combinedGrammar);
            resultContainer.textContent = grammar;
            speakText(grammar, language);
          }
          break;

        case "random_speaking":
          {
            // Random speaking phrase from selected day(s)
            let combinedSpeaking = [];
            for (const d of daysToUse) {
              if (speakingData[language][d]) combinedSpeaking = combinedSpeaking.concat(speakingData[language][d]);
            }
            if (combinedSpeaking.length === 0) {
              resultContainer.textContent = "No speaking data found for this selection.";
              break;
            }
            const phrase = randomElement(combinedSpeaking);
            resultContainer.textContent = phrase;
            speakText(phrase, language);
          }
          break;

        case "random_image":
          {
            // Random image from selected day(s)
            let combinedImages = [];
            for (const d of daysToUse) {
              if (imageData.allLanguages[d]) {
                combinedImages = combinedImages.concat(imageData.allLanguages[d]);
              }
            }
            if (combinedImages.length === 0) {
              resultContainer.textContent = "No images found for this selection.";
              break;
            }
            const imgObj = randomElement(combinedImages);
            
            // Create container for image and caption
            const container = document.createElement("div");
            container.className = "image-container";
            
            // Get questions in selected language
            const questions = questionTranslations[language] || questionTranslations.COSYenglish;
            
            // Create question based on day
            const questionDiv = document.createElement("div");
            questionDiv.className = "image-question";
            
            if (daysToUse.includes(1)) {
              questionDiv.textContent = questions.what;
            } else {
              questionDiv.innerHTML = `${questions.who}<br>${questions.what}`;
            }
            
            // Create image element
            const imgElem = document.createElement("img");
            imgElem.src = imgObj.src;
            imgElem.className = "vocab-image";
            
            // Use translated alt text if available
            const altText = imgObj.translations?.[language] || imgObj.alt || "Image";
            imgElem.alt = altText;
            
            // Create caption element
            const caption = document.createElement("div");
            caption.className = "image-caption";
            caption.textContent = altText;
            
            // Add click event to toggle caption visibility
            imgElem.addEventListener("click", () => {
              caption.style.display = caption.style.display === "none" ? "block" : "none";
            });
            
            // Initially hide the caption
            caption.style.display = "none";
            
            // Add elements to container
            container.appendChild(questionDiv);
            container.appendChild(imgElem);
            container.appendChild(caption);
            
            // Add container to result
            resultContainer.appendChild(container);
          }
          break;

        default:
          resultContainer.textContent = "Invalid practice type selected.";
      }
    });
