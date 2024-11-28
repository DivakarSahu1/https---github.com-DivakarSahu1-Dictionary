import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [audioPlayer, setAudioPlayer] = useState(null);
  const handleInput = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };
  const myFun = async () => {
    const get = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
    );
    const jsonData = await get.json();

    console.log(jsonData);
    setData(jsonData[0]);
  };
  const playAudio = (audioUrl) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setAudioPlayer(audio);
      audio.play();
    } else {
      alert("No audio available for this phonetic.");
    }
  };
  return (
    <>
      <div className="app">
        <h1>Dictionary App</h1>
        <div className="container">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search Word's"
              onChange={handleInput}
            />
            <button onClick={myFun}>Search</button>
          </div>
          <div className="datas">
            {data ? (
              <div className="datas">
                <h2>Word: {data.word}</h2>
                <p>Part of speech: {data.meanings[0].partOfSpeech}</p>
                <p>Definition: {data.meanings[0].definitions[0].definition}</p>
                <p>Example:{data.meanings[0].definitions[0].example}</p>
                <p>Phonetic: {data.phonetics[0].text}</p>
                <button
                  onClick={() => window.open(data.sourceUrls[0], "_blank")}
                >
                  Read More
                </button>

                {/* Display phonetic transcription */}
                {data.phonetics && data.phonetics.length > 0 && (
                  <div>
                    {/* If there's an audio URL, add a Play button */}
                    {data.phonetics[0].audio && (
                      <button
                        onClick={() => playAudio(data.phonetics[0].audio)}
                      >
                        Play Audio
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
