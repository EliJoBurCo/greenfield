import React, {Component} from 'react';
import { expect, should, assert } from 'chai';
import { mount, shallow, render } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import sinon from 'sinon'


import App  from '../source/components/App.jsx';
import Header from '../source/components/Header.jsx';
import ListItem from '../source/components/ListItem.jsx';

import InlineEdit from '../source/components/InlineEdit.jsx';




describe('Inline Edit', () =>{

  it('should render a div', () => {
    wrapper = shallow(<InlineEdit />) 
    expect(wrapper.node.type).to.equal('div');
  })
  it('should generate an input forn when editing is true', () => {
    wrapper = mount(<InlineEdit />)
    wrapper.node.setState({editing: true})
    wrapper.update();
    expect(wrapper.find('.inlineEdit').html()).to
      .equal(`<div class="inlineEdit"><input type="text"></div>`)



  })
  var wrapper;

  it('should allow user to escape out of edit', () =>{
    wrapper = mount(<InlineEdit />)
    var mock = {
      keyCode: 27,
      target: {value: 0}
    }
    wrapper.node.setState({editing: true})
    wrapper.node.keyAction(mock)
    expect(wrapper.node.state['editing']).to.equal(false)
    wrapper.unmount();
  });

  xit('should allow user to escape out of edit', () =>{
    wrapper = mount(<InlineEdit />)
    let app = mount(<App /> )
    wrapper.node.keyAction.props = app.node.updateBudget

    var mock = {
      keyCode: 13,
      target: {value: 0}
    }
    wrapper.node.setState({editing: true})
    wrapper.node.keyAction(mock)
    expect(wrapper.node.state['editing']).to.equal(false)
    console.log(wrapper.find('.value').html())
    wrapper.unmount();
  });

  xit('should ....', () => {
    wrapper = mount(<InlineEdit />)
    let app = mount(<App /> )
  })
})