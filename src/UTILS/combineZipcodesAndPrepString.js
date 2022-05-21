/* 注意
下記のような一つのレコードが複数行に分かれている箇所が存在する。これについては別のレコードとして 処理してもよいが、結合できることが望ましい。
26105,"605 ","6050874","キヨウトフ","キヨウトシヒガシヤマク","トキワチヨウ","京都府","京都市東山区","常盤町(東大路通渋谷上 る、渋谷通東大路東入、渋谷通東大路東入2丁目、",0,0,0,0,0,0
26105,"605 ","6050874","キヨウトフ","キヨウトシヒガシヤマク","トキワチヨウ","京都府","京都市東山区","東大路五条下る) ",0,0,0,0,0,0
*/

const combineZipcodesAndPrepString = (resultsArr, CSV) => {
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
      combinedResults[combinedResults.length - 1] +=
        "< || >" + currentString.slice(15);
    } else {
      combinedResults.push(currentString);
    }

    count++;
  }

  return combinedResults;
};

export { combineZipcodesAndPrepString };
