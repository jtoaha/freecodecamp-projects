//To display description of the most recent sound byte that was clicked
const Display = (props) => {
  return <h2 id='display'>Display: {props.displayValue}</h2>
}

class CalcButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {}

  componentDidMount(prevProps, prevState) {}

  render() {
    return (
      <button
        ref={(c) => (this.calcButton = c)}
        className={this.props.number.type}
        id={`${this.props.number.id}`}
      >
        {this.props.number.keyVal}
      </button>
    )
  }
}

class JSCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateCurrentSound = this.updateCurrentSound.bind(this)
    this.state = {
      displayValue: ' ',
    }

    this.buildNumAndOpsArray = [
      { id: 'zero', keyVal: 0, type: 'number', func: '' },
      { id: 'one', keyVal: 1, type: 'number', func: '' },
      { id: 'two', keyVal: 2, type: 'number', func: '' },
      { id: 'three', keyVal: 3, type: 'number', func: '' },
      { id: 'four', keyVal: 4, type: 'number', func: '' },
      { id: 'five', keyVal: 5, type: 'number', func: '' },
      { id: 'six', keyVal: 6, type: 'number', func: '' },
      { id: 'seven', keyVal: 7, type: 'number', func: '' },
      { id: 'eight', keyVal: 8, type: 'number', func: '' },
      { id: 'nine', keyVal: 9, type: 'number', func: '' },
      { id: 'decimal', keyVal: '.', type: 'number', func: '' },
      { id: 'clear', keyVal: 'AC', type: 'operator', func: '' },
      { id: 'divide', keyVal: '/', type: 'operator', func: '' },
      { id: 'multiply', keyVal: 'x', type: 'operator', func: '' },
      { id: 'subtract', keyVal: '-', type: 'operator', func: '' },
      { id: 'add', keyVal: '+', type: 'operator', func: '' },
      { id: 'equals', keyVal: '=', type: 'operator', func: '' },
    ]
  }
  updateCurrentSound(val) {
    this.setState({
      currentSound: val,
    })
  }
  handleChange(event) {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <span>
        {/* <h1 id='main-title'>Javascript Calculator</h1> */}
        <div id='grid-container'>
          <Display displayValue={this.state.displayValue} />
          {this.buildNumAndOpsArray.map((number) => (
            <CalcButton number={number} key={number.id} />
          ))}
        </div>
      </span>
    )
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById('js-calculator'))
