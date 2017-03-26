import React, { Component } from 'react';

export default class Word extends Component {

  static defaultProps = {
    x: 0,
    y: 0,
    width: 300,
    height: 100
  }

  prepareData() {

    const { width, height, word, keyboard } = this.props
    const btnWidth = width/ 13; // maximal 14 tasten in einer reihe
    const btnHeight = height / 4; //maximal 4 reihen

    const wordAsArray = word.split('')
    const firstChar = wordAsArray.shift()
    const { top: startY, left: startX } = keyboard.getPosition(firstChar)

    let d = [`M ${startX * btnWidth} ${startY * btnHeight}`];

    let collector = wordAsArray.map(char => {
      let { top, left } = keyboard.getPosition(char);

      let xNext = left * btnWidth;
      let yNext = top * btnHeight;
      return `L ${xNext} ${yNext}`;
    });

    return d.concat(collector).join(' ');
  }

  renderStartPoint() {
    const { width, height, word, keyboard } = this.props

    if (word.length === 1) {
      const btnWidth = width/ 13; // maximal 14 tasten in einer reihe
      const btnHeight = height / 4; //maximal 4 reihen
      const { top, left } = keyboard.getPosition(word[0])
      console.log('top: ', top);
      console.log('left: ', left);
      return <circle cx={left * btnWidth} cy={top * btnHeight} r="1" />
    }
  }

  render() {
    const { x, y } = this.props;
    const d = this.prepareData();

    return (
      <g
        strokeLinejoin="round"
        strokeWidth="1"
        stroke="black"
        transform={`translate(${x},${y})`}
        fill="rgba(0,0,0,0)"
      >
        { this.renderStartPoint() }
        <path d={d} />
      </g>
    );
  }
}
