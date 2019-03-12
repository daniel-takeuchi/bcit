import React, { Component } from 'react';
import './StopWatch.css';

/**
 * Returns time in the mm:ss format.
 * Note that minutes are allowed to go over 2 digits.
 * @param {Number} timer 
 * @returns {String} time in the mm:ss format
 */
function getReadableTime(timer) {
  let minutes = Math.floor(timer / 60);
  if (minutes < 10) minutes = `0${minutes}`;
  let seconds = timer % 60;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${minutes}:${seconds}`;
}

class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      interval: null
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.incrementTimer = this.incrementTimer.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleClickToggle = this.handleClickToggle.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    // Prevent a new timer from being created, if one already exists
    if (this.state.interval) return;

    // Create an interval that will run every second
    const interval = setInterval(this.incrementTimer, 1000);
    this.setState({ interval });
  }

  incrementTimer() {
    // Do not use increment operators, as they would directly assign a value
    // to state.
    // Eg.
    // this.state.counter++
    // is the same as:
    // this.state.counter = this.state.counter + 1
    this.setState({ counter: this.state.counter + 1 });
  }

  stopTimer() {
    // Stop the interval from running
    clearInterval(this.state.interval);
    // Set state.interval to null, now that we don't have an interval running anymore.
    this.setState({ interval: null });
  }

  handleClickReset() {
    this.stopTimer();
    this.setState({ counter: 0 });
  }

  handleClickToggle() {
    if (this.state.interval) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  render() {
    const { counter, interval } = this.state;
    return (
      <div className="stop-watch">
        <div className="stop-watch__time">
          {getReadableTime(counter)}
        </div>
        <div>
          <button onClick={this.handleClickToggle}>
            {interval ? 'Pause' : 'Start'}
          </button>
          &nbsp;
          <button
            disabled={counter === 0 && !interval}
            onClick={this.handleClickReset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default StopWatch;
