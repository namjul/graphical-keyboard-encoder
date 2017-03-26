import React, { Component } from 'react';
import Word from '../components/Word';
import update from 'immutability-helper';
import Keyboard from '../lib/keyboard'
import germanLayout from '../lib/keyboard/layouts/german.js';
import download from 'downloadjs';
import debounce from 'debounce';
import classnames from 'classnames';

const keyboard = new Keyboard(germanLayout)

export default class App extends Component {

  state = {
    words: [],
    width: window.innerWidth,
    focus: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  handleChange = (event) => {

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

  writingEnabled = () => {
    if (this.inputNode !== document.activeElement) {
      this.setState({ focus: true })
      this.inputNode.focus();
    }
  }

  writingDisabled = () => {
    if (this.inputNode === document.activeElement) {
      this.setState({ focus: false })
    }
  }

  handleClick = () => {
    const svg = this.svgNode.outerHTML
    download(new Blob([svg]), 'keyboardgesture.svg', 'text/sgv');
  }

  handleResize = debounce(() => {
    this.setState({ width: window.innerWidth })
  })

  render() {
    const width = 300
    const height = 100
    const columns = Math.floor(this.state.width / width)

    return (
      <div
        className={classnames('w-100 min-h-100 relative center bg-near-white', { 'bg-white': this.state.focus })}
        onClick={this.writingEnabled}
        style={{
          width: width * columns,
          height: window.innerHeight
        }}
      >
        <input
          type="text"
          autoFocus
          ref={node => this.inputNode = node}
          className="absolute o-0"
          onKeyPress={this.handleChange}
          onBlur={this.writingDisabled}
        />
        {
          this.state.words.length === 0
            ? <span>{`${this.state.focus ? 'start typing' : ''}`}</span>
            : <svg
              width="100%"
              height="100%"
              className="absolute"
              ref={node => this.svgNode = node}
            >
              {
                this.state.words
                  .filter(word => word !== '')
                  .map((word, index) => {
                  return <Word
                    key={index}
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
        }
        {
          this.state.words.length > 0
            ? <button
              type="button"
              onClick={this.handleClick}
              className="absolute bottom-0 right-0"
            >
              download svg
            </button>
            : null
        }
      </div>
    );
  }
}
