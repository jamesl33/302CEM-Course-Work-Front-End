import React, { Component } from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeSeries } from 'pondjs'
import '../modal.css'
import './graphTemperature.css'

class GraphTemperature extends Component {
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
	const historyRange = new TimeSeries({
	    name: "Historical Temperatures",
	    columns: ["time", "temperature"],
	    points: [[1553084676, 20.1],
		     [1553084686, 22.5],
		     [1553084696, 24.6],
		     [1553084740, 28.0]
		    ]
	})
	return (
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>
		
		<ChartContainer timeRange={historyRange.timerange()} format="%b '%y">
		<ChartRow height="150">
		<YAxis id="temperature" label="Temperature, C" min={historyRange.min()} max={historyRange.max()} width="60" format=".2f"/>
		<Charts>
		<LineChart axis="temperature" series={historyRange} />
		</Charts>
		</ChartRow>
		</ChartContainer>
	    
		</div>
		</div>
	)
    }
}

export default GraphTemperature
