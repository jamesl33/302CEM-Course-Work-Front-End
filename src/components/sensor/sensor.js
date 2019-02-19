import React, { Component } from 'react'
import './sensor.css'
import Light from './types/light/light'

class Sensor extends Component {
    constructor(props){
	super(props)
	this.state = {
	    css: ""
	}
	this.lightCSS = this.lightCSS.bind(this)
	this.typeOfSensor = this.typeOfSensor.bind(this)
    }
    lightCSS(){
	if(this.props.children < 500000){
	    this.setState({css: "dark"})
	} else {
	    this.setState({css: "light"})
	}
    }
    typeOfSensor(){
	if(this.props.type === 'Light'){
	    return(
		    <div>
		    <Light parentCSS={this.lightCSS} css={this.state.css} location={this.props.location} threshold={this.props.threshold}>{this.props.children}</Light>
		    </div>
	    )
	}
    }
    render() {
	let sensor = this.typeOfSensor()
	return(
		<div className={`sensor ${this.props.type} ${this.state.css}`}>
		<h2 className={`header ${this.state.css}`}>{this.props.type}, {this.props.location}</h2>
		{sensor}
		</div>
	)
    }
}

export default Sensor
