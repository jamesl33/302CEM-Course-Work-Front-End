import React, { Component } from 'react'
import './button.css'

/** Class for using divs as a button (much easier to use for CSS */
class Button extends Component{
    constructor(props){
	super(props)
	this.handleButtonClick = this.handleButtonClick.bind(this)
	this.handleCSS = this.handleCSS.bind(this)
    }
    /**
     * @description Function for handling the event of clicking the button. Prevents propagation to higher order divs or when disabled
     */
    handleButtonClick(event){
	event.stopPropagation()
	if(!this.props.disabled){
	    this.props.clickMethod()
	}
    }
    /**
     * @description Function for determining what CSS classes to use for the button
     */
    handleCSS(){
	if(this.props.children === '-'){
	    return 'red'
	} else {
	    return 'green'
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
