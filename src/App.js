import React, { useState } from "react";
import { handleFileChange } from "./UTILS/uploadCSV";
import { indexCSV } from "./UTILS/indexCSV";
import Papa from "papaparse";

const App = () => {
  // This state will store the raw data
  const [CSV, setCSV] = useState([]);

  const [indexedCSV, setIndexedCSV] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [currentSearch, setCurrentSearch] = useState("");

  const [searchResults, setSearchResults] = useState("");

  const [possibleMatches, setPossibleMatches] = useState([]);

  const [matches, setMatches] = useState([]);

  const [gramCount, setGramCount] = useState(0);

  // It will store the file uploaded by the user
  const [file, setFile] = useState("");

  // parse the file and set the state
  // must be called in the same state as the useState file since it is unable to return a file using complete.
  const parseCSV = (file) => {
    // Parse the CSV file
    Papa.parse(file, {
      complete: (results) => {
        // Set the CSV state
        setCSV(results.data);
      },
    });
  };

  const findMatches = (allPosibleMatches) => {
    const matches = [];
    allPosibleMatches.forEach((match) => {
      if (match.length > gramCount) {
        matches.push(match);
      }
    });
    console.log(matches);
    setMatches(matches);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "1rem",
      }}
    >
      <label htmlFor="csvInput" style={{ display: "block" }}>
        Enter CSV File
      </label>
      <input
        onChange={(e) => {
          setFile(handleFileChange(e));
        }}
        id="csvInput"
        name="file"
        type="File"
      />
      <div>
        <button
          onClick={() => {
            parseCSV(file);
          }}
        >
          Upload
        </button>
        <button
          onClick={() => {
            setIndexedCSV(indexCSV(CSV));
          }}
        >
          Index
        </button>
        <button
          onClick={() => {
            console.log(CSV);
          }}
        >
          console log CSV
        </button>
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            const search = e.target.value;
          }}
        />
        <button
          onClick={() => {
            findMatches(possibleMatches);
          }}
        >
          calulate matches
        </button>
        <p>
          {possibleMatches.length} possible matches for {searchText}
        </p>
      </div>
    </div>
  );
};

export default App;
