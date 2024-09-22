import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Items/Item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/newcollections')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setNewCollection(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {error && <p>Error: {error}</p>}
      <div className="collections">
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCollections;
