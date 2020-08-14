/**
 * @author Jamila Toaha
 * @date 8/13/20
 * Project: Pomodoro Clock built with React.js
 * Built a Pomodoro Clock that alternates alternates between session and break modes. Built using React.js. Page layout implemented with CSS Grid. Further vanilla CSS was added to refine look. A bit of JQuery was also used to play sound files.
 *
 * NOTE: As this is a project originally meant to be displayed on CodePen, all React Components needed to be placed in a single file.
 *
 */


/*===================================*/

//Accurate_Interval.js Code Source: https://codepen.io/no_stack_dub_sack/pen/VKJGKd?editors=0010

;(function () {
  window.accurateInterval = function (fn, time) {
    var cancel, nextAt, timeout, wrapper
    nextAt = new Date().getTime() + time
    timeout = null
    wrapper = function () {
      nextAt += time
      timeout = setTimeout(wrapper, nextAt - new Date().getTime())
      return fn()
    }
    cancel = function () {
      return clearTimeout(timeout)
    }
    timeout = setTimeout(wrapper, nextAt - new Date().getTime())
    return {
      cancel: cancel,
    }
  }
}.call(this))
/*===================================*/



//This background items array will be used to populate BackgroundItems components
let backgroundItemsArray = [
  {
    name: 'title-item',
    text: 'Pomodoro Clock built with React.js',
    color: '#ffffff',
  },
  { name: 'sun-item', text: '^_^', color: 'yellow' },
  { name: 'horizontal-item', text: '', color: 'pink' },
  { name: 'timer-case-item', text: '', color: '#db5656' },
]

/*=======REACT COMPONENTS=========*/
//BackgroundItem, Label, Timer, Pomodoro

/*================================*/
//BackgrountItem: Presentational functional component template to display sun, horizon, timer case and title cloud
const BackgroundItem = (props) => {
  return (
    <div id={props.name} style={{ backgroundColor: props.color }}>
      <p>{props.text}</p>
    </div>
  )
}
/*================================*/
//Label component: Sets up the Session and Break components where user can increment/ decrement desired time length for respective components
class Label extends React.Component {
  constructor(props) {
    super(props)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }
  handleDecrement() {
    this.props.label.decrement(this.props.name)
  }

  handleIncrement() {
    this.props.label.increment(this.props.name)
  }

  render() {
    let props = this.props
    let name = this.props.name.split('-')[0]
    return (
      <div
        className='label'
        id={props.name}
        style={{ backgroundColor: 'white' }}
      >
        <h1>{props.text}</h1>
        <h2>
          <span
            className='arrow'
            id={name + '-decrement'}
            onClick={this.handleDecrement}
          >
            ↓
          </span>
          <span className='label-length' id={name + '-length'}>
            &#09;{props.duration}&#09;
          </span>
          <span
            className='arrow'
            id={props.text.toLowerCase() + '-increment'}
            onClick={this.handleIncrement}
          >
            ↑
          </span>
        </h2>
      </div>
    )
  }
}

