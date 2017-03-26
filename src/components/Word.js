import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Word extends Component {

  static defaultProps = {
    x: 0,
    y: 0,
    width: 300,
    height: 100
  }

  prepareData() {

    const { width, height } = this.props
    const wordAsArray = this.props.word.split('')
    // const firstChar = wordAsArray.shift()
    // const { top: startX, left: startY } = this.props.keyboard.getPosition(firstChar)

    const startX = 0
    const startY = 0

    let d = [`M ${startX} ${startY}`];

    let btnWidth = width/ 14; // maximal 14 tasten in einer reihe
    let btnHeight = height / 4; //maximal 4 reihen


    let collector = wordAsArray.map(char => {
      let { top, left } = this.props.keyboard.getPosition(char);

      let xNext = startX + left * btnWidth;
      let yNext = startY + top * btnHeight;
      return `L ${xNext} ${yNext}`;
    });

    return d.concat(collector).join(' ');
  }

  render() {
    const { x, y } = this.props
    let d = this.prepareData();
    return (
      <g
        strokeLinejoin="round"
        strokeWidth="1"
        stroke="black"
        transform={`translate(${x},${y})`}
        fill="rgba(0,0,0,0)"
      >
        <path d={d} />
      </g>
    );
  }
}
