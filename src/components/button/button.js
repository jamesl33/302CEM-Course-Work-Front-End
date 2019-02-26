import React, { Component } from 'react'
import './button.css'

class Button extends Component{
    constructor(props){
	super(props)
	this.handleButtonClick = this.handleButtonClick.bind(this)
	this.handleCSS = this.handleCSS.bind(this)
    }
    handleButtonClick(event){
	event.stopPropagation()
	if(!this.props.disabled){
	    this.props.clickMethod()
	}
    }
    handleCSS(){
	if(this.props.children === '+'){
	    return 'green'
	} else if(this.props.children === '-'){
	    return 'red'
	}
    }
    render(){
	let css = this.handleCSS()
	return(
		<div onClick={this.handleButtonClick} className={`btn-wrapper ${css}`}>
		{this.props.children}
	    </div>
	)
    }
}

export default Button
