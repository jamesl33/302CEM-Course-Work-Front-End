import React, { Component } from 'react'
import ValueDisplay from '../../../valueDisplay/valueDisplay'
import Button from '../../../button/button'
import './light.css'

class Light extends Component {
    constructor(props){
	super(props)
	this.shortener = this.shortener.bind(this)
    }
    shortener(){
	if(this.props.children.toString().length > 4){
	    let newNumber = this.props.children / 1000
	    console.log(newNumber)
	    newNumber = newNumber.toString().split('.',1)
	    return `${newNumber}k`
	} else {
	    return this.props.children
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
	this.props.parentCSS()
    }
    componentDidUpdate(prevProps){
	/* Only update when the data value changes */
	if(this.props.children !== prevProps.children){
	    this.props.parentCSS()
	}
    }
}

export default Light
