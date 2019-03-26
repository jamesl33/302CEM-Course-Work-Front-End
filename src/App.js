import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Sensor from './components/sensor/sensor'
import openSocket from 'socket.io-client'

const ip = "https://agiledevbear.ddns.net:8080"

class App extends Component {
    constructor(props){
        super(props)

	/* Initialise the state of the App */
        this.state = {
            socket: openSocket(ip),
            light: {
                value: 0,
                threshold: 10000,
            },
	    temperature: {
		value: 20.00,
		minThreshold: 16.00,
		maxThreshold: 24.00
	    }
        }

	/* Tunnel functionality. Handle MQTT data in here */
        this.state.socket.on('tunnel', data => {
	    let jsonData = JSON.parse(data)
	    if(jsonData.topic === '302CEM/bear/sensor_0/light_1'){
		let newJSON = this.state.light
		newJSON.value = jsonData.message
		this.setState({light: newJSON})
	    }
	    if(jsonData.topic === '302CEM/bear/sensor_0/temperature_0'){
		let newJSON = this.state.temperature
		newJSON.value = jsonData.message
		this.setState({temperature: newJSON})
	    }
	})

	/* Function binds */
	this.incrementThreshold = this.incrementThreshold.bind(this)
	this.decrementThreshold = this.decrementThreshold.bind(this)
	this.incrementMinTempThreshold = this.incrementMinTempThreshold.bind(this)
	this.decrementMinTempThreshold = this.decrementMinTempThreshold.bind(this)
	this.incrementMaxTempThreshold = this.incrementMaxTempThreshold.bind(this)
	this.decrementMaxTempThreshold = this.decrementMaxTempThreshold.bind(this)
	this.getHistory = this.getHistory.bind(this)
        this.getLightThreshold = this.getLightThreshold.bind(this)
        this.setLightThreshold = this.setLightThreshold.bind(this)
	this.getMinTempThreshold = this.getMinTempThreshold.bind(this)
        this.setMinTempThreshold = this.setMinTempThreshold.bind(this)
	this.getMaxTempThreshold = this.getMaxTempThreshold.bind(this)
        this.setMaxTempThreshold = this.setMaxTempThreshold.bind(this)
    }
    incrementThreshold(){
	/**
         * @description Increment the current light threshold by 1000
         */
	let newJSON = this.state.light
	newJSON.threshold = newJSON.threshold + 1000
        this.setLightThreshold(newJSON.threshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({light: newJSON})
            }
        })
    }
    decrementThreshold(){
	/**
         * @description Decrement the current light threshold by 1000
         */
	let newJSON = this.state.light
	newJSON.threshold = newJSON.threshold - 1000
        this.setLightThreshold(newJSON.threshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({light: newJSON})
            }
        })
    }
    incrementMinTempThreshold(){
	/**
         * @description Increment the current min temp threshold by 0.5
         */
	let newJSON = this.state.temperature
	newJSON.minThreshold = newJSON.minThreshold + 0.5
        this.setMinTempThreshold(newJSON.minThreshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({temperature: newJSON})
            }
        })
    }
    decrementMinTempThreshold(){
	/**
         * @description Decrement the current min temp threshold by 0.5
         */
	let newJSON = this.state.temperature
	newJSON.minThreshold = newJSON.minThreshold - 0.5
        this.setMinTempThreshold(newJSON.minThreshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({temperature: newJSON})
            }
        })
    }
    incrementMaxTempThreshold(){
	/**
         * @description Increment the current max temp threshold by 0.5
         */
	let newJSON = this.state.temperature
	newJSON.maxThreshold = newJSON.maxThreshold + 0.5
        this.setMaxTempThreshold(newJSON.maxThreshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({temperature: newJSON})
            }
        })
    }
    decrementMaxTempThreshold(){
	/**
         * @description Decrement the current max temp threshold by 0.5
         */
	let newJSON = this.state.temperature
	newJSON.maxThreshold = newJSON.maxThreshold - 0.5
        this.setMaxTempThreshold(newJSON.maxThreshold, (err) => {
            if (err) {
                toast.error(err.message)
            } else {
                this.setState({temperature: newJSON})
            }
        })
    }
    /**
     * @description Get the historical sensor data from the api
     * @param {String} type - The type of a sensor in the api
     * @param {Function} callback - Callback with the signature (err, history)
     */
    async getHistory(type, callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/history/byType?type=${type}`, {
                method: 'get'
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(`Error: ${json.error}`)
            }

            callback(null, json)
        } catch (err) {
            callback(err)
        }
    }
    /**
     * @description Get the current light threshold value from the api
     * @param {Function} callback - Callback with the signature (err, threshold)
     */
    async getLightThreshold(callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/light/threshold?id=0`, {
                method: 'get'
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(`Error: ${json.error}`)
            }

            callback(null, json.threshold)
        } catch (err) {
            callback(err)
        }
    }

    /**
     * @description Set a new light threshold value using the api
     * @param {Integer} threshold - The new threshold value
     * @param {Function} callback - Callback with the signature (err)
     */
    async setLightThreshold(threshold, callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/light/threshold`, {
                body: JSON.stringify({
                    id: 0,
                    threshold: threshold
                }),
                headers: {'content-type': 'application/json'},
                method: 'post'
	    })

            if (!response.ok) {
                const json = await response.json()
                throw new Error(`Error: ${json.error}`)
            }

            callback(null)
        } catch (err) {
            callback(err)
        }
    }
    /**
     * @description Get the current min temp threshold value from the api
     * @param {Function} callback - Callback with the signature (err, threshold)
     */
    async getMinTempThreshold(callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/temperature/threshold/min?id=1`, {
                method: 'get'
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(`Error: ${json.error}`)
            }

            callback(null, json.threshold)
        } catch (err) {
            callback(err)
        }
    }

    /**
     * @description Set a new min temp threshold value using the api
     * @param {Integer} threshold - The new threshold value
     * @param {Function} callback - Callback with the signature (err)
     */
    async setMinTempThreshold(threshold, callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/temperature/threshold/min`, {
                body: JSON.stringify({
                    id: 1,
                    threshold: threshold
                }),
                headers: {'content-type': 'application/json'},
                method: 'post'
	    })

            if (!response.ok) {
                const json = await response.json()
                throw new Error(`Error: ${json.error}`)
            }

            callback(null)
        } catch (error) {
            callback(error)
        }
    }
    /**
     * @description Get the current max temp threshold value from the api
     * @param {Function} callback - Callback with the signature (err, threshold)
     */
    async getMaxTempThreshold(callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/temperature/threshold/max?id=1`, {
                method: 'get'
            })

            const json = await response.json()

            if (!response.ok) {
                throw new Error(`Error: ${json.error}`)
            }

            callback(null, json.threshold)
        } catch (err) {
            callback(err)
        }
    }

    /**
     * @description Set a new max temp threshold value using the api
     * @param {Integer} threshold - The new threshold value
     * @param {Function} callback - Callback with the signature (err)
     */
    async setMaxTempThreshold(threshold, callback) {
        try {
            const response = await fetch(`${ip}/api/sensors/temperature/threshold/max`, {
                body: JSON.stringify({
                    id: 1,
                    threshold: threshold
                }),
                headers: {'content-type': 'application/json'},
                method: 'post'
	    })

            if (!response.ok) {
                const json = await response.json()
                throw new Error(`Error: ${json.error}`)
            }

            callback(null)
        } catch (err) {
            callback(err)
        }
    }
    render() {
	return (
		<div className="App">
		<ToastContainer position="top-center" />
		<div className="sensorArray">
		<Sensor type="Light" threshold={this.state.light.threshold} incrementThreshold={this.incrementThreshold} decrementThreshold={this.decrementThreshold} getHistory={this.getHistory}>{this.state.light.value}</Sensor>
		<Sensor type="Temperature" minTempThreshold={this.state.temperature.minThreshold} maxTempThreshold={this.state.temperature.maxThreshold} incrementMinTempThreshold={this.incrementMinTempThreshold} decrementMinTempThreshold={this.decrementMinTempThreshold} incrementMaxTempThreshold={this.incrementMaxTempThreshold} decrementMaxTempThreshold={this.decrementMaxTempThreshold} getHistory={this.getHistory}>{this.state.temperature.value}</Sensor>
		</div>
		</div>
	)
    }
    componentDidMount(){
	/* Any initialization functions that request from the Remote API (e.g. getLightThreshold) MUST be called in here and NOT at render */
	this.getLightThreshold((err, threshold) => {
	    if(err){
		toast.error(err.message)
	    } else {
		let newJSON = this.state.light
		newJSON.threshold = threshold
		this.setState({light: newJSON})
	    }
	})
	this.getMinTempThreshold((err, threshold) => {
	    if(err){
		toast.error(err.message)
	    } else {
		let newJSON = this.state.temperature
		newJSON.minThreshold = threshold
		this.setState({temperature: newJSON})
	    }
	})
	this.getMaxTempThreshold((err, threshold) => {
	    if(err){
		toast.error(err.message)
	    } else {
		let newJSON = this.state.temperature
		newJSON.maxThreshold = threshold
		this.setState({temperature: newJSON})
	    }
	})
    }
}

export default App
