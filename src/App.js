import React from "react";
import ReactDOM from "react-dom"
import './styles.css';

function App() {
  const [tags,setTags] = React.useState(["React JS"]);
  const Lang = [
    "Java",
    "JavaScript",
    "PHP",
    "Node Js",
    "HTML",
    "HTML5",
    "CSS",
    "CSS3",
    "Laravel",
    "CodeIgniter",
    "MySQL",
    "SQL",
    "React JS"
  ]
  const [searchtext, setSearchtext] = React.useState("");
  const [suggest, setSuggest] = React.useState([]);
  const [resfound, setResfound] = React.useState(true);
  
  const handleChange = (e) => {
    let searchval = e.target.value;
    setSearchtext(searchval);
    let suggestion = [];
    if (searchval.length > 0) {
      suggestion = Lang
        .sort()
        .filter((e) => e.toLowerCase().includes(searchval.toLowerCase()));
      setResfound(suggestion.length !== 0 ? true : false);
    }
    console.log(suggestion);
    setSuggest(suggestion);
    setSearchtext(searchval);
  };

  const suggestedText = (value) => {
    setTags([...tags, value]);
    setSearchtext(value);
    setSuggest([]);
    setSearchtext("");
  };

  const getSuggestion = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Search Content Not Found</p>;
  }
  return (
    <ul>
      {suggest.map((item, index) => {
        return (
          <div className="suggestion" key={index}>
            <li onClick={() => suggestedText(item)}>{item}</li>
            {index !== suggest.length - 1 && <hr />}
          </div>
        );
      })}
    </ul>
  );
};

  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  }
  const addTags = () => {
    if(searchtext !== ""){
      setTags([...tags, searchtext]);
      setSearchtext("");
    }
  };
  return (
    <div className="App">
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							x
						</span>
            </li>
          ))}
          
        </ul>
        <textarea rows="4" cols="50" type="text" className="TextArea" onChange={handleChange} placeholder="Add Tags" value={searchtext} autoFocus />
        <span><button className="Add" onClick={addTags}>+</button></span>
      </div>
      <hr/>
      <span>{getSuggestion()}</span>
    </div>
  );
}

export default App;
