import React from "react";
import WordCloud from "react-wordcloud";

const words = [
  { text: "Lorem", value: 10 },
  { text: "Ipsum", value: 7 },
  { text: "Dolor", value: 5 },
  { text: "Sit", value: 8 },
  { text: "Amet", value: 12 },
];

const options = {
  rotations: 2,
  rotationAngles: [-90, 0],
};

const WordCloudComponent = () => <WordCloud words={words} options={options} />;

export default WordCloudComponent;
