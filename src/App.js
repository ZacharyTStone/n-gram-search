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

  const [grams, setGrams] = useState([]);

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

  const findMatches = (indexedCSV, searchTextBigrams, gramCount) => {
    const matches = {};
    console.log("searchTextBigrams", searchTextBigrams);
    console.log("gramCount", gramCount);
    console.log("indexedCSV", indexedCSV);

    // add all of the bigrams to the matches array

    for (let i = 0; i < searchTextBigrams.length; i++) {
      let bigram = searchTextBigrams[i];
      if (indexedCSV[bigram]) {
        // iterate through the indexes and add them to the matches array and add the count + 1 to the matches count
        for (let y = 0; y < indexedCSV[bigram].length; y++) {
          let index = indexedCSV[bigram][y];
          if (matches[index]) {
            matches[index] += 1;
          } else {
            matches[index] = 1;
          }
        }
      }
    }

    // make a results array of all the matche key value parist that have a count = to the gramCount

    let results = [];

    for (let key in matches) {
      if (matches[key] >= gramCount) {
        results.push(key);
      }
    }

    console.log("results", results);
    console.log("gram count", gramCount);

    console.log("shibuya test matches", indexedCSV["渋谷"]);
    console.log("matches", matches);

    setMatches(results);
  };

  return (
    <div>
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
        <button
          onClick={() => {
            console.log(indexedCSV);
            console.log(Object.keys(indexedCSV).length);
          }}
        >
          console log indexedCSV
        </button>
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            let search = e.target.value;
            setSearchText(search);

            // get all of the bigrams from the search text character by character

            let searchTextBigrams = []; // remove all of the spaces from the search text
            let word = search.replace(/\s/g, "");
            console.log("word", word);
            while (word.length > 1) {
              let gram = word.slice(0, 2);
              searchTextBigrams.push(gram);
              word = word.slice(1);
            }
            setGrams(searchTextBigrams);
            setGramCount(searchTextBigrams.length);
          }}
        />
        <button
          onClick={() => {
            findMatches(indexedCSV, grams, gramCount);
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
};

export default App;
