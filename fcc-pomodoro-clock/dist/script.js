
//Background Items Array will be used to populate BackgroundItems components
let backgroundItemsArray = [
  {name: 'title-item', text: 'Pomodoro Clock built with React.js', color: '#ffffff'},
  {name: 'sun-item', text: '⬛ - ⬛', color: 'yellow'},
  {name: 'horizontal-item', text: '', color: 'pink'},
  {name: 'timer-case-item', text: '', color: 'red'},
]

let labelArray = [
   {name: 'session-label', text: 'Session', duration: 25, increment: 'session-increment', decrement: 'session-decrement'},
  {name: 'break-label', text: 'Break', duration: 5, increment: 'break-increment', decrement: 'break-decrement'}
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
        this.state = {
          duration: this.props.duration
        }
      }

      render() {

        return(
          <div id= {this.props.name} style={{backgroundColor: 'white'}}>
            <h2>{this.props.text}</h2>
            <div>
            ↑ {this.state.duration} ↓
            </div>
          </div>
        )
      }
}


class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
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
       labelArray.map(label => (
         <Label
         key = {label.name}
         name = {label.name}
         text = {label.text}
         duration= {label.duration}/>
       )
      )
     }

      </div>
    )

  }

  }

  ReactDOM.render(<Pomodoro />, document.getElementById('pomodoro-env'))
