import React from 'react'
import Header from './Header.jsx'
import ListItem from './ListItem.jsx'
import InlineEdit from './InlineEdit.jsx'


export default class App extends React.Component {
	constructor(props){
	  super(props)

	 	this.state = {
	 		total: 0,
	 		budget: 0,
	 		list: []
	 	}

	 	this.handleSubmit = this.handleSubmit.bind(this);
		this.updateBudget = this.updateBudget.bind(this);
		this.updateName = this.updateName.bind(this);
		this.updatePrice = this.updatePrice.bind(this);
	}

	handleSubmit(event) {
		this.addListItem(event.target.name.value, event.target.price.value);
		this.updateTotal(event.target.price.value);
		event.target.name.value = '';
		event.target.price.value = '';
		event.preventDefault();
	}

	updateTotal(numb) {
		if(!isNaN(numb)){
			var newTotal = this.state.total + numb;
			this.setState({total: newTotal})
		}
	}

	updateBudget(numb) {
		if(!isNaN(numb)){
			this.setState({budget: numb})
		}
	}

	updateName(str) {
		console.log('updateName')
    this.setState({name: str})
  }

	updatePrice(numb) {
		console.log('updatePrice')
		if(!isNaN(numb)){
			this.setState({price: numb})
		}
	}

	addListItem(name, price) {
		if(!isNaN(price) && typeof name === 'string'){
			var arr = this.state.list.slice();
			arr.push({
				name: name,
				price: price
			})
			this.setState({list: arr});
		}
	}

  render() {
    return (

      <div className='app'>
      	<Header budget={this.state.budget} total={this.state.total} updateBudget={this.updateBudget}/>
      	<ListItem
					list={this.state.list}
					updateTotal={this.updateTotal}
					updateName={this.updateName}
					updatePrice={this.updatePrice}
				/>

				<form onSubmit={this.handleSubmit}>
      		<input type='text' name='name' placeholder='item' />
      		<input type='text' name='price' placeholder='price' />
      		<input type='submit' value='submit' />
      	</form>
      </div>
    )
  }
};
