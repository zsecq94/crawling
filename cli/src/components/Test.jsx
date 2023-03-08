import { useState } from "react";
import axios from "axios";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import "./Test.scss";

const Test = () => {
  const [keyword, setKeyword] = useState("");
  const [title, setTitle] = useState([]);
  const [url, setUrl] = useState([]);
  const [thumb, setThumb] = useState([]);

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
    if (e.key === "Enter") {
      go();
    }
  };

  const go = async () => {
    const data = { keyword: keyword };
    const res = await axios.get("http://localhost:3001/crawling", {
      params: data,
    });
    console.log(res);
    setTitle(res.data.title);
    setUrl(res.data.url);
    setThumb(res.data.thumb);
  };

  return (
    <div className="test-main">
      <input type="text" onChange={changeKeyword} onKeyPress={changeKeyword} />
      <button onClick={go}>검색하기</button>
      {title.length === 0 ? (
        <h2>검색해주세요</h2>
      ) : (
        <div className="test-card-main">
          {title.map((V, index) => {
            return (
              <div className="test-card-card">
                <Card sx={{ minHeight: "280px", width: 320 }}>
                  <CardCover>
                    <img src={thumb[index]} loading="lazy" alt="" />
                  </CardCover>
                  <CardCover
                    sx={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                  />
                  <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography
                      level="h2"
                      fontSize="lg"
                      textColor="#fff"
                      mb={1}
                    >
                      <a href={url[index]} target="_blank">
                        {V}
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Test;
