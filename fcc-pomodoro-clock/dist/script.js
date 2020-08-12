/*eslint-disable react/no-multi-comp */
/**
 * As this is a project originally meant to be displayed on CodePen, all React Components needed to be placed in a single file.
 *
 */

//Background Items Array will be used to populate BackgroundItems components
let backgroundItemsArray = [
  {name: 'title-item', text: 'Pomodoro Clock built with React.js', color: '#ffffff'},
  {name: 'sun-item', text: '⬛ - ⬛', color: 'yellow'},
  {name: 'horizontal-item', text: '', color: 'pink'},
  {name: 'timer-case-item', text: '', color: 'red'},
]



const BackgroundItem = props => {
  return (
    <div id={props.name} style={{backgroundColor: props.color}}>
        <h1>
          {props.text}
        </h1>
    </div>
  )
}

class Label extends React.Component {
      constructor(props) {
        super(props)
        this.handleIncrement = this.handleIncrement.bind(this)
        this.handleDecrement = this.handleDecrement.bind(this)

      }
      handleDecrement(){
        this.props.label.decrement(this.props.name);
      }

      handleIncrement(){
        this.props.label.increment(this.props.name);
      }


      render() {
        let props = this.props;
        let name = this.props.name.split('-')[0]
        return(
          <div id= {props.name} style={{backgroundColor: 'white'}}>
            <h2>{props.text}</h2>
            <h3>
            <span id={name + '-decrement'} onClick={this.handleDecrement}>↓</span>
            <span id={name +'-length'}>{props.duration}</span>
            <span id={props.text.toLowerCase() + '-increment'} onClick={this.handleIncrement}>↑</span>
            </h3>
          </div>
        )
      }
}

// console.log(moment('2013-02-08 09:30:26').subtract(1, 'seconds').format('mm ss'));

class Timer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'start', // 'start', 'pause', 'play'
      sessionCompleted: false,
      timer: '',
      sessionInProgress: '',
      breakInProgress: ''
    }
    // this.state = {
    //   session: moment(`2020/08/12 00:${this.props.session}:00`).format('mm:ss'),
    //   break: moment(`2020/08/12  00:${this.props.break}:00`).format('mm:ss')
    // }
    this.pausePlay = this.pausePlay.bind(this)
    this.reset = this.reset.bind(this)
  }

  pausePlay() {
    if(this.state.status === 'start') {
      let timerCount = 0;
      let delay = 0;
      let currentTime;
      let timer = setInterval(() => {


        if(!this.state.sessionCompleted){

          if(currentTime === '00:00')
          {
            timerCount = 0;
            this.setState( prevState => ({
              sessionCompleted: !prevState.sessionCompleted
            }))

            currentTime = moment(`2020/08/12 00:${this.props.break}:00`).format('mm:ss')

            $('#time-left').text(currentTime)

          }
          else {
            currentTime= moment(`2020/08/12 00:${this.props.session}:00`).subtract(++timerCount, 'seconds').format('mm:ss')
            $('#time-left').text(currentTime)
          }

        }

        else{



          currentTime= moment(`2020/08/12 00:${this.props.break}:00`).subtract(++timerCount, 'seconds').format('mm:ss')

          if(currentTime === '00:00')
          {
            timerCount = 0;
            clearInterval(this.state.timer)

          }
          $('#time-left').text(currentTime)
        }

      }, 300);
      this.setState({
        status: 'play',
        timer: timer
      })
    }

  }

  reset(){
    clearInterval(this.state.timer)
    this.setState({
      status: 'start', // 'start', 'pause', 'play'
      sessionCompleted: false,
      timer: ''
    })
    $('#time-left').text(this.props.session === 60 ? '60:00' : moment(`2020/08/12 00:${this.props.session}:00`).format('mm:ss'))

    this.props.reset();
  }

  render(){
    let timeLeft
    if(!this.state.sessionCompleted)
     timeLeft  = this.props.session === 60 ? '60:00' : moment(`2020/08/12 00:${this.props.session}:00`).format('mm:ss')
    else
      timeLeft  = this.props.break === 60 ? '60:00' : moment(`2020/08/12 00:${this.props.break}:00`).format('mm:ss')
      console.log(timeLeft)
    return(
      <div id ='timer-label' style={{backgroundColor: 'white'}}>
        <h1>Timer</h1>
    <h2>{!this.state.sessionCompleted?  'Session' : 'Break'}</h2>
    <h2 id='time-left'>{ timeLeft }</h2>
      <span id='start_stop'>
        <span id='play' onClick={this.pausePlay} >▶️</span>
        <span id='pause' onClick={this.pausePlay}>⏸️ </span>
      </span>

      <span id='reset' onClick={this.reset}>
      🔄
      </span>

      </div>

  )}
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'session-length': 25,
      'break-length' : 5
    }
    console.log(moment('2013-02-08 09:30:26').subtract(1, 'seconds').format('mm ss'));
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this)

    this.labelArray = [
      {name: 'session-label',
        text: 'Session',
        duration: this.state["session-length"],
        increment: this.increment,
        decrement: this.decrement},
      {name: 'break-label',
        text: 'Break',
        duration: this.state['break-length'],
        increment: this.increment,
        decrement: this.decrement}
   ]
  }

  increment(name) {
      name = name.split('-')[0] + '-length';
      console.log(name)
      this.setState(prevState => ({
        [name] : prevState[name]+ 1 < 60 ? prevState[name]+ 1 : 60
      }))
  }

  decrement(name) {
    name = name.split('-')[0] + '-length';
    this.setState(prevState => ({
      [name]: prevState[name] - 1 > 0 ? prevState[name] - 1: 1
    }))
  }

  reset(){
    this.setState({
      'session-length': 25,
      'break-length' : 5
    })
  }

  render () {
    return (
      <div id="pomodoro">
     {backgroundItemsArray.map(item =>
      (  <BackgroundItem
          key= {item.name}
          name = {item.name}
          text= {item.text}
          color= {item.color}/>
     ))}
     {
       this.labelArray.map(label => (
         <Label
         key = {label.name}
         name = {label.name}
         text = {label.text}
         duration= {this.state[label.name.split('-')[0] +'-length']}
         label = {label}
         />
       )
      )
     }
         <Timer
          session={this.state["session-length"]}
          break={this.state["break-length"]}
          reset={this.reset}
          />
      </div>
    )

  }

  }

  ReactDOM.render(<Pomodoro />, document.getElementById('pomodoro-env'))
//this.state.status === 'start' ?
