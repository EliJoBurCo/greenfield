import React from 'react'
import App from './App.jsx'
import InlineEdit from './InlineEdit.jsx'

export default function ListItem (props){
  return (
    <li className="listItem">
      <div className="half">
        <InlineEdit 
          text={props.item.name} 
          updateName={(value) => {props.updateName(value, props.item)}} 
        />
      </div>
      <div className="half right">
        <InlineEdit 
          text={'$ ' + props.item.price} 
          updatePrice={(value) => {props.updatePrice(value, props.item)}}
        />
        <button onClick={() => {props.handleRemove(props.item)}}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </li>
  )
}

/*-------------------
22  updateName={props.updateName}
28  updatePrice={props.updatePrice}
-------------------*/
