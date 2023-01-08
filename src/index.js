import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function App() {
  const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";
  const defaultPaginatedNumber = 5;
  const [repositories, setData] = useState({});
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch(SEARCH_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setCount(data?.items?.length);
        const copy = { ...data };
        const newdata = copy?.items?.splice(0, defaultPaginatedNumber);
        setData({ items: newdata, data: copy });
      });
  }, []);
  const onClickMore = () => {
    let newCloned =
      repositories?.data?.items?.splice(0, defaultPaginatedNumber) || [];
    setData({
      ...repositories,
      items: [...repositories.items, ...newCloned]
    });
  };
  const onClickLess = () => {
    let clonedRepo =
      repositories?.items?.splice(
        repositories.items?.length - defaultPaginatedNumber,
        defaultPaginatedNumber
      ) || [];
    setData({
      ...repositories,
      items: [...repositories.items]
    });
  };
  return (
    <div className="App">
      <table id="html-data-table">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stars</th>
            <th>Forks</th>
          </tr>
          {repositories.items &&
            repositories?.items?.map(
              ({ name, id, stargazers_count, forks }, index) => {
                return (
                  <tr key={index}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{stargazers_count}</td>
                    <td>{forks}</td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
      <div className="button-wrapper">
        <button
          onClick={onClickLess}
          disabled={repositories?.items?.length === defaultPaginatedNumber}
        >
          See less
        </button>
        <button
          disabled={repositories?.items?.length === count}
          onClick={onClickMore}
        >
          See more
        </button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
