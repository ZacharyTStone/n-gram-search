import React, { useState } from "react";
import Title from "./components/Title";
import Papa from "papaparse";
import "./App.css";

// 手伝う functions

import {
  convertTextToBigramArr,
  findMatches,
  indexCSV,
  combineZipcodesAndPrepString,
  handleFileChange,
} from "./utils";

const App = () => {
  // ファイル
  const [CSV, setCSV] = useState([]);
  // インデックスファイル
  const [indexedCSV, setIndexedCSV] = useState([]);
  //　検索文字列
  const [searchText, setSearchText] = useState("");
  // 検索結果
  const [matches, setMatches] = useState([]);
  //　検索文字列のbigramの数
  const [gramCount, setGramCount] = useState(0);
  // ローディング
  const [loading, setLoading] = useState(false);
  //　UI　を隠す
  const [uploaded, setUploaded] = useState(false);

  const UTFEncodings = ["UTF-8", "UTF-16", "Shift_JIS", "EUC-JP"];

  const [encoding, setEncoding] = useState("UTF-8");

  // 1. CSVを読み込む

  const handleUpload = (e, encodingChoice) => {
    e.preventDefault();
    const file = handleFileChange(e);
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        encoding: encodingChoice,
        complete: (results) => {
          setCSV(results.data);
          setIndexedCSV(indexCSV(results.data)); // 手伝う　function　F
          setLoading(false);
          alert("CSVを読み込みました");
          setUploaded(true);
        },
      });
    }
  };

  // --------------------------------------------------//

  // 2. CSVを検索する

  // --------------------------------------------------//

  const handleSearch = () => {
    setLoading(true);

    //  もっと時間があったら、setTimeoutを使わずに、ASYNC や　Context APi/ Reduxを使たい
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (searchText.length > 0) {
      const searchTextBigrams = convertTextToBigramArr(searchText); // 手伝う function B

      let results = findMatches(indexedCSV, searchTextBigrams, gramCount); // 手伝う function D

      // 日本の郵便番号のCSVのチェック

      if (CSV[0][0] === "01101" || CSV[0][0] === "1101") {
        results = combineZipcodesAndPrepString(results, CSV); // 手伝う function A
      } else {
        // convert the file to string
        results = results.map((result) => {
          let curr = CSV[result].join("");
          return curr;
        });
      }
      setMatches(results);
    }
  };

  // --------------------------------------------------//

  //  UI の　始まる

  // --------------------------------------------------//

  if (loading) {
    return (
      <div>
        <h1>ローディング...</h1>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Title />
        {!uploaded ? (
          <div className="search-container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "20px",
              }}
            >
              <label
                htmlFor="encoding"
                style={{
                  display: "flex",
                  margin: "10px",
                  justifyContent: "center",
                }}
              >
                エンコーディング (デフォルト: UTF-8)
              </label>
              <select
                id="encoding"
                style={{
                  display: "flex",
                  margin: "10px",
                  justifyContent: "center",
                }}
                onChange={(e) => setEncoding(e.target.value)}
              >
                {UTFEncodings.map((encoding) => (
                  <option key={encoding} value={encoding}>
                    {encoding}
                  </option>
                ))}
              </select>
              <label
                htmlFor="csvInput"
                style={{
                  display: "flex",
                  margin: "20px",
                  justifyContent: "center",
                }}
              >
                CSVファイルを選択
              </label>
              <input
                style={{ display: "block", alignSelf: "center" }}
                onChange={(e) => {
                  handleUpload(e, encoding);
                  setUploaded(true);
                }}
                id="csvInput"
                name="file"
                type="File"
              />
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="searchText">
                検索する文字列を入力してください
              </label>

              <input
                type="text"
                value={searchText}
                style={{
                  display: "block",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  const searchTextBigrams = convertTextToBigramArr(
                    e.target.value
                  ); // 手伝う function B

                  setGramCount(searchTextBigrams.length);
                }}
              />
              <button onClick={handleSearch}>検索</button>
            </div>

            <div className="results-container">
              <div
                style={{
                  width: "2000px",
                  minWidth: "100%",
                }}
              >
                <h2
                  style={{
                    textAlign: "center",
                  }}
                >
                  {matches.length}件のヒット
                </h2>

                {matches.map((match) => {
                  return (
                    <p
                      style={{
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      {match}
                    </p>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
};
export default App;
