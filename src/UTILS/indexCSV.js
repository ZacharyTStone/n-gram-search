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
          if (index[gram].includes(i)) {
            // do nothing
          }
          // if the gram is not in the index, add the entire row index to the array
          else {
            index[gram].push(i);
          }
        } else {
          index[gram] = [i];
        }
        word = word.slice(1);
      }
    }
  }
  console.log("index", index);
  console.log("index length", Object.keys(index).length);
  console.log("shibuya example", index["渋谷"]);
  return index;
};

export { indexCSV };
