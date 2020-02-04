import React from 'react';
import './App.css';
import moment from 'moment';

const {useState, useEffect, useRef} = React;

function useJournal() {
  const [entries, setEntries] = useState([]);
  
  const getEntriesFromStorage = () => JSON.parse(
    window.localStorage.getItem('journalEntries')
  );
  const setEntriesToStorage = items => 
  window.localStorage.setItem('journalEntries', JSON.stringify(items));
  useEffect(() => {
    const entriesFromStorage = getEntriesFromStorage();
    if(entriesFromStorage) {
      setEntries(entriesFromStorage);
    }
  }, []);
  
  const storeEntry = (entry) => {
    const newEntries = [entry, ...entries];
    setEntries(newEntries);
    setEntriesToStorage(newEntries);
  }
  
  const removeEntry = (index) => {
    const newEntries = [...entries.slice(0, index), ...entries.slice(index+1)];
    setEntries(newEntries);
    setEntriesToStorage(newEntries);
  }
  
  return [entries, storeEntry, removeEntry];
}

function EntryList({list, deleteEntry}) {
  const handleDeleteClick = (index) => e => {
    deleteEntry(index);
  }
  return (
    <div className="entry-list mt-3">
      {
        list && list.map((item, i) => {
          const itemDate = moment(item.date).fromNow();
          const flagColor = item.flag ? `bg-${item.flag} text-white` : '';
          return (
            <div className={`card mb-2 ${flagColor}`}>
              <div className="card-body">
                <h4 className="card-title">{itemDate}</h4>
                <p className="card-text">Species name : {item.birdName}</p>
                <p className="card-text">{item.noteInfo}</p>                
                <p className="card-text">Rarity : {item.flag}</p>                
                <p><img src={item.imageFile} /></p>
                <button className="btn btn-sm btn-exRare" 
                  onClick={handleDeleteClick(i)}>Delete</button>
              </div>
            </div>  
          )
        })
      }
    </div>
  )
}

function Entry({addEntry}) {
  const [noteInfo, setnoteInfo] = useState('');
  const [birdName, setBirdName]= useState('');
  const [imageFile, uploadImage] = useState('');
  const [flag, setFlag] = useState('');
  const fieldRef = useRef();
  const handleOnChange = e => setnoteInfo(e.target.value);
  const handleOnChangeName = e =>setBirdName(e.target.value);
  const handleFlagChange = e => setFlag(e.target.value);
  const handleOnChangeImage = e => uploadImage(e.target.value);
  const handleOnSubmit = e => {
    e.preventDefault();
    if(noteInfo && noteInfo.trim().length > 0) {
      addEntry({
        noteInfo,
        birdName,
        imageFile,
        flag,
        date: Date.now()
      });
      setnoteInfo('');
      setBirdName('');
      uploadImage('');
      setFlag('');
    }
  }
  
  useEffect(() => {
    fieldRef.current.focus();
  }, []);
  
  return (
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
      <label htmlFor="noteInfo">Enter the bird information:</label>
      <textarea 
        className="form-control"
        value={noteInfo} 
        onChange={handleOnChange} 
        type="text" 
        id="noteInfo" 
        maxLength={100}
        ref={fieldRef}
        />
      </div>

      <div className="form-group">
      <label htmlFor="birdName">Enter the bird species:</label>
      <input
        className="form-control"
        value={birdName} 
        onChange={handleOnChangeName} 
        type="text" 
        id="birdName" 
        maxLength={40}
        />
      </div>
      <div className="form-group">
      <label htmlFor="birdName">Upload your image</label>
      <input
        className="form-control"
        onChange={handleOnChangeImage} 
        type="text" 
        id="imageFile"
        name="imageFile" 
        />
      </div>
      

      <div class="form-check form-check-inline mb-3">
        <label>Select the rarity</label>
        <input className="form-check-input" 
          id="exRare" type="radio" name="rarity" 
          value="exRare" defaultChecked={flag === 'exRare'} 
          onChange={handleFlagChange}/> 
        <label className="form-check-label bg-exRare " 
          htmlFor="exRare">Extremely rare</label>

        <input className="form-check-input" 
          id="rare" type="radio" name="rarity" 
          value="rare" defaultChecked={flag === 'rare'} 
          onChange={handleFlagChange}/>
        <label className="form-check-label bg-rare " 
          htmlFor="rare">Rare</label>

        <input className="form-check-input" 
          id="common" type="radio" name="rarity" 
          value="common" defaultChecked={flag === 'common'} 
          onChange={handleFlagChange}/>
        <label className="form-check-label bg-common " 
          htmlFor="common">Common</label>
      </div>

      <button  
        className="form-control" 
        type="cancel">Cancel</button>
        <button disabled={noteInfo.trim().length === 0 || !flag} 
        className="btn btn-success form-control" 
        type="submit">Save</button>
    </form>
  );
}

function App() {
  const [entries, storeEntry, removeEntry] = useJournal();
  const handleAddEntry = (entry) => storeEntry(entry);
  const handleDeleteEntry = (index) => removeEntry(index);
  return (
    <div className="container">
      <h1 className="text-center">
        Bird watch:
      </h1>
      <Entry addEntry={handleAddEntry}/>
      <EntryList list={entries} deleteEntry={handleDeleteEntry}/>
    </div>
  )
}

export default App;
