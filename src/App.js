import React, { useState, useEffect } from 'react'
import './App.css';

// comp

import BirdList from './components/BirdList'

const App = () => {

  const [name, setName] = useState('');
  const [info, setInfo] = useState('');
  const [rarity, setRarity] = useState('');

  const [birdDatas, setBirdDatas] = useState([]);

  // get data from storage 
  const getDataFromStorage = () => JSON.parse(
    window.localStorage.getItem('birdDatas')
  );



  // store data to local storage
  const setDataToStorage = (items) => window.localStorage.setItem('birdDatas', JSON.stringify(items));

  // check for storage data and updates birdDatas  
  useEffect(() => {
    const entriesFromStorage = getDataFromStorage();

    if (entriesFromStorage) {
      setBirdDatas(entriesFromStorage);
    }
  }, [])

  // function to store data to local storage

  const storeData = (data) => {
    const newData = [data, ...birdDatas];
    setBirdDatas(newData);
    setDataToStorage(newData);

  }

  // getting value from input field
  const updateName = (e) => {
    setName(e.target.value);
  }
  const updateInfo = (e) => {
    setInfo(e.target.value);
  }
  const updateRarity = (e) => {
    setRarity(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      info: info,
      rarity: rarity,
      date: Date.now()
    }
    storeData(data);

  }

  // function to remove data from list

  const removeData = (id) => {
    const dataCopy = [...birdDatas];
    if (id !== -1) {
      dataCopy.splice(id, 1);
      setBirdDatas(dataCopy);
      setDataToStorage(dataCopy);

    }
  }

  // toggle CSS to show or hide some class
  const toggleCSS = () => {
    const form = document.getElementById("form");
    const mainCTA = document.getElementById("main-cta");
    form.classList.toggle("display-none");
    mainCTA.classList.toggle("display-none");
  }

  return (
    <div className="App">
      <h2>birdWatch</h2>
      <form id="form" className="form display-none" onSubmit={handleSubmit}>
        <h3>Enter a bird Information</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Species name.." required onChange={updateName} />
        </div>
        <div className="form-group">
          <label>Info</label>
          <textarea placeholder="Add extra information.." required onChange={updateInfo}></textarea>
        </div>
        <div className="form-group">
          <label> Select the rarity type:</label>
          <div className="radio-options">
            <div className="radio-input"> <input type="radio" name="rarity" value="common" required onChange={updateRarity} /> Common</div>
            <div className="radio-input"><input type="radio" name="rarity" value="rare" required onChange={updateRarity} /> Rare</div>
            <div className="radio-input"><input type="radio" name="rarity" value="extremely rare" required onChange={updateRarity} /> Extremely rare</div>
          </div>
          <div className="form-buttons">
            <input type="submit" className="button" value="Save" />
            <input type="reset" className="button" value="Close" onClick={toggleCSS} />
          </div>

        </div>
      </form>
      <div className="form">
        <div className="form-buttons">
          <input id="main-cta" type="submit" className="button CTA" value="Add a bird info" onClick={toggleCSS} />
        </div>
      </div>

      <BirdList data={birdDatas} f={removeData} />
    </div>
  )


}
export default App;