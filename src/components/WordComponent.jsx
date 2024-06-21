import React, { useContext } from "react";
import ThemeContext from "../../context";

const WordComponent = ({ clue }) => {
  const {theme, setTheme, themes} = useContext(ThemeContext)
  const activeTHeme = themes[theme]
  const word = clue.word || "";

  return (
    <div className={`flex gap-5 border-2 ${activeTHeme.border} rounded-md py-5 px-5 justify-center`}>
      {word.split("").map((char, index) => (
        <div
          key={index}
          className={`w-28 h-32 text-4xl font-bold rounded-md ${activeTHeme.card} ${activeTHeme.text} text-center`}
          style={{ lineHeight: "8rem" }}
        >
          {char || "___"}
        </div>
      ))}
    </div>
  );
};

export default WordComponent;
