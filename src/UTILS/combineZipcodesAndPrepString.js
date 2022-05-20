const combineZipcodesAndPrepString = (resultsArr, CSV) => {
  // go through the results array and combine any entries that have the same zipcode
  console.log(resultsArr);
  console.log(CSV);

  console.log("triggered");

  let combinedResults = [];

  let count = 0;

  while (count < resultsArr.length) {
    let currentString = CSV[resultsArr[count]].join("");
    let currentZipcode = currentString.slice(0, 15);
    let previousZipcode = "";
    if (count > 1) {
      previousZipcode = CSV[resultsArr[count - 1]].join("").slice(0, 15);
    }
    if (combinedResults.length === 0) {
      combinedResults.push(currentString);
    } else if (previousZipcode === currentZipcode) {
      console.log("did something");
      combinedResults[combinedResults.length - 1] +=
        " || " + currentString.slice(15);
    } else {
      combinedResults.push(currentString);
    }

    count++;
  }

  console.log(combinedResults);

  return combinedResults;
};

export { combineZipcodesAndPrepString };
