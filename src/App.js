import React, { useState } from "react";
import Title from "./components/Title";
import Papa from "papaparse";
import "./App.css";

// helper functions

import {
  combineZipcodesAndPrepString,
  convertTextToBigramArr,
  findMatches,
  handleFileChange,
  indexCSV,
} from "./utils";

const App = () => {
  const [CSV, setCSV] = useState([]);

  const [indexedCSV, setIndexedCSV] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [matches, setMatches] = useState([]);

  const [gramCount, setGramCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const UTFEncodings = ["UTF-8", "UTF-16", "Shift_JIS", "EUC-JP"];

  const [encoding, setEncoding] = useState("UTF-8");

  // 1. called when user uploads a file

  const handleUpload = (e, encodingChoice) => {
    // dont hide the file input
    e.preventDefault();
    const file = handleFileChange(e);
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        encoding: encodingChoice,
        complete: (results) => {
          setCSV(results.data);
          setIndexedCSV(indexCSV(results.data));
          setLoading(false);
          alert("File uploaded");
          setUploaded(true);
        },
      });
    }
  };

  // 2.  called when user searches

  const handleSearch = () => {
    setLoading(true);
    if (searchText.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    const searchTextBigrams = convertTextToBigramArr(searchText);

    let results = findMatches(indexedCSV, searchTextBigrams, gramCount);
    console.log(results);

    // check just to see if the file is the Japan one
    console.log(CSV[0][0]);
    if (CSV[0][0] === "01101" || CSV[0][0] === "1101") {
      // if the file is the Japan one, then we need to combine the zipcodes
      results = combineZipcodesAndPrepString(results, CSV);
    } else {
      // convert the file to string
      results = results.map((result) => {
        let curr = CSV[result].join("");
        return curr;
      });
    }
    setMatches(results);
  };

  // begining of UI Code

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Title />
        <div className="search-container">
          {!uploaded ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
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
                Encoding (default: UTF-8)
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
                Enter CSV File
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
          ) : null}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label htmlFor="searchText">Search Text</label>

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
                );

                setGramCount(searchTextBigrams.length);
              }}
            />
            <button onClick={handleSearch}>calulate matches</button>
          </div>
        </div>
        <div className="results-container">
          {matches.length > 0 ? (
            <div>
              <h2
                style={{
                  textAlign: "center",
                }}
              >
                Matches
              </h2>

              {matches.map((match) => {
                return (
                  <p
                    style={{
                      padding: "10px",
                    }}
                  >
                    {match}
                  </p>
                );
              })}
            </div>
          ) : (
            <div>
              <h2
                style={{
                  textAlign: "center",
                }}
              >
                No Matches
              </h2>
            </div>
          )}
        </div>
      </div>
    );
  }
};
export default App;
