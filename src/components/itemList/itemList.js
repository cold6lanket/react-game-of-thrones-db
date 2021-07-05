import React, { useState, useEffect } from 'react';
import './itemList.css';
import Spinner from '../spinner';

export default function ItemList({ getData, onItemSelected, renderItem }) {
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        getData()
            .then(itemList => {
                setItemList(itemList)
            });
    }, []);
  

    const showCharacters = (arr) => {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItem(item);

            return (
                <li 
                    onClick={() => onItemSelected(id)}
                    key={id}
                    className="list-group-item"
                >
                    {label}
                </li>
            );
        });
    };


    if (!itemList) return <Spinner/>;

    const characters = showCharacters(itemList);

    return (
        <ul className="item-list list-group">
            {characters}
        </ul>
    );
 
}