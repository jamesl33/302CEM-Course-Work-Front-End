import React, { Component } from 'react'
import ValueDisplay from '../../../valueDisplay/valueDisplay'
import Button from '../../../button/button'
import './light.css'

/** Class for handling the light sensor */
class Light extends Component {
    constructor(props){
	super(props)
	this.shortener = this.shortener.bind(this)
	this.determineCSS = this.determineCSS.bind(this)
    }
    /**
     * @description Function for shortening large values (over 9999)
     */
    shortener(){
	if(this.props.children.toString().length > 4){
	    let newNumber = this.props.children / 1000
	    newNumber = newNumber.toString().split('.',1)
	    return `${newNumber}k`
	} else {
	    return this.props.children
	}
    }
    /**
     * @description Function for determining what CSS class to use
     */
    determineCSS(){
	if(this.props.children < 200){
	    return 'dark'
	} else {
	    return 'light'
	}
    }
    render(){
	return(
		<div>
		<h1 className={`data ${this.props.css}`}>{this.shortener()}</h1>
		<h3 className={this.props.css}>Activation Threshold</h3>
		<div className='adjuster'>
		<Button clickMethod={this.props.decrementThreshold} disabled={false}>-</Button>
		<ValueDisplay css={this.props.css}>{this.props.threshold}</ValueDisplay>
		<Button clickMethod={this.props.incrementThreshold} disabled={false}>+</Button>
		</div>
		</div>
	)
    }
    componentDidMount(){
	/** Important: You MUST set the parent CSS on mount, otherwise CSS will be borked for the sensor */
	this.props.parentCSS(this.determineCSS())
    }
    componentDidUpdate(prevProps){
	/** Update the css when the data value changes. MUST be conditional, otherwise you'll be stuck in infinite updates */
	if(this.props.children !== prevProps.children){
	    this.props.parentCSS(this.determineCSS())
	}
    }
}

export default Light
