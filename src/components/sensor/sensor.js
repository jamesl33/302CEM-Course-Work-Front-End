import React, { Component } from 'react'
import './sensor.css'

class Sensor extends Component {
    constructor(props){
	super(props)
	this.lightCSS = this.lightCSS.bind(this)
    }
    lightCSS(){
	if(this.props.children < 50){
	    return 'dark'
	} else {
	    return 'light'
	}
    }
    render() {
	let css = this.lightCSS()
	return(
		<div className={`sensor ${this.props.type}`}>
		<h2 className={`header ${css}`}>{this.props.type}</h2>
		<h1 className={`data ${css}`}>{this.props.children}</h1>
		</div>
	)
    }
}

export default Sensor
