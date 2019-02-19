import React, { Component } from 'react'
import './App.css'
import Sensor from './components/sensor/sensor'
import openSocket from 'socket.io-client'

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    socket: openSocket("localhost:8080"),
	    light: {
		interior: 0,
		interiorThreshold: 100,
		exterior: 0,
		exteriorThreshold: 100,
	    }
	}
	
	let self = this
	this.state.socket.on('tunnel', data => {
	    if(data.topic === 'interior'){
		let newJSON = this.state.light
		newJSON.interior = data.message
		this.setState({light: newJSON})
	    } else if(data.topic === 'exterior'){
		let newJSON = this.state.light
		newJSON.exterior = data.message
		this.setState({light: newJSON})
	    }
	})
    }
    render() {
	return (
		<div className="App">
		<div className="sensorArray">
		<Sensor type="Light" location="Interior" threshold={this.state.light.interiorThreshold}>{this.state.light.interior}</Sensor>
		<Sensor type="Light" location="Exterior" threshold={this.state.light.exteriorThreshold}>{this.state.light.exterior}</Sensor>
		</div>
		</div>
	)
    }
}

export default App
