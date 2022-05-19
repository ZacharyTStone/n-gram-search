const indexCSV = (csv) => {
  const index = {};
  //  N = 2 gram

  // iterate through rows
  for (let i = 0; i < csv.length; i++) {
    // combine row into long string without special characters
    let row = csv[i].join("");
    row = row.replace(/[,]/g, "");

    // get the bigrams and add them to the index

    for (let j = 0; j < row.length - 1; j++) {
      let bigram = row.slice(j, j + 2);
      if (index[bigram]) {
        index[bigram].push(i);
      } else {
        index[bigram] = [i];
      }
    }
  }
  return index;
};

export { indexCSV };
