import './App.css';
import React, {useState, useEffect} from "react";
import Meme from './components/meme';

// loop over the templates and display images
const objectToQueryParam = (obj) => {
 const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`)
  return '?' + params.join('&')
}
// create state to hold templates
function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [topText, setTopText] =useState('');
  const [bottomText, setBottomText] =useState('');
  const [meme, setMeme] = useState(null);

// create useEffect to run after first render, fetch value from URL and render response
  useEffect (() => {
    fetch('https://api.imgflip.com/get_memes').then(x => 
      x.json().then(response => setTemplates(response.data.memes))
    );
  }, []);
// set width of the memes and center on page, create delete button to refresh page and delete meme
  if (meme) {
    return (
    <div className="meme" style={{ textAlign: "center" }}>
      <h1>Your Meme</h1>
      <img 
      style={{ width: 1100 }}
      src={meme} alt="custom meme" />
       <button type="submit" className="btn btn-primary" onClick={() => window.location.reload(false)}>Delete Meme</button>
    </div>
    );
  }
// create a form to input text for Meme and display meme selected
  return (
    <div className="fullpage">
    <div className="page" style={{ textAlign: "center"}}>
      {template && (
      <form className="form" onSubmit={async e => {

        // Prevent page from refreshing 
        e.preventDefault()
        // add code to create meme from API
        const params = {
          template_id: template.id,
          text0: topText,
          text1: bottomText,
          username: 'abartak',
          password: 'Password12!'
        }
        const response = await fetch(
          ` https://api.imgflip.com/caption_image${objectToQueryParam(
            params
          )}`
        );
        const json = await response.json();
        setMeme(json.data.url);
      }}
      >
      {/* create text inputs and Create Meme button */}
      <Meme template={template} />
      <div>
        <input className="toptext"
          placeholder="Top Text" 
          value={topText}
          onChange={e => setTopText(e.target.value)}
          />
          </div>
        <div>
        <input className="bottomtext"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={e => setBottomText(e.target.value)}

         />
         </div>
        <button type="submit" className="btn btn-primary">Create Meme</button>
      </form>
      )}
      {!template && 
      (
      // create a fragment to add header
        <>
        <h1>Pick a Meme</h1>
    {/* display all memes, when clicking on a meme, display only that meme */}
      {templates.map(template => {
      return (
        <Meme
        template={template}
          onClick={() => {
          setTemplate(template);
        }}
      />
    );
})}
</>
 
  )}

</div>
</div>
  );
}

export default App;