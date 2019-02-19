import React, { Component } from 'react'
import './valueDisplay.css'

class ValueDisplay extends Component {
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
    render() {
	return(
		<div className={`valueDisplay ${this.props.css}`}>
		{this.shortener()}
		</div>
	)
    }
}

export default ValueDisplay
