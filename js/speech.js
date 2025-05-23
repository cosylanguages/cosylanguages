const voiceLanguageMap = {
      COSYenglish: { lang: "en-US", voiceURI: "Google US English" },
      COSYfrançais: { lang: "fr-FR", voiceURI: "Google français" },
      COSYitaliano: { lang: "it-IT", voiceURI: "Google italiano" },
      COSYespañol: { lang: "es-ES", voiceURI: "Google español" },
      COSYportuguês: { lang: "pt-PT", voiceURI: "Google português" },
      COSYdeutsch: { lang: "de-DE", voiceURI: "Google Deutsch" },
      ΚΟΖΥελληνικά: { lang: "el-GR", voiceURI: "Google ελληνικά" },
      ТАКОЙрусский: { lang: "ru-RU", voiceURI: "Google русский" },
      ԾՈՍՅհայկական: { lang: "hy-AM", voiceURI: "" }
    };

    // Function to get the best available voice
    function getBestVoice(languageCode, voiceURI) {
      const voices = window.speechSynthesis.getVoices();
      
      // First try to find exact match by voiceURI
      if (voiceURI) {
        const exactVoice = voices.find(v => v.voiceURI === voiceURI);
        if (exactVoice) return exactVoice;
      }
      
      // Then try to find by language
      const langVoices = voices.filter(v => v.lang === languageCode);
      if (langVoices.length > 0) {
        // Prefer voices with localService (usually higher quality)
        const localServiceVoice = langVoices.find(v => v.localService);
        if (localServiceVoice) return localServiceVoice;
        
        // Return the first available voice for the language
        return langVoices[0];
      }
      
      // Fallback to any available voice
      return voices[0] || null;
    }

    // Function to speak text with selected voice and language
    function speakText(text, language) {
      if (!window.speechSynthesis) {
        console.warn("Speech synthesis not supported");
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Get voice settings for the language
      const voiceSettings = voiceLanguageMap[language] || voiceLanguageMap.COSYenglish;
      
      // Try to get the best voice available
      const voice = getBestVoice(voiceSettings.lang, voiceSettings.voiceURI);
      
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
        
        // Adjust speech rate and pitch for more natural sound
        utterance.rate = 0.9; // Slightly slower than default
        utterance.pitch = 1.0; // Normal pitch
      }

      // Speak the text
      window.speechSynthesis.speak(utterance);
    }



// Load voices asynchronously - workaround for some browsers
    if (typeof speechSynthesis !== "undefined") {
      // Some browsers need this to populate voices
      speechSynthesis.onvoiceschanged = () => {
        console.log("Voices changed, available voices:", window.speechSynthesis.getVoices());
      };
      
      // Try to preload voices
      window.speechSynthesis.getVoices();
    }
