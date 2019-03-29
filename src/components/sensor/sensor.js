import React, { Component } from 'react'
import './sensor.css'
import Light from './types/light/light'
import GraphLight from './graphs/graphLight/graphLight'
import GraphTemperature from './graphs/graphTemperature/graphTemperature'
import Temperature from './types/temperature/temperature'
import Button from '../button/button'

/** Class for creating the actual sensor box with Heading and 'Content', where content is determined by a separate class (e.g. Light) */
class Sensor extends Component {
    constructor(props){
	super(props)
	/* The CSS for the sensor (e.g. background colour) must be handled
         * here and then passed onto the content box for use. Pass functions
         * to the 'Content' classes that manipulate this state
         */
	this.state = {
	    css: "",
	    modal: false,
	}
	this.setCSS = this.setCSS.bind(this)
	this.displayModal = this.displayModal.bind(this)
	this.typeOfSensor = this.typeOfSensor.bind(this)
	this.onModalExitClick = this.onModalExitClick.bind(this)
	this.modalOn = this.modalOn.bind(this)
    }
    /**
     * @description Function for setting the CSS state from a child Content class
     */
    setCSS(newCSS){
	this.setState({css: newCSS})
    }
    /**
     * @description Function for getting a modal depending upon the state
     */
    displayModal(){
	if(this.state.modal){
	    if(this.props.type === 'Light'){
		return(
			<div>
			<GraphLight onModalExitClick={this.onModalExitClick} getHistory={this.props.getHistory}/>
			</div>
		)
	    } else {
		return(
			<div>
			<GraphTemperature onModalExitClick={this.onModalExitClick} getHistory={this.props.getHistory}/>
			</div>
		)
	    }
	}
	return(null)
    }
    onModalExitClick(){
	this.setState({modal: false})
    }
    modalOn(){
	this.setState({modal: true})
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
	return(
		<div className={`sensor ${this.props.type} ${this.state.css}`}>
		{this.displayModal()}
		<h2 className={`header ${this.state.css}`}>{this.props.type}</h2>
		{this.typeOfSensor()}
		<div className={'button-menu'}>
		<Button clickMethod={this.modalOn} disabled={false}>Show Historical Data</Button>
		</div>
		</div>
	)
    }
}

export default Sensor
