import React, { Component } from 'react'
import './light.css'

class Light extends Component {
    constructor(props){
	super(props)
    }
    render(){
	return(
		<div>
		<h1 className={`data ${this.props.css}`}>{this.props.children}</h1>
		</div>
	)
    }
    componentDidMount(){
	this.props.parentCSS()
    }
    componentDidUpdate(prevProps){
	/* Only update when the data value changes */
	if(this.props.children !== prevProps.children){
	    this.props.parentCSS()
	}
    }
}

export default Light
