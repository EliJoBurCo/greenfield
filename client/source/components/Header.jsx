import React from 'react'
import App from './App.jsx'
import InlineEdit from './InlineEdit.jsx'

// does this one need to be stateful??? it seems like app.jsx is doing all the state management.
export default class Header extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="header">
        <h1> Budget </h1>
        <InlineEdit text={'$ ' + this.props.budget} updateBudget={this.props.updateBudget}/>

        <h1> Total </h1>
        <p>{'$ ' + this.props.total}</p>
      </div>
    )
  }
}
