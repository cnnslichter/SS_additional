import React, {useEffect, useState} from 'react';
import Header from './Header';
import ItemDetails from './ItemDetails'
import axios from 'axios'

export const Textbooks = () => {
  const [items, setItems] = useState([]);
  //const urlSearchParams = new URLSearchParams(`?category=textbooks`);

  useEffect(() => {
    const textbookData = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/gettextbooks');
        //const response = await axios.get('http://localhost:5003/getTextbooks');

        console.log('Does this print')
        console.log(response);
        console.log(response.data)
        setItems(response.data);
      } catch (error) {
        console.error('Error with useEffect', error);
      }
    }
    textbookData();
    // axios.get('http://localhost:5003/api/item/getTextbooks')
    // .then(items => setItems(items.data))
    // .catch(err => console.log(err))
  }, [])

  return (
    <>
    <Header /> 
    <div className='items-list'>
      {items && items.map((item)  => (
       <ItemDetails key={item._id} item={item}/>
      ))}
    </div>
    </>
  );
};

