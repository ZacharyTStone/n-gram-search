import React, { useState } from "react";
import { handleFileChange } from "./UTILS/handleFileChange";
import { indexCSV } from "./UTILS/indexCSV";
import { findMatches } from "./UTILS/findMatches";
import { convertTextToBigramArr } from "./UTILS/convertTextToBigramArr";
import Papa from "papaparse";

const App = () => {
  // This state will store the raw data
  const [CSV, setCSV] = useState([]);

  const [indexedCSV, setIndexedCSV] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [matches, setMatches] = useState([]);

  const [gramCount, setGramCount] = useState(0);

  const [grams, setGrams] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    const file = handleFileChange(e);
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        complete: (results) => {
          setCSV(results.data);
          setIndexedCSV(indexCSV(results.data));
          setLoading(false);
        },
      });
    }
  };

  // handle search and set loading
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const searchTextBigrams = convertTextToBigramArr(searchText);
    const matches = await findMatches(indexedCSV, searchTextBigrams, gramCount);
    setMatches(matches);
    setLoading(false);
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
        <div>
          <label htmlFor="csvInput" style={{ display: "block" }}>
            Enter CSV File (must be UTF-8 encoded)
          </label>
          <input
            onChange={(e) => {
              e.preventDefault();
              handleUpload(e);
            }}
            id="csvInput"
            name="file"
            type="File"
          />
          <div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                const searchTextBigrams = convertTextToBigramArr(
                  e.target.value
                );

                setGrams(searchTextBigrams);
                setGramCount(searchTextBigrams.length);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                const searchTextBigrams = convertTextToBigramArr(searchText);
                setMatches(
                  findMatches(indexedCSV, searchTextBigrams, gramCount)
                );
                setLoading(false);
              }}
            >
              calulate matches
            </button>
          </div>
          <div>
            {matches.length > 0 ? (
              <div>
                <h2>Matches</h2>
                {matches.map((match) => {
                  return <p>{CSV[match]}</p>;
                })}
              </div>
            ) : (
              <div>
                <h2>No Matches</h2>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
};
export default App;
