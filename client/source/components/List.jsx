import React from 'react'
import App from './App.jsx'
import InlineEdit from './InlineEdit.jsx'
import ListItem from './ListItem.jsx'

export default function List ({removeItem, updateItem, list}) {
  return (
    <table className="list">
      <tbody>
        {list.map((item, index, array) => {
          console.log(item)
          return (
            <ListItem
              key={item.key || (item.key = Math.random())}
              item={item}
              removeItem={removeItem}
              updateItem={updateItem}
              autoFocus={index === array.length-1}
              />
          )
        })}
      </tbody>
    </table>
  )
}
