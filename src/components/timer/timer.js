import React, { Component } from 'react';
import "../../styles/timer.css";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          min: 0,
          sec: 0
        };
        this.resetTimer = this.resetTimer.bind(this);
      }
    
      componentDidMount() {
        this.interval = setInterval(() => {
          if (this.props.begin) {
            this.setState({
              min: this.state.sec < 59 ? this.state.min : this.state.min + 1,
              sec: this.state.sec < 59 ? this.state.sec + 1 : 0
            });
          }
        }, 1000);
      }
    
      resetTimer() {
        this.setState({ min: 0, sec: 0 });
      }
    
      render() {
        function n(n) {
          return n > 9 ? "" + n : "0" + n;
        }
        return (
          <div className="clockB">
            <h6 className="clock">
              {n(this.state.min)} : {n(this.state.sec)}
            </h6>
          </div>
        );
      }
    
      componentWillReceiveProps(nextProps) {
        if (this.props.begin !== nextProps.begin && !nextProps.begin) {
          this.resetTimer();
        }
      }
    
      componentWillUnmount() {
        clearInterval(this.interval);
      }
}
 
export default Timer;