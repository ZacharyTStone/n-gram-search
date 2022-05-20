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

  const handleUpload = (e) => {
    // dont hide the file input
    e.preventDefault();

    const file = handleFileChange(e);
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        encoding: "Shift_JIS",
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

  // handle search and set loading
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTextBigrams = convertTextToBigramArr(searchText);
    const matches = findMatches(indexedCSV, searchTextBigrams, gramCount);
    setMatches(matches);
  };
  {
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
                  htmlFor="csvInput"
                  style={{
                    display: "flex",
                    margin: "20px",
                    justifyContent: "center",
                  }}
                >
                  Enter CSV File (must be Shift_JIS encoded)
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
                style={{ display: "block" }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  const searchTextBigrams = convertTextToBigramArr(
                    e.target.value
                  );

                  setGramCount(searchTextBigrams.length);
                }}
              />
              <button
                onClick={(e) => {
                  handleSearch(e);
                }}
              >
                calulate matches
              </button>
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
  }
};
export default App;
