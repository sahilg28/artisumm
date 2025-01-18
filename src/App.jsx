import axios from "axios";
import { useState } from "react";

const App = () => {

  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    setText(e.target.value);
  }

  const summarize = async () => {
    setIsLoading(true);
    const options = {
      method: 'GET',
      url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
      params: {
        url: text,
        lang: 'en',
        engine: '2'
      },
      headers: {
        'x-rapidapi-key': 'f40f01a583msh3a3c136fc31c7d8p1b1ef1jsnc604e901f38f',
        'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    setSummary(response.data.summary);
    setIsLoading(false);
  }

  const resetFields = () => {
    setText('');
    setSummary('');
    setIsLoading(false);
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <div className="flex-grow flex flex-col items-center">
        <h1 className="text-4xl font-bold mt-5">ARTISUMM ✨</h1>
        <h1 className="text-2xl font-semibold text-center mt-5">Welcome to Artisumm an Article Summariser!</h1>
        <p className="text-center text-lg text-gray-300 w-full max-w-2xl mt-2">
          To use this application, go below to the input field, enter your article URL, and click the Submit button. 
          Wait for a few seconds, and you will receive a generated summary of your input article!
        </p>
        <div className="flex items-center justify-center gap-x-2 mt-5">
          <input className="text-black outline-none border-none rounded-md px-2 py-1 placeholder:text-zinc-500 w-96" onChange={handleInput} type="text" placeholder="Enter the article URL" value={text} />
          <button className={`bg-zinc-800 px-4 py-1 rounded-md font-semibold hover:bg-zinc-900 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={summarize} disabled={isLoading}>Submit</button>
          <button className="bg-red-600 px-4 py-1 rounded-md font-semibold hover:bg-red-700" onClick={resetFields}>Clear</button>
        </div>
        <div className="w-full max-w-2xl h-64 rounded-md bg-zinc-200 text-black text-justify px-4 py-2 overflow-x-hidden mt-5">
          {isLoading ? (
            <p className="text-center text-lg text-gray-500">Please wait, generating summary...</p>
          ) : (
            summary
          )}
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className="w-full bg-black py-2 flex justify-center items-center">
        <p className="text-gray-300 text-sm mr-2">
          Developed by Sahil Gupta ❤️
        </p>
        <a 
          href="https://github.com/sahilg28" 
          target="_blank" 
          className="bg-red-600 text-white font-semibold px-2 py-1 rounded-md hover:bg-red-700 text-sm"
        >
          GitHub
        </a>
      </footer>
    </div>
  )
}

export default App;