import React from 'react';

function ItemList({items, type}) {
    let count = 0;
    return (
        <ul id="itemList">
          {items.map(item => {
            count++;
            return (
                <li key={item.id} className="item">
                    <div className="count">
                        <h4>{count}.</h4> 
                    </div>
                    <img className="item-pic" src={type === 'artists' ? item.images[0].url : item.album.images[1].url} />
                    <div className="title">
                        <h4 className={type}>{item.name} {type === "tracks" ? `- ${item.artists[0].name}` : null}</h4>
                    </div>
                </li>
            )
          })}
        </ul>
    );
}

export default ItemList;