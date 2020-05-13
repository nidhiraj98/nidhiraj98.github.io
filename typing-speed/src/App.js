import React from 'react';
import './App.css';

const textArr = [
  "The purpose of our lives is to be happy.",
  "Life is what happens when you're busy making other plans.",
  "Money and success don't change people; they merely amplify what is already there.",
  "If life were predictable it would cease to be life and be without flavor.",
  "The big lesson in life is to never be scared of anyone or anything.",
  "The way I see it, if you want the rainbow, you gotta put up with the rain.",
  "Don't settle for what life gives you; make life better and build something.",
  "You never really learn much from hearing yourself speak."
]
const index = Math.floor(Math.random() * textArr.length)
let quote = textArr[index]

function App() {
  return (
    <div className="App">
      <div className = "body">
        <h1>Check how fast you can type NOW!!</h1>
        <Quote />
        <Button />
      </div>
    </div>
  );
}

function getCharFromEvent(event){
  const currentCode = event.which || event.code;
  let currentKey = event.data || event.key;
  if(!currentKey){
    currentKey = String.fromCharCode(currentCode);
  }
  return currentKey;
}

class Quote extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pos: 0,
      min: 0,
      sec: 0,
      milisec: 0
    };
    this.speed = 0;
  }

  componentDidMount(){
    window.addEventListener("keypress", this.typing.bind(this), true);
    document.getElementsByClassName("fake-text")[0].addEventListener("beforeinput", this.typing.bind(this));
  }

  typing(event) {
    event.preventDefault();
    let key = getCharFromEvent(event);
    this.setState((state, props) => {
      if(key === quote[state.pos]){
        if(state.pos === 0){
          this.startTime = new Date();
          if(this.timerID == null)
            this.timerID = setInterval(
              this.tick.bind(this), 
              10
            );
        }
        else if(state.pos === quote.length - 1){
          // console.log(this.timerID);
          clearInterval(this.timerID);
          this.timerID = null;
          this.speed = (quote.length/ ((state.min * 60) + state.sec + (state.milisec / 100))).toFixed(2);
          document.getElementById("speed").style.display = "initial";
        }
        return {pos: state.pos + 1};
      }
      return {pos: state.pos};
    });
  }

  tick() {
    let currDate = new Date();
    let diffInMilisec = currDate - this.startTime;
    this.setState({min: Math.floor(diffInMilisec / (60 * 1000))});
    diffInMilisec %= (60 * 1000);
    this.setState({sec: Math.floor(diffInMilisec / 1000)});
    this.setState({milisec: diffInMilisec % 1000});
  }

  render() {
    return (
      <div className="main">
        <div className = "quote">
          <span className = "Completed">{quote.substring(0, this.state.pos)}</span>
          <span>{quote.substring(this.state.pos, quote.length)}</span>
        </div>
        <div className = "timer">
          <div className = "container">
            <div className = "time">{("0" + this.state.min).slice(-2)}</div>
            <div className = "name">Minutes</div>
          </div>
          <div className = "container">
            <div className = "time">{("0" + this.state.sec).slice(-2)}</div>
            <div className = "name">Seconds</div>
          </div>
          <div className = "container">
            <div className = "time">{("0" + this.state.milisec + "0").slice(-3)}</div>
            <div className = "name">Miliseconds</div>
          </div>
        </div>
        <div id = "speed">
          {this.speed} characters/sec
        </div>
      </div>
    );
  }
}

class Button extends React.Component{
  render() {
    return (
      <div className="fake-button">
        <div className = "start-now">Start Now!</div>
        <input type="password" className="fake-text"></input>
      </div>
    );
  }
}

export default App;
