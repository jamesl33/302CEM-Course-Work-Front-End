import React, { Component } from 'react'
import './App.css'
import Sensor from './components/sensor/sensor'
import openSocket from 'socket.io-client'

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    socket: openSocket("localhost:8080"),
	    light: 0
	}
	
	let self = this
	this.state.socket.on('hello', data => {
	    console.log(data)
	    this.setState({light: data})
	})
    }
    render() {
	console.log('temp:' + this.state.light)
	return (
		<div className="App">
		<Sensor type="Light">{this.state.light}</Sensor>
		</div>
	)
    }
}

export default App