/*================================*/
//Timer component houses the timer. User can play, pause, and restart timer, as well as view what mode they are on
// -Timer alternates between Break and Session modes. A beep audio file is played when either session ends.
// -Initally used JQuery to update timer-field, then switched to updating over to using React's built-in state object)
// -Makes use of the moment.js library to work with time values. (It does not support the value of 60, so manually adjusted usage for that edge case.)
// -Does use a bit of JQuery by getting audio element so sound file (beep) can be played
class Timer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sessionCompleted: false,
      timer: '',
      current:
        this.props.session === '60'
          ? '60:00'
          : moment(`2020/08/12 00:${this.props.session}:00`),
    }

    this.status = '' // 'start', 'pause', 'play'
    this.pausePlay = this.pausePlay.bind(this)
    this.reset = this.reset.bind(this)
  }

  componentDidMount() {
    let timerCount = 0
    let currentTime =
      this.props.session === 60
        ? '60:00'
        : moment(`2020/08/12 00:${this.props.session}:00`)
    let delay = 0

    this.timer = accurateInterval(() => {
      if (this.status === 'reset') {
        timerCount = 0
        currentTime =
          this.props.session === 60
            ? '60:00'
            : moment(`2020/08/12 00:${this.props.session}:00`)
        this.setState({
          sessionCompleted: false,
          current: currentTime,
        })
        this.status = ''
      }

      if (this.status === 'start') {
        timerCount = 0
        currentTime =
          this.props.session === 60
            ? '60:00'
            : moment(`2020/08/12 00:${this.props.session}:00`)
        delay = 0
        this.status = 'play'
      }

      if (this.status === 'play' || this.status === 'pause') {
        if (
          typeof currentTime !== 'string' &&
          currentTime.format('mm:ss') === '00:00'
        ) {
          if (delay++ < 1) {
            $('#beep')[0].play()
            return
          }
          //Beep plays for only a second
          $('#beep')[0].pause()

          delay = 0
          timerCount = 0
          this.setState((prevState) => ({
            sessionCompleted: !prevState.sessionCompleted,
          }))
          currentTime = !this.state.sessionCompleted
            ? moment(`2020/08/12 00:${this.props.session}:00`)
            : moment(`2020/08/12 00:${this.props.break}:00`)
          console.log(
            typeof currentTime === 'string'
              ? currentTime
              : currentTime.format('mm:ss')
          )
        }

        //This function indefinitely plays the setInterval function. The variable, timerCount, which is adjusted and incremented according to status, is relied on to modify currentTime value
        if (!this.state.sessionCompleted) {
          console.log(this.status, 'WHYY')
          currentTime =
            currentTime === '60:00'
              ? moment(`2020/08/12 00:59:00`)
              : moment(`2020/08/12 00:${this.props.session}:00`).subtract(
                  this.status === 'pause' ? timerCount : timerCount++,
                  'seconds'
                )
        } else {
          currentTime =
            currentTime === '60:00'
              ? moment(`2020/08/12 00:59:00`)
              : moment(`2020/08/12 00:${this.props.break}:00`).subtract(
                  this.status === 'pause' ? timerCount : timerCount++,
                  'seconds'
                )
          //Saving this code for if I ever want to stop the timer from proceeding, for as of now the timer goes on indefinitely alternating between Session and Break modes
          // if(currentTime === '00:00')
          // {
          //   timerCount = 0;
          //   clearInterval(this.state.timer)
          // }
        }
        this.setState({
          current: currentTime,
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  pausePlay() {
    if (this.status === '') {
      this.status = 'start'
    }

    if (this.status === 'play') {
      this.status = 'pause'
      return
    }

    if (this.status === 'pause') {
      this.status = 'play'
      return
    }

  }

  reset() {
    this.status = 'reset' // 'start', 'pause', 'play', 'reset'
    this.props.reset()
  }

  render() {
    let timeLeft
    if (!this.state.sessionCompleted)
      timeLeft =
        this.props.session === 60
          ? '60:00'
          : moment(`2020/08/12 00:${this.props.session}:00`).format('mm:ss')
    else
      timeLeft =
        this.props.break === 60
          ? '60:00'
          : moment(`2020/08/12 00:${this.props.break}:00`).format('mm:ss')

    return (
      <div id='timer-label' style={{ backgroundColor: 'white' }}>
        <h1>Timer</h1>
        <h2 id='timer-mode'>
          {!this.state.sessionCompleted ? 'Session' : 'Break'}
        </h2>
        <h2 id='time-left'>
          {this.status === ''
            ? timeLeft
            : this.state.current === '60:00'
            ? this.state.current
            : this.state.current.format('mm:ss')}
        </h2>
        <div id='start_stop'>
          <span id='play' onClick={this.pausePlay}>
            ▶️
          </span>
          <span id='pause' onClick={this.pausePlay}>
            ⏸️{' '}
          </span>
          <span id='reset' onClick={this.reset}>
            🔄
          </span>
        </div>
      </div>
    )
  }
}

/*================================*/
//Pomodoro component: houses the BackgroundItems, Label, and Timer components
//It manages the state for the Session and Break lengths and passes the values down

class Pomodoro extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'session-length': 25,
      'break-length': 5,
    }

    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)

    this.labelArray = [
      {
        name: 'session-label',
        text: 'Session',
        duration: this.state['session-length'],
        increment: this.increment,
        decrement: this.decrement,
      },
      {
        name: 'break-label',
        text: 'Break',
        duration: this.state['break-length'],
        increment: this.increment,
        decrement: this.decrement,
      },
    ]
  }

  increment(name) {
    name = name.split('-')[0] + '-length'
    this.setState((prevState) => ({
      [name]: prevState[name] + 1 < 60 ? prevState[name] + 1 : 60,
    }))
  }

  decrement(name) {
    name = name.split('-')[0] + '-length'
    this.setState((prevState) => ({
      [name]: prevState[name] - 1 > 0 ? prevState[name] - 1 : 1,
    }))
  }

  reset() {
    this.setState({
      'session-length': 25,
      'break-length': 5,
    })
  }

  render() {
    return (
      <div id='pomodoro'>
        {backgroundItemsArray.map((item) => (
          <BackgroundItem
            key={item.name}
            name={item.name}
            text={item.text}
            color={item.color}
          />
        ))}
        {this.labelArray.map((label) => (
          <Label
            key={label.name}
            name={label.name}
            text={label.text}
            duration={this.state[label.name.split('-')[0] + '-length']}
            label={label}
          />
        ))}
        <Timer
          session={this.state['session-length']}
          break={this.state['break-length']}
          reset={this.reset}
        />
      </div>
    )
  }
}

ReactDOM.render(<Pomodoro />, document.getElementById('pomodoro-env'))
