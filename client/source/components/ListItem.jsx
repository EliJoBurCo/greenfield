import React from 'react'
import App from './App.jsx'
import InlineEdit from './InlineEdit.jsx'

export default function ListItem ({item, handleRemove, updatePrice, updateName}){
  return (
    <tr className="listItem">
      <td className="action">
        <button onClick={() => handleRemove(item)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </td>
      <td className="name">
        <InlineEdit
          value={item.name}
          action={value => updateName(value, item)}
          type="text"
          />
      </td>
      <td className="price">
        <InlineEdit
          value={item.price}
          action={value => updatePrice(value, item)}
          type="number"
          prefix="$&nbsp;"
          />
      </td>
    </tr>
  )
}
