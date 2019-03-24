import React, { Component } from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import '../modal.css'
import './graphLight.css'

class GraphLight extends Component {
    constructor(props){
	super(props)
	this.handleModalExitClick = this.handleModalExitClick.bind(this)
	this.handleModalContentClick = this.handleModalContentClick.bind(this)
    }
    handleModalExitClick(event){
	this.props.onModalExitClick()
    }
    handleModalContentClick(event){
	event.stopPropagation()
	return null
    }
    render(){
	const style = {
	    light: {
		stroke: "#A02C2C",
		opacity: 0.2
	    }
	}
	return (
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>
		
		<ChartContainer timeRange={this.props.chartData.range()} title="Historical Light Level" titleStyle={{ fill: "#555", fontWeight: 500}}>
		<ChartRow>
		<YAxis id="light" label="Light Level" min={this.props.chartData.min("light")} max={this.props.chartData.max("light")}/>
		<Charts>
		<LineChart axis="light" series={this.props.chartData} columns={["light"]}/>
		</Charts>
		</ChartRow>
		</ChartContainer>
		
		</div>
		</div>
	)
    }
}

export default GraphLight
