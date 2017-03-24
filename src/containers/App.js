import React, { Component } from 'react';
import Word from '../components/Word';
import update from 'immutability-helper';
import Keyboard from '../lib/keyboard'
import germanLayout from '../lib/keyboard/layouts/german.js';

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
  constructor(props) {
    super(props);
    this.state = {
      words: ['']
    }

    this.keyboard = new Keyboard(germanLayout);
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  handleChange(event) {

    let lastWord = this.state.words[this.state.words.length - 1];

    //let modifier = event.getModifierState('Shift')

    if(event.key === ' ') {
      if(lastWord !== '') {
        this.setState({words: this.state.words.concat([''])});
      }
    } else {
      var newWords = update(this.state.words, {$splice: [[this.state.words.length - 1, 1, lastWord + event.key]]});
      this.setState({
        words: newWords
      });
    }

  }

  enableWriting() {
    this.refs.input.focus();
  }

  render() {

    return (
      <div className="w-100 min-h-100 p1" onClick={this.enableWriting.bind(this)}>
        <input type='' ref='input' className="absolute o-0" onKeyPress={this.handleChange.bind(this)} />
        {
          this.state.words.map(word => {
            return <Word word={word} keyboard={this.keyboard} />
          })
        }
      </div>
    );
  }
}
