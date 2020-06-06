/* eslint-disable react/no-multi-comp  */
/* eslint-disable react/react-in-jsx-scope */
//To display description of the most recent sound byte that was clicked

const Display = (props) => {
  return <h2 id='display'>{props.displayValue}</h2>
}

class CalcButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.number.func(this.props.number.keyVal);
    //this.props.updateDisplayValue(this.props.number.keyVal, this.props.number.func)
  }

  componentDidMount(prevProps, prevState) {}

  render() {
    return (
      <button
        ref={(c) => (this.calcButton = c)}
        className={this.props.number.type}
        id={`${this.props.number.id}`}
        onClick={this.handleClick}
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
    this.updateDisplayValue = this.updateDisplayValue.bind(this)
    this.concatenateNumbers = this.concatenateNumbers.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.state = {
      overall: '',
      displayValue: '',
      hasDecimal: false
    }

    this.buildNumAndOpsArray = [
      { id: 'zero', keyVal: 0, type: 'number', func: this.concatenateNumbers },
      { id: 'one', keyVal: 1, type: 'number', func: this.concatenateNumbers },
      { id: 'two', keyVal: 2, type: 'number', func: this.concatenateNumbers },
      { id: 'three', keyVal: 3, type: 'number', func: this.concatenateNumbers },
      { id: 'four', keyVal: 4, type: 'number', func: this.concatenateNumbers },
      { id: 'five', keyVal: 5, type: 'number', func: this.concatenateNumbers },
      { id: 'six', keyVal: 6, type: 'number', func: this.concatenateNumbers },
      { id: 'seven', keyVal: 7, type: 'number', func: this.concatenateNumbers },
      { id: 'eight', keyVal: 8, type: 'number', func: this.concatenateNumbers },
      { id: 'nine', keyVal: 9, type: 'number', func: this.concatenateNumbers },
      { id: 'decimal', keyVal: '.', type: 'number', func: this.concatenateNumbers },
      { id: 'clear', keyVal: 'AC', type: 'operator', func: this.clearDisplay },
      { id: 'divide', keyVal: '/', type: 'operator', func: '' },
      { id: 'multiply', keyVal: 'x', type: 'operator', func: '' },
      { id: 'subtract', keyVal: '-', type: 'operator', func: '' },
      { id: 'add', keyVal: '+', type: 'operator', func: '' },
      { id: 'equals', keyVal: '=', type: 'operator', func: '' },
    ]
  }
  updateDisplayValue(val, func) {
    this.setState({
      displayValue: val,
    })
  }
  handleChange(event) {}

  concatenateNumbers(val){
    this.setState((prevState) => ({
      overall: '',
      displayValue: this.helperConcatenateNumbers(prevState, val)
    }))
    this.helperConcatenateNumbers = (prevState) =>{
      console.log(prevState.displayValue);
      //This will prevent multiple 0s from being inserted at beginning of string if previous value is already 0  given that current value isn't a decimal.

      //if the state already has a decimal, do no alterations and return original value
      if(this.state.hasDecimal && val === '.') return this.state.displayValue;

      //if the current value is a decimal, update hasDecimal to true to prevent additional decimals
      if(val === '.') this.setState({hasDecimal: true})


      if(prevState.displayValue == '0' && val != '.') return val
      // if(val != '.' && prevState.displayValue.toString().slice(-1) != '.' )
      // return `${prevState.displayValue}${val}`
      else {
        return `${prevState.displayValue}${val}`
      }

    }

  }

  clearDisplay(){
    this.setState({
      overall: '',
      displayValue: 0,
      hasDecimal: false
    })
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <span>
        {/* <h1 id='main-title'>Javascript Calculator</h1> */}
        <div id='grid-container'>
          <Display displayValue={this.state.displayValue} />
          {this.buildNumAndOpsArray.map((number) => (
            <CalcButton number={number} key={number.id} updateDisplayValue={this.updateDisplayValue} />
          ))}
        </div>
      </span>
    )
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById('js-calculator'))
