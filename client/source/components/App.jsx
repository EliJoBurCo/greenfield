import React from 'react'
import Header from './Header.jsx'
import {roundToTwo, nestedIndexOf, save, retrieveListName} from './utils.jsx'
import List from './List.jsx'
import InlineEdit from './InlineEdit.jsx'
import AddItem from './AddItem.jsx'
import Footer from './Footer.jsx'
import Quagga from 'quagga'
// import Quagga from 'quagga'
import Scanner from '../scanner.js'

export default class App extends React.Component {
	constructor(props){
	  super(props)
	 	this.state = {
	 		budget: 0,
	 		list: [],
	 		validInput: "disabled",
	 		listName: '',
			scannerOn: null
	 	}
	 	this.handleClear = this.handleClear.bind(this);
	 	this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.updateBudget = this.updateBudget.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
		this.removeListItem = this.removeListItem.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleListChange = this.handleListChange.bind(this)
		this.toggleScanner = this.toggleScanner.bind(this)
	}

	componentWillMount() {
		var budget = JSON.parse(localStorage.getItem('budget')) || 0;
		var list = JSON.parse(localStorage.getItem('list')) || [];
		this.setState({
			budget: budget,
			list: list
		})
	}

	//
	// event handlers
	//

	handleListChange({value}) {
    let {budget,list, listName} = retrieveListName(value)
    this.setState({
    	listName: listName,
    	budget: budget,
    	list:list
    })
  }

	handleInputChange() {
		this.setState({validInput: ""})
	}

	handleSubmit(event) {
		if(event.target.name.value){
			this.addListItem(event.target.name.value, Number(event.target.price.value));
    }
		event.target.name.value = '';
		event.target.price.value = '';
		event.target.name.focus();
  	this.setState({validInput: "disabled"});
		event.preventDefault();
	}

	handleRemove(item) {
		console.log('handleRemove', item);
		this.removeListItem(item)
		event.preventDefault();
	}
	handleClear() {
	  if(confirm("ARE YOU SURE YOU WANT TO DELETE YOUR LIST?")){
	    this.setState({budget: 0,list: []})
	    localStorage.removeItem('list')
	    localStorage.removeItem('budget')
  		return true
  	} else {
  		return false
  	}
	}



  //
  // functions to update the state.
  //

	updateBudget(num) {
		console.log('updateBudget');
		if(!isNaN(num)){
			this.setState({budget: num || 0})
			localStorage.setItem('budget', JSON.stringify(num))
		}
	}

	updateName(itemName, item) {
		console.log('updateName')
		var arr = this.state.list.slice();
		var index = nestedIndexOf(arr, item.name, item.price)
		var newItem = {
			name: itemName,
			price: item.price
		}
		arr.splice(index, 1, newItem);
		localStorage.setItem('list', JSON.stringify(arr))
		this.setState({list: arr})
	}

	updatePrice(itemPrice, item) {
		console.log('updatePrice');
		if(!isNaN(itemPrice)){
			var arr = this.state.list.slice();
			var index = nestedIndexOf(arr, item.name, item.price)
			var newItem = {
				name: item.name,
				price: itemPrice || 0
			}
			arr.splice(index, 1, newItem);
			localStorage.setItem('list', JSON.stringify(arr))
			this.setState({list: arr})
		}
	}
  calculateTotal() {
		return roundToTwo(
  		this.state.list.reduce( (sum, item) => sum + Number(item.price), 0 )
		)
  }

	//
	// add/remove list items
	//

	addListItem(name, price) {
		if(name){
			price = roundToTwo(price)
			if(!isNaN(price) && typeof name === 'string'){
				//Make a copy of the list array in state
				var arr = this.state.list.slice();

				//Push a new item into the copied array
				arr.push({
					name: name,
					price: price
				})

				localStorage.setItem('list', JSON.stringify(arr));
				//Set list equal to the copied array containing new item
				this.setState({list: arr});
			}
		}
	}

	removeListItem(item) {
		//Same process as addListItem
		var arr = this.state.list.slice();
		//Find the index of the item to be removed
		var index = nestedIndexOf(arr, item.name, item.price)

		arr.splice(index, 1);
		console.log('post splice arr', arr)

		localStorage.setItem('list', JSON.stringify(arr))
		this.setState({list: arr})
	}


	toggleScanner() {
		if(!this.state.scannerOn) {
			console.log('----------------on----------------')
			Scanner();
			this.setState({scannerOn: true})
		}
		if(this.state.scannerOn){
			console.log('---------------off----------------')

			Quagga.offDetected();
			Quagga.offProcessed();
			Quagga.stop();
			this.setState({scannerOn: false})
		}
	}

	render() {
		return (
			<div className='app'>
				<Header
					budget={this.state.budget}
					total={this.calculateTotal()}
					updateBudget={this.updateBudget}
					/>
				<List
					list={this.state.list}
					updateName={this.updateName}
					updatePrice={this.updatePrice}
					handleRemove={this.handleRemove}
					/>
				<AddItem
					handleSubmit={this.handleSubmit}
					disabled={this.state.validInput}
					handleInputChange={this.handleInputChange}
					/>
				<Footer
					handleListChange= {this.handleListChange}
					budget={this.state.budget}
					list={this.state.list}
					listName={this.state.listName}
					clear={this.handleClear}
					example={'hello'}
					toggleScanner={this.toggleScanner}
				/>
			<button onClick={this.toggleScanner}>scanner</button>
			  <div id="interactive" className="viewport"></div>
			</div>
		)
	}
}
