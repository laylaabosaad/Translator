import axios from "axios";
import { useEffect, useState } from "react";

function Translator() {
  const [languages, setLanguages] = useState([]);
  const [target_language, setTargetLanguage] = useState("");
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  const fetchLanguages = async () => {
    const options = {
      method: "GET",
      url: "https://text-translator2.p.rapidapi.com/getLanguages",
      headers: {
        "X-RapidAPI-Key": "ed421c2961msh320ba132df3b5efp1a1c0ejsne22787fbf7f8",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setLanguages(response.data.data.languages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", "auto");
    encodedParams.set("target_language", `${target_language}`);
    encodedParams.set("text", textToTranslate);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "ed421c2961msh320ba132df3b5efp1a1c0ejsne22787fbf7f8",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleClear = () => {
    setTextToTranslate("");
    setTargetLanguage("");
    setTranslatedText("");
  };

  return (
    <div className="translator-container">
      <h1>Welcome to Translator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter text to translate"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        />
        <select
          name="target-language"
          value={target_language}
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option>
            Select a language
          </option>
          {languages.map((item, index) => (
            <option key={index} value={`${item.code}`}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="btn-group">
          <button className="translate-btn" type="submit">
            Translate
          </button>
          <button className="clear-btn" type="button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
      {translatedText && (
        <div className="translated-text">
          <h2>Translated text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default Translator;
