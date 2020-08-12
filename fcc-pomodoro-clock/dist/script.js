
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
            <div>
            <span id={name + '-decrement'} onClick={this.handleDecrement}>↓</span>
            <span id={name +'-length'}>{props.duration}</span>
            <span id={props.text.toLowerCase() + '-increment'} onClick={this.handleIncrement}>↑</span>
            </div>
          </div>
        )
      }
}


class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'session-length': 25,
      'break-length' : 5
    }

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);

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
        [name] : prevState[name]+ 1 < 60 ? prevState[name]+ 1 : 59
      }))
  }

  decrement(name) {
    name = name.split('-')[0] + '-length';
    this.setState(prevState => ({
      [name]: prevState[name] - 1 > 0 ? prevState[name] - 1: 0
    }))
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

      </div>
    )

  }

  }

  ReactDOM.render(<Pomodoro />, document.getElementById('pomodoro-env'))
