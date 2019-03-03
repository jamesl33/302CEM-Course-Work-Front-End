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
                value: 0,
                threshold: 10000,
            }
        }

        this.state.socket.on('tunnel', data => {
	    let jsonData = JSON.parse(data)
	    if(jsonData.topic === '302CEM/bear/sensor_0/light_1'){
		let newJSON = this.state.light
		newJSON.value = jsonData.message
		this.setState({light: newJSON})
	    }
	})

	this.incrementThreshold = this.incrementThreshold.bind(this)
	this.decrementThreshold = this.decrementThreshold.bind(this)
        this.getLightThreshold = this.getLightThreshold.bind(this)
        this.setLightThreshold = this.setLightThreshold.bind(this)
    }
    incrementThreshold(location){
	let newJSON = this.state.light
	if(location === "Interior"){
	    newJSON.threshold = newJSON.threshold + 1000

            this.setLightThreshold(newJSON.threshold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    this.setState({light: newJSON})
                }
            })
	}
    }
    decrementThreshold(location){
	let newJSON = this.state.light
	if(location === "Interior"){
	    newJSON.threshold = newJSON.threshold - 1000
            this.setLightThreshold(newJSON.threshold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    this.setState({light: newJSON})
                }
            })
	}
    }
    /**
     * @description Get the current light threshold value from the api
     * @param {Function} callback - Callback with the signiture (err, threshold)
     */
    async getLightThreshold(callback) {
        try {
            callback(null, await fetch("//localhost:8080/api/sensors/light/threshold?id=0", {
                method: 'get'
            }).then(response => {
                return response.json()
            }).then(json => {
                return json.threshold
            }))
        } catch (err) {
            callback(err)
        }
    }
    /**
     * @description Set a new light threshold value using the api
     * @param {Integer} threshold - The new threshold value
     * @param {Function} callback - Callback with the signiture (err)
     */
    async setLightThreshold(threshold, callback) {
        try {
            await fetch("//localhost:8080/api/sensors/light/threshold", {
                body: JSON.stringify({
                    id: 0,
                    threshold: threshold
                }),
                headers: {'content-type': 'application/json'},
                method: 'post'
            })

            callback(null)
        } catch (err) {
            callback(err)
        }
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
