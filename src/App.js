import React, { useState, useEffect } from 'react'
import './App.css';
import moment from 'moment';

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
    console.log(entriesFromStorage);
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

  return (
    <div className="App">
      <h2>Bird Watch</h2>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Enter bird Information</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" placeholder="Species name.." onChange={updateName} />
        </div>
        <div className="form-group">
          <label>Info</label>
          <textarea placeholder="Add extra information.." onChange={updateInfo}></textarea>
        </div>
        <div className="form-group">
          <label> Select the rarity type:</label>
          <div className="radio-options">
            <div className="radio-input"> <input type="radio" name="rarity" value="common" onChange={updateRarity} /> Common</div>
            <div className="radio-input"><input type="radio" name="rarity" value="rare" onChange={updateRarity} /> Rare</div>
            <div className="radio-input"><input type="radio" name="rarity" value="extremely rare" onChange={updateRarity} /> Extremely rare</div>
          </div>
          <div className="form-buttons">
            <input type="submit" className="button" value="Save" />
            <input type="reset" className="button" value="Cancel" />
          </div>

        </div>
      </form>

      <div className="bird-info-results">
        {

          birdDatas.map(data => (


            <div className="bird-card">
              <p>{moment(data.date).fromNow()}</p>
              <p>{data.name}</p>
              <p>{data.info}</p>
              <p>{data.rarity}</p>
              <hr />

            </div>

          ))
        }

      </div>







    </div>
  )


}
export default App;