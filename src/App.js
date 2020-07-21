import React, { useState,useEffect } from "react";
import "./App.css";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Recipe from "./components/Recipe";
import Alert from "./components/Alert";

import  'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [query, setQuery] = useState("porridge");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "4e9f05eb";
  const APP_KEY = "9b904d703fa0d46a88ce1ac63f29f498";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };
  useEffect(() => {
    return () => {
        getData();
    };
}, [])
  const onChange = e => setQuery(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
  
    getData();
  };
 
  return (

    <div className="App animated" >
  
  
     <div className="background">
    
     <h1>Search Your Favourite Food</h1>
     <br/>
     <form onSubmit={onSubmit} className="search-form">
       {alert !== "" && <Alert alert={alert} />}
       <input
         type="text"
         name="query"
         onChange={onChange}
         value={query}
         autoComplete="off"
         placeholder="Search Food"
       />
       <input type="submit" value="Search" />
     </form>
    
   
     </div>
     <br/>
     <br/>
      <div className="recipes">
     
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
     

    </div>
 
 


    
  );
}

export default App;
