import React from 'react'
import moment from 'moment';

const BirdList = (props) => {

    const sortByDate = () => {
        const newDataList = props.data;
        newDataList.sort((a, b) => a.date > b.date ? 1 : -1);
        return newDataList;
    }
    const newData = sortByDate();

    if (props.data.length > 0) {
        return (

            <div className="bird-list">
                <div className="sort-filter">
                    <p>Sort by</p> <div className="sort-button" onClick={() => sortByDate}>Time</div>

                </div>
                {

                    newData.map((data, id) => (


                        <div className="bird-card" key={id}>
                            <div className="card-header">
                                <div className="name-time">
                                    <div className="name">{data.name}</div>
                                    <div className="date-added">{moment(data.date).fromNow()}</div>

                                </div>
                                <div className={`rarity-type ${data.rarity === "extremely rare" ? "extremelyrare" : data.rarity}`}>
                                    <p>{data.rarity}</p>
                                </div>

                            </div>

                            <div className="note-info">
                                Note: <p>{data.info}</p>
                            </div>
                            <button className="form-buttons"
                                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) props.f(id) }}
                            >
                                Remove</button>

                        </div>

                    ))
                }


            </div>
        )

    }

    else {

        return (
            <div className="bird-list">



            </div >


        )
    }



}

export default BirdList;