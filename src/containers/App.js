import React, { Component } from 'react';
import Word from '../components/Word';
import update from 'immutability-helper';
import Keyboard from '../lib/keyboard'
import germanLayout from '../lib/keyboard/layouts/german.js';
import download from 'downloadjs';
import debounce from 'debounce';

const keyboard = new Keyboard(germanLayout)

// ['ich', 'schreibe', 'ein', 'programm']

/*[
  {
    id: 1,
    text: [
      {
        char: 'i',
        modifier: 'normal'
      },
      {
        char: 'I',
        modifier: 'shift'
      }
    ]
  }
]*/

/**
 * KeyPress für Zeichen erkennen.
 * KeyDown/KeyUp für Zustand und Taste(nur vordefinierte) erkennen.
 */

export default class App extends Component {

  state = {
    words: [],
    width: window.innerWidth
  }

  componentDidMount() {
    this.refs.input.focus();
    window.addEventListener('resize', this.handleResize)
  }

  handleChange(event) {

    //let modifier = event.getModifierState('Shift')

    const lastIndex = event.key === ' '
      ? this.state.words.length
      : this.state.words.length === 0 ? 0 : this.state.words.length - 1

    const lastWord = this.state.words[lastIndex]
      ? this.state.words[lastIndex] + event.key
      : event.key === ' ' ? '' : event.key

    const newWords = update(this.state.words, {$splice: [[lastIndex, 1, lastWord]]});
    this.setState({
      words: newWords
    });

  }

  enableWriting() {
    this.refs.input.focus();
  }

  handleClick = () => {
    const svg = this.node.outerHTML
    download(new Blob([svg]), 'keyboardgesture.svg', 'text/sgv');
  }

  handleResize = debounce(() => {
    console.log('resize');
    this.setState({ width: window.innerWidth })
  })

  render() {
    const width = 300
    const height = 100
    const columns = Math.floor(this.state.width / width)

    return (
      <div className="w-100 min-h-100" onClick={this.enableWriting.bind(this)}>
        <input type="text" ref="input" className="absolute o-0" onKeyPress={this.handleChange.bind(this)} />
        <button type="button" onClick={this.handleClick} className="absolute bottom-0 right-0">download svg</button>
        <svg
          width={width * columns}
          height={window.innerHeight - 100}
          className="absolute pa5"
          ref={node => this.node = node}
          style={{
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {
            this.state.words.map((word, index) => {
              return <Word
                word={word}
                keyboard={keyboard}
                x={index % columns * width}
                y={Math.floor(index / columns) * height}
                width={width}
                height={height}
              />
            })
          }
        </svg>
      </div>
    );
  }
}
