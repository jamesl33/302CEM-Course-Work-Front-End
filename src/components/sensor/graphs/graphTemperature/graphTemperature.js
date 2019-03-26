import React, { Component } from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeSeries } from 'pondjs'
import '../modal.css'
import './graphTemperature.css'

class GraphTemperature extends Component {
    constructor(props){
	super(props)
	this.state = {
	    chartData: new TimeSeries({
                name: "Historical Temperatures",
                columns: ["time", "temperature"],
                points: [[new Date(), 0]]
	    })
	}
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
	    temperature: {
		stroke: "#A02C2C",
		opacity: 0.2
	    }
	}
	return (
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>

		<ChartContainer timeRange={this.state.chartData.timerange()} title="Historical Temperature Level" titleStyle={{ fill: "#555", fontWeight: 500 }}>
		<ChartRow>
		<YAxis id="temperature" label="Temperature, C" min={this.state.chartData.min("temperature")} max={this.state.chartData.max("temperature")} format=".2f"/>
		<Charts>
		<LineChart axis="temperature" series={this.state.chartData} columns={["temperature"]} />
		</Charts>
		</ChartRow>
		</ChartContainer>

		</div>
		</div>
	)
    }
    componentDidMount() {
        this.props.getHistory('temperature', (err, history) => {
            if (err) {
                this.setState({
                    chartData: new TimeSeries({
                        name: "Historical Temperatures",
                        columns: ["time", "temperature"],
                        points: history
                    })
                })
            }
        })
    }
}

export default GraphTemperature
