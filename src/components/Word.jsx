import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Word extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var context = ReactDOM.findDOMNode(this).getContext('2d');
    this.paint(context);
  }

  componentDidUpdate() {
    var context = ReactDOM.findDOMNode(this).getContext('2d');
    this.paint(context);
  }

  paint(context) {

    context.clearRect(0, 0, 300, 100);
    context.imageSmoothingEnabled = true;
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(0.5, 0.5);

    let btnWidth = 300/ 14; // maximal 14 tasten in einer reihe
    let btnHeight = 100 / 4; //maximal 4 reihen

    this.props.word.split('').forEach(char => {
      let {top, left} = this.props.keyboard.getPosition(char);
      console.log(btnWidth * left, btnHeight * top, top, left, char);
      context.lineTo(btnWidth * left, btnHeight * top);

    });

    context.strokeStyle = '#000';
    context.stroke();

  }

  render() {

    let canvasStyles = {
      display: 'inline-block',
      padding: '5',
      verticalAlign: 'top'
    }

    return (
      <canvas style={canvasStyles} width={300} height={100} />
    );
  }
}
