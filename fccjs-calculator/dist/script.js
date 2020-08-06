/* eslint-disable react/no-multi-comp  */
/* eslint-disable react/react-in-jsx-scope */
//To display description of the most recent sound byte that was clicked

/**
 * Displays entered value. Upper right displays running total of values entered. While value on bottom left display what is currently being entered.
 */
const Display = (props) => {
  return <div id='display-container'>
    <h4>{props.overall}</h4>
    <h3>{props.currentValue}</h3>
    <h3>{props.currentOperator}</h3>
    <h3>{console.log(props.inputArray, "ARRAY")}</h3>
    <h2 id='display'>{props.displayValue}</h2>
    </div>
}

/**
 * Defines and sets up each calculator button
 */
class CalcButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.selection.func(this.props.selection.keyVal, this.props.selection.type)
    //this.props.updateDisplayValue(this.props.number.keyVal, this.props.number.func)
  }

  componentDidMount(prevProps, prevState) {}

  render() {
    return (
      <button
        ref={(c) => (this.calcButton = c)}
        className={this.props.selection.type}
        id={`${this.props.selection.id}`}
        onClick={this.handleClick}
      >
        {this.props.selection.keyVal}
      </button>
    )
  }
}

class JSCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateDisplayValue = this.updateDisplayValue.bind(this)
    // this.updateOverall = this.updateOverall.bind(this)
    this.concatenateNumbers = this.concatenateNumbers.bind(this)
    this.addOperation = this.addOperation.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this)
    this.state = {
      overall: '',
      displayValue: '0',
      hasDecimal: false,
      inputArray: [],
      currentValue: '',
      currentOperator: ''
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
      {
        id: 'decimal',
        keyVal: '.',
        type: 'number',
        func: this.concatenateNumbers,
      },
      { id: 'clear', keyVal: 'AC', type: 'operator', func: this.clearDisplay },
      {
        id: 'divide',
        keyVal: '/',
        type: 'operator',
        func: this.addOperation,
      },
      {
        id: 'multiply',
        keyVal: '*',
        type: 'operator',
        func: this.addOperation,
      },
      {
        id: 'subtract',
        keyVal: '-',
        type: 'operator',
        func: this.addOperation,
      },
      {
        id: 'add',
        keyVal: '+',
        type: 'operator',
        func: this.addOperation,
      },
      {
        id: 'equals',
        keyVal: '=',
        type: 'operator',
        func: this.updateDisplayValue,
      },
    ]
  }
  updateDisplayValue(val, func) {
    this.setState({
      displayValue: val
    })
  }
  // updateOverall(val){

  // }

  addOperation(operator, type){

    let lastInput = this.state.inputArray.length ? this.state.inputArray[this.state.inputArray.length-1]: null;

    //Initially this would be the operator, however if user enters additional numbers, this will save currentValue
    let currentValue = Number(this.state.displayValue, 10);

    //Prevents operator from being added at beginning unless a '-' or displayValue is empty
    if(this.state.displayValue === '' && operator !== '-') return;


    //Prevents initial operator from being changed to a non '-' operator by checking last input value and checking if entered value is not a number
    if (this.state.inputArray.length === 1 && lastInput === '-' && !currentValue) return;

    //If current display value is a negative, allow a negative to be entered again
    // if(operator === '-' && lastInput === '-' && currentValue === '-')

    //If user enters an operator, replace operator if additional added. However if - allow for a second addition
    if (!currentValue){

      if( operator === '-' && this.state.numNegatives < 1) {
        this.setState(prevState => ({
          displayValue: operator,
          numNegatives: prevState.numNegatives + 1,
          inputArray: [...prevState.inputArray, operator],
          overall: prevState.overall + operator
        }))
      } else if ( !this.state.overall|| (this.state.inputArray.length > 1 && Number(this.state.inputArray [this.state.inputArray.length -2])))
      this.setState(prevState => ({
        displayValue: operator,
        currentOperator: operator,
        inputArray: [...prevState.inputArray.slice(0, -1), operator],
        overall: prevState.overall.slice(0, -1) + operator
      }))


   }

   //If a number is entered by user, add number to array and to overall display
    if (currentValue)
    this.setState(prevState => ({
      displayValue: operator,
      hasDecimal: false,
      numNegatives: 0,
      inputArray: [...prevState.inputArray, currentValue, operator],
      overall: typeof Number(prevState.displayValue) !== 'number' ? `${prevState.overall}${prevState.displayValue}${operator}` : `${prevState.overall}${prevState.displayValue}${operator}`
    }))
  }

  handleChange(event) {}

  concatenateNumbers(val) {

    if (!Number(this.state.displayValue))
    this.setState({
      displayValue: '',
    })


    this.setState((prevState) => ({
      displayValue: helperConcatenateNumbers(prevState, val),
    }))

    let helperConcatenateNumbers = (prevState) => {

      //If already has a decimal, return original value
      if (this.state.hasDecimal && val === '.') return this.state.displayValue


      //Prevent multiple 0s from being inserted at beginning if current value isn't a decimal.
      if (prevState.displayValue == '0' && val != '.')
        return val
      else
        return `${prevState.displayValue}${val}`

    }
    //If the current value is a decimal, update hasDecimal to true to prevent additional decimals
    if (val === '.') this.setState({ hasDecimal: true })


  }

  isOperator(val) {
    let bank = '!/+*-'
    return bank.indexOf(val) === -1 ? false : true;
  }

  clearDisplay(val) {
    this.setState({
      overall: '',
      displayValue: 0,
      hasDecimal: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <span>
        {/* <h1 id='main-title'>Javascript Calculator</h1> */}
        <div id='grid-container'>
          <Display displayValue={this.state.displayValue} overall={this.state.overall} currentValue={this.state.currentValue} currentOperator={this.state.currentOperator} inputArray={this.state.inputArray} />
          {this.buildNumAndOpsArray.map((selection) => (
            <CalcButton
              selection={selection}
              key={selection.id}
              updateDisplayValue={this.updateDisplayValue}
            />
          ))}
        </div>
      </span>
    )
  }
}

ReactDOM.render(<JSCalculator />, document.getElementById('js-calculator'))
