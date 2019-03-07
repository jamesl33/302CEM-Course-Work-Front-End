import React, { Component } from 'react'
import './sensor.css'
import Light from './types/light/light'
import Temperature from './types/temperature/temperature'

/** Class for creating the actual sensor box with Heading and 'Content', where content is determined by a separate class (e.g. Light) */
class Sensor extends Component {
    constructor(props){
	super(props)
	/* The CSS for the sensor (e.g. background colour) must be handled
         * here and then passed onto the content box for use. Pass functions
         * to the 'Content' classes that manipulate this state
         */
	this.state = {
	    css: ""
	}
	this.setCSS = this.setCSS.bind(this)
	this.typeOfSensor = this.typeOfSensor.bind(this)
    }
    /**
     * @description Function for setting the CSS state from a child Content class
     */
    setCSS(newCSS){
	this.setState({css: newCSS})
    }
    /**
     * @description Function for determining the type of sensor to use based on props given to it. You MUST pass setCSS to the child somehow, otherwhise CSS will bork out
     */
    typeOfSensor(){
	if(this.props.type === 'Light'){
	    return(
		    <div>
		    <Light parentCSS={this.setCSS} css={this.state.css} threshold={this.props.threshold} incrementThreshold={this.props.incrementThreshold} decrementThreshold={this.props.decrementThreshold}>{this.props.children}</Light>
		    </div>
	    )
	}
	if(this.props.type === 'Temperature'){
	    return(
		<div>
		    <Temperature parentCSS={this.setCSS} css={this.state.css} minTempThreshold={this.props.minTempThreshold} maxTempThreshold={this.props.maxTempThreshold} incrementMinTempThreshold={this.props.incrementMinTempThreshold} decrementMinTempThreshold={this.props.decrementMinTempThreshold} incrementMaxTempThreshold={this.props.incrementMaxTempThreshold} decrementMaxTempThreshold={this.props.decrementMaxTempThreshold}>{this.props.children}</Temperature>
		    </div>
	    )
	}
    }
    render() {
	let sensor = this.typeOfSensor()
	return(
		<div className={`sensor ${this.props.type} ${this.state.css}`}>
		<h2 className={`header ${this.state.css}`}>{this.props.type}</h2>
		{sensor}
		</div>
	)
    }
}

export default Sensor
