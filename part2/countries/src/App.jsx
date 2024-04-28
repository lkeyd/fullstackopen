import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
const api_key = import.meta.env.VITE_SOME_KEY;

const Display = (props) => {
  useEffect(() => {
    if (props.singular) {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${props.displayData[0].latlng[0]}&lon=${props.displayData[0].latlng[1]}&appid=${api_key}`;
      axios.get(url).then((response) => {
        console.log("response 1", response)
      });
    }
  }, [props.singular]);

  const handleButtonClick = (name) => {
    props.handleButtonClick(name);
  };

  return (
    <div>
      {props.singular ? (
        <div>
          <h1>{props.displayData[0].name.common}</h1>
          <p>Capital: {props.displayData[0].capital[0]}</p>
          <p>Area: {props.displayData[0].area}</p>
          <div>
            <h2>Languages:</h2>
            <ul>
              {Object.entries(props.displayData[0].languages).map(
                ([key, value], index) => (
                  <li key={index}>{value}</li>
                )
              )}
            </ul>
            <img src={props.displayData[0].flags.png} alt="PNG Image" />;
          </div>
        </div>
      ) : props.specific ? (
        props.displayData.map((entry) => {
          return (
            <div key={entry.id}>
              <p key={entry.id}>{entry.name.common}</p>
              <button key={entry.id} onClick={() => handleButtonClick(entry.name.common)}>
                Show
              </button>
            </div>
          );
        })
      ) : (
        "Too many matches, specifiy another filter"
      )}
    </div>
  );
};

export default function App() {
  const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
  const [allData, setAllData] = useState([]);
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [specific, setSpecific] = useState(false);
  const [singular, setSingular] = useState(false);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    updateDisplayData(event.target.value);
  };

  const updateDisplayData = (searchTerm) => {
    const filteredData = allData.filter((entry) => {
      return entry.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (filteredData.length <= 10) {
      setSpecific(true);
      setDisplayData(filteredData);
      if (filteredData.length === 1) {
        setSingular(true);
        return;
      }
      setSingular(false);
    } else {
      setSpecific(false);
      setSingular(false);
    }
  };

  const handleShowClick = (name) => {
    setSearch("");
    updateDisplayData(name);
  };

  useEffect(() => {
    console.log("i ran");
    axios
      .get(`${baseUrl}/all`)
      .then((response) => {
        console.log("response", response);
        setAllData(response.data);
      })
      .catch((error) => {
        console.log(`The ${error} error has occurred`);
      });
  }, []);

  return (
    <div>
      find countries :{" "}
      <input onChange={handleSearchChange} value={search}></input>
      <Display
        displayData={displayData}
        specific={specific}
        singular={singular}
        handleButtonClick={handleShowClick}
      />
      <p>{singular}</p>
    </div>
  );
}
