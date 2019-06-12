import React, { Component } from 'react';
import './slider.css';

export default class Slider extends Component {
    state = {
        value: 0,
        rangeWidth:0
    }

    handleSliderChange = (event) => {
        this.setState({
            value: event.target.value,
        rangeWidth:event.target.value})
    }
    render() {

    return (
      <div className="audio-slider-container">
            <div className="audio-slider-range" style={{width:this.state.rangeWidth+'%'}}/>
        <input
          type="range"
          min="1"
          max="100"
          value={this.state.value}
          onChange={this.handleSliderChange}
          id="myRange"
          className="audio-slider"
        />
      </div>
    );
  }
}
