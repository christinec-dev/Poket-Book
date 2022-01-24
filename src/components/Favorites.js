import React from 'react';
import {Col, Row} from 'react-bootstrap';

//Initiate the Faves function that will display our main display components, ie the link, button, and category
function Faves ({ favorite, visitFaves, index, removeFaves }) {
    return (
        <Row className="fave-link">
            {/*displays link*/}
            <Col className="col-8 favorites-p"> 
                <a href={favorite.text}>{favorite.text}</a>
            </Col>

            {/*deletes favorite*/}
            <Col className="col-4"> 
                <button onClick={() => removeFaves(index)} className="btn btn-icon-trash"> <i className="fas fa-trash"></i> </button>
  
                <button onClick={() => visitFaves(index)} className="btn btn-icon-redo"><i className="fas fa-globe"></i> </button>
            </Col>
        </Row>
    );
  }
  
    //sets our initial state of our fave list to null
    function FaveForm({ addFaves }) {
    const [value, setValue] = React.useState("");
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addFaves(value);
      setValue("");
    };
  
    //returns a form to add a new fave item to our list
    return (
      <form onSubmit={handleSubmit} className="mb-3">
        <Row>
          <Col className="col-md-8 ">
            <input 
            type="text"
            className="faves-input"
            value={value}
            onChange={e => setValue(e.target.value)
            }/>
          </Col>
          <Col className="col-md-4">
            <button type="submit" className="faves-input-btn">Favorite!💖</button>
          </Col>
        </Row>
      </form>
    );
  }
  
    //FavoriteLinks function ties it together
    function FavoriteLinks() {
    const [favorites, setFaves] = React.useState([
    //default values are passed for display purposes
      {
        text: "https://www.youtube.com"
      },
      {
        text: "https://github.com/christinec-dev"
      },
      {
        text: "https://developer.mozilla.org/"
      }
    ]);
  
    //adds a favorite to the list
    const addFaves = text => {
      const newFaves = [...favorites, { text}];
      setFaves(newFaves);
    };
  
    //deletes the favorite from list
    const removeFaves = index => {
      const newFaves = [...favorites];
      newFaves.splice(index, 1);
      setFaves(newFaves);
    };

    //deletes the favorite from list
    const visitFaves = index => {
      const newFaves = window.location.href=favorites[index].text;
      setFaves(newFaves);
    };
      
    //renders the main ui of to do list
    return (
      <div className="favorites mb-3 container-fluid">
         <div className="favorites-header">
            <h2>FAVORITE SITES</h2>
         </div>
      <div className="card">
        <div className="card-body favorites">
        <Row>
            <Col className="col-md-8">
                <h3 className="cat-header">Website</h3> 
            </Col>
            <Col className="col-md-4">
                <h3 className="cat-header">Modify</h3>
            </Col>
        </Row>
        {/*maps over todo items and instantiates functions for existing items*/}
          {favorites.map((favorite, index, category) => (
            <Faves
              key={index}
              index={index}
              favorite={favorite}
              removeFaves={removeFaves}
              visitFaves={visitFaves}
              category={category}  
            />
          ))}
        {/*form to add a new item*/}
          <div className="faves-form">
            <FaveForm addFaves={addFaves}/>
          </div>
        </div>
      </div>
      </div>
    );
  }

//exports for use in other files
export default FavoriteLinks;
