const findMatches = (indexedCSV, searchTextBigrams, gramCount) => {
  const matches = {};

  // add all of the bigrams to the matches array

  for (let i = 0; i < searchTextBigrams.length; i++) {
    let bigram = searchTextBigrams[i];
    if (indexedCSV[bigram]) {
      // iterate through the indexes and add them to the matches array and add the count + 1 to the matches count
      for (let y = 0; y < indexedCSV[bigram].length; y++) {
        let index = indexedCSV[bigram][y];
        if (matches[index]) {
          matches[index] += 1;
        } else {
          matches[index] = 1;
        }
      }
    }
  }

  // make a results array of all the matche key value parist that have a count = to the gramCount

  let results = [];

  for (let key in matches) {
    if (matches[key] >= gramCount) {
      results.push(key);
    }
  }

  return results;
};

export { findMatches };
