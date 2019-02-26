import React, { Component } from 'react'
import './App.css'
import Sensor from './components/sensor/sensor'
import openSocket from 'socket.io-client'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            socket: openSocket("10.0.74.95:8080"),
            light: {
                value: 0,
                threshold: 10000,
            }
        }

        this.state.socket.on('tunnel', data => {
	    console.log('received')
	    let jsonData = JSON.parse(data)
	    if(jsonData.topic === '302CEM/bear/sensor_0/light_1'){
		console.log('match')
		let newJSON = this.state.light
		newJSON.value = jsonData.message
		this.setState({light: newJSON})
	    }
	})
	
	this.incrementThreshold = this.incrementThreshold.bind(this)
	this.decrementThreshold = this.decrementThreshold.bind(this)
        this.updateLightThreshold = this.updateLightThreshold.bind(this)
    }
    incrementThreshold(location){
	let newJSON = this.state.light
	if(location === "Interior"){
	    newJSON.threshold = newJSON.threshold + 1000
	    if(this.updateLightThreshold(newJSON.threshold)){
		this.setState({light: newJSON})
	    } else {
		console.log("oh noes")
	    }
	}
    }
    decrementThreshold(location){
	let newJSON = this.state.light
	if(location === "Interior"){
	    newJSON.threshold = newJSON.threshold - 1000
	    if(this.updateLightThreshold(newJSON.threshold)){
		this.setState({light: newJSON})
	    } else {
		console.log("oh noes")
	    }
	}
    }
    /**
     * Update the light timeout values in the external database.
     *
     * @param {int} timeoutValue - The timeout value
     */
    updateLightThreshold(timeoutValue) {
        fetch("//10.0.74.95:8080/api/sensors/lights/timeout", {
            body: JSON.stringify({
                id: 0,
                timeout: timeoutValue
            }),
            headers: { 'content-type': 'application/json' },
            method: 'post'
        }).then(response => {
            if (!response.ok) {
                return false
            } else {
                return true
            }
        })
    }
    render() {
	return (
		<div className="App">
		<div className="sensorArray">
		<Sensor type="Light" threshold={this.state.light.threshold} incrementThreshold={this.incrementThreshold} decrementThreshold={this.decrementThreshold}>{this.state.light.value}</Sensor>
		</div>
		</div>
	)
    }
}

export default App
