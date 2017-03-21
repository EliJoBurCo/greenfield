import React from 'react';
import App from './App.jsx';
import InlineEdit from './InlineEdit.jsx';

export default function ListItem ({{key,price,name}, removeItem, updateItem, autoFocus,focused}){
  return (
    <tr className="listItem">
      <td className="delete">
        <button onClick={() => removeItem(key)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </td>
      <td className="name">
        <InlineEdit
          value={name}
          action={value => updateItem(key, "name", value)}
          type="text"
          placeholder="Item"
          autoFocus={autoFocus}
          />
      </td>
      <td className="price">
        <InlineEdit
          value={price}
          action={value => updateItem(key, "price", value)}
          type="number"
          prefix="$&nbsp;"
          placeholder="$ 0"
          />
      </td>
    </tr>
  )
}
