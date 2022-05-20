import React, { useState } from "react";
import { handleFileChange } from "./UTILS/handleFileChange";
import { indexCSV } from "./UTILS/indexCSV";
import { findMatches } from "./UTILS/findMatches";
import { convertTextToBigramArr } from "./UTILS/convertTextToBigramArr";
import Papa from "papaparse";
import "./App.css";

const App = () => {
  // This state will store the raw data
  const [CSV, setCSV] = useState([]);

  const [indexedCSV, setIndexedCSV] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [matches, setMatches] = useState([]);

  const [gramCount, setGramCount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const UTFEncodings = ["UTF-8", "UTF-16", "Shift_JIS", "EUC-JP"];

  const [encoding, setEncoding] = useState("UTF-8");

  const handleUpload = (e) => {
    // dont hide the file input
    e.preventDefault();
    console.log(encoding);
    const file = handleFileChange(e);
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        encoding: { encoding },
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

  const handleSearch = () => {
    setLoading(true);
    if (searchText.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    console.log("set loading");
    setMatches([]);

    const searchTextBigrams = convertTextToBigramArr(searchText);

    const results = findMatches(indexedCSV, searchTextBigrams, gramCount);

    setMatches(results);
  };
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h1 className="title">CSV Search</h1>
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
                  handleUpload(e);
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
              margin: "20px",
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
                    {CSV[match]}
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
