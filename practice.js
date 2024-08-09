function displayCount(number, tempValue = 0) {
  if (number === tempValue) {
    return;
  }

  console.log(tempValue);
  tempValue++;

  return displayCount(number, tempValue);
}

displayCount(5);
