/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [listTrip, setListTrip] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getTripPost = async (text) => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${text}`
    );
    setListTrip(result.data.data);
  };

  useEffect(() => {
    getTripPost(searchText);
  }, [searchText]);

  return (
    <div className="App">
      <header>
        <h1>เที่ยวไหนดี</h1>
        <p className="search">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          onChange={(event) => {
            setSearchText(event.target.value);
          }}
          value={searchText}
          placeholder="หาที่เที่ยวแล้วไปกัน..."
        />
      </header>
      {listTrip.length > 0 && (
        <>
          {listTrip.map((item) => {
            return (
              <div key={item.eid} className="triplist">
                <img
                  src={item.photos[0]}
                  css={css`
                    padding: 16px;
                    height: 250px;
                    border-radius: 40px;
                    margin-left: 350px;
                    margin-bottom: 20px;
                    margin-right: 30px;
                  `}
                />
                <div className="information">
                  <h2>{item.title}</h2>
                  <p className="description">{item.description}</p>
                  <a href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
