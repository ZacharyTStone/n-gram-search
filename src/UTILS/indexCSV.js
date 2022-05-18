const indexCSV = (csv) => {
  const index = {};
  //  N = 2 gram

  // iterate through rows
  for (let i = 0; i < csv.length; i++) {
    // iterate through words
    for (let y = 0; y < csv[i].length; y++) {
      // split words into 2-grams characters
      let word = csv[i][y];
      while (word.length > 1) {
        let gram = word.slice(0, 2);
        if (index[gram]) {
          // if the gram is already in the index, add the entire row index to the array
          index[gram].push(i);
        } else {
          index[gram] = [i];
        }
        word = word.slice(1);
      }
    }
  }
  console.log(index["渋谷"]);
  var size = Object.keys(index).length;
  console.log(size);
  return index;
};

export { indexCSV };
