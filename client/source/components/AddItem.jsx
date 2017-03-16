import React from 'react'

export default function AddItem (props) {
  return (
    <form onSubmit={props.handleSubmit} className="addItem clearfix">
      <input
        className="column half"
        type='text'
        name='name'
        placeholder='Item'
        autoFocus
        onChange={props.handleInputChange}
        />
      <input
        className="column fourth"
        type='number'
        step='.01'
        name='price'
        placeholder='Price'
        />
      <input
        className="column fourth"
        value='Add'
        type='submit'
        disabled={props.disabled}
        />
    </form>
  )
}
