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
		exterior: 0
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
		<Sensor type="Light" location="Interior">{this.state.light.interior}</Sensor>
		<Sensor type="Light" location="Exterior">{this.state.light.exterior}</Sensor>
		</div>
		</div>
	)
    }
}

export default App
