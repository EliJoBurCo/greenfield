import React from 'react'
import App from './App.jsx'
import {retrieveLists} from './utils.jsx'
import Dropdown from 'react-dropdown'


export default class InlineEdit extends React.Component {
  constructor(props) {
    super(props)
    const saved = retrieveLists()
    this.state = {
      savedLists: saved
    }
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
  }

  save(budget, list) {
    let tempListName = prompt("list name?")
    let listObj = {
      listName:tempListName,
      budget: budget,
      list: list
    }
    let lists = retrieveLists()
    lists.push(tempListName)
    this.setState({savedLists: lists})
    localStorage.setItem('lists', JSON.stringify(lists))
    localStorage.setItem(tempListName, JSON.stringify(listObj))
  }

  remove(listName) {
    if(this.props.clear()) {
    localStorage.removeItem(listName)
    let lists = retrieveLists()
    for (let i = 0; i < lists.length; i++) {
      if(lists[i] === listName) {
        lists.splice(i, 1)
      }
    }
    this.setState({savedLists:lists})
    localStorage.setItem('lists', JSON.stringify(lists))
    }
  }
  render() {
      //these are declared to make the return statement a bit less cluttered.
      let list = this.props.list
      let clear = this.props.clear
      let budget = this.props.budget
      let listName = this.props.listName
      let handleListChange = this.props.handleListChange

    return (
      <div className='footer'>
        <Dropdown
        onChange= {handleListChange}
        options= {this.state.savedLists}
        value={listName}
        placeholder="Your Lists"
        />

        <input type="submit" value="Save" onClick={() => this.save(budget, list)}/>
        <input type="submit" value="Clear all" onClick={() => clear()}/>
        <input type="submit" value="Delete list" onClick={() => this.remove(listName)}/>

      </div>
    )
  }


}
