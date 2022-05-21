const convertTextToBigramArr = (text) => {
  let searchTextBigrams = [];
  text = text.replace(/\s/g, "");

  while (text.length > 1) {
    let gram = text.slice(0, 2);
    searchTextBigrams.push(gram);
    text = text.slice(1);
  }
  return searchTextBigrams;
};

export { convertTextToBigramArr };
