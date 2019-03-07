import React, { Component } from 'react'
import ValueDisplay from '../../../valueDisplay/valueDisplay'
import Button from '../../../button/button'
import './temperature.css'

/** Class for handling the light sensor */
class Temperature extends Component {
    constructor(props){
	super(props)
	this.determineCSS = this.determineCSS.bind(this)
    }
    /**
     * @description Function for determining what CSS class to use
     */
    determineCSS(){
	if(this.props.children < this.props.minTempThreshold){
	    return 'cold'
	} else if(this.props.children > this.props.maxTempThreshold){
	    return 'hot'
	} else {
	    return 'good'
	}
    }
    render(){
	return(
		<div>
		<h1 className={`data ${this.props.css}`}>{`${this.props.children} C`}</h1>
		<h3 className={this.props.css}>Minimum Temperature</h3>
		<div className='adjuster'>
		<Button clickMethod={this.props.decrementMinTempThreshold} disabled={false}>-</Button>
		<ValueDisplay css={this.props.css}>{this.props.minTempThreshold}</ValueDisplay>
		<Button clickMethod={this.props.incrementMinTempThreshold} disabled={false}>+</Button>
		</div>
		<h3 className={this.props.css}>Maximum Temperature</h3>
		<div className='adjuster'>
		<Button clickMethod={this.props.decrementMaxTempThreshold} disabled={false}>-</Button>
		<ValueDisplay css={this.props.css}>{this.props.maxTempThreshold}</ValueDisplay>
		<Button clickMethod={this.props.incrementMaxTempThreshold} disabled={false}>+</Button>
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

export default Temperature
