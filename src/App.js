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
                interiorThreshold: 10000,
                exterior: 0,
                exteriorThreshold: 10000,
            }
        }

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
	
	this.incrementThreshold = this.incrementThreshold.bind(this)
	this.decrementThreshold = this.decrementThreshold.bind(this)
        this.updateLightThreshold = this.updateLightThreshold.bind(this)
    }
    incrementThreshold(location){
	if(location === "Interior"){
	    let newJSON = this.state.light
	    newJSON.interiorThreshold = newJSON.interiorThreshold + 1000
	    this.setState({light: newJSON})
	} else {
	    let newJSON = this.state.light
	    newJSON.exteriorThreshold = newJSON.exteriorThreshold + 1000
	    this.setState({light: newJSON})
	}
    }
    decrementThreshold(location){
	if(location === "Interior"){
	    let newJSON = this.state.light
	    newJSON.interiorThreshold = newJSON.interiorThreshold - 1000
	    this.setState({light: newJSON})
	} else {
	    let newJSON = this.state.light
	    newJSON.exteriorThreshold = newJSON.exteriorThreshold - 1000
	    this.setState({light: newJSON})
	}
    }
    /**
     * Update the light timeout values in the external database.
     *
     * @param {bool} which - True updates interior, false updates exterior
     */
    updateLightThreshold(which = true) {
        fetch("//localhost:8080/api/sensors/lights/timeout", {
            body: JSON.stringify({
                id: which ? this.state.light.interior : this.state.light.exterior,
                timeout: which ? this.state.light.interiorThreshold : this.state.light.exteriorThreshold
            }),
            headers: { 'content-type': 'application/json' },
            method: 'post'
        }).then(response => {
            if (!response.ok) {
                // TODO(Toby Ward) - Response failed, display error?
            } else {
                // TODO(Toby Ward) - Response successful, update displayed values?
            }
        })
    }
    render() {
	return (
		<div className="App">
		<div className="sensorArray">
		<Sensor type="Light" location="Interior" threshold={this.state.light.interiorThreshold} incrementThreshold={this.incrementThreshold} decrementThreshold={this.decrementThreshold}>{this.state.light.interior}</Sensor>
		<Sensor type="Light" location="Exterior" threshold={this.state.light.exteriorThreshold} incrementThreshold={this.incrementThreshold} decrementThreshold={this.decrementThreshold}>{this.state.light.exterior}</Sensor>
		</div>
		</div>
	)
    }
}

export default App
