// Function to get random element from array
    function randomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

// Validate range input: dayFrom <= dayTo
    function validDayRange(from, to) {
      if (!from || !to) return false;
      return Number(from) <= Number(to);
    }
