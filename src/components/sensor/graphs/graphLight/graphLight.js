import React, { Component } from 'react'
import { Charts, ChartContainer, ChartRow, YAxis, LineChart } from 'react-timeseries-charts'
import { TimeSeries } from 'pondjs'
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
	const historyRange = new TimeSeries({
	    name: "Historical Light",
	    columns: ["time", "light"],
	    points: [[1553084676, 20000],
		     [1553084686, 19000],
		     [1553084696, 18000],
		     [1553084740, 17000]
		    ]
	})
	return (
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>
		
		<ChartContainer timeRange={historyRange.range()} format="%b '%y">
		<ChartRow height="150">
		<YAxis id="light" label="Light Level" min={historyRange.min()} max={historyRange.max()} width="60" format=".2f"/>
		<Charts>
		<LineChart axis="light" series={historyRange} />
		</Charts>
		</ChartRow>
		</ChartContainer>
		
		</div>
		</div>
	)
    }
}

export default GraphLight
