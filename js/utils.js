function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function validDayRange(from, to) {
  return Number(from) <= Number(to);
}
