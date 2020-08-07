/**
 * @author: Jamila Toaha
 * Javascript Calculator built using React.js (HTML/ JS / CSS)
 */


//Display Component: Displays entered values. Upper right displays running total of values entered. While value on bottom left display what is currently entered.
const Display = (props) => {
  return (
    <div id='display-container'>
      <h4>{props.inputArray.reduce((a, b) => `${a}` + `${b}`, '')}</h4>
      {/* <h3>{console.log(props.inputArray, "ARRAY")}</h3> */}
      <h2 id='display'>{props.displayValue}</h2>
    </div>
  )
}

// CalcButton Component- sets up template for each button to be mapped onto
class CalcButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    this.props.selection.func(
      this.props.selection.keyVal,
      this.props.selection.type
    )
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

// JSCalculator Parent Component: Houses the Display and all of the individual CalcButtons
class JSCalculator extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateDisplayValue = this.updateDisplayValue.bind(this)
    // this.updateOverall = this.updateOverall.bind(this)
    this.concatenateNumbers = this.concatenateNumbers.bind(this)
    this.addOperation = this.addOperation.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
    this.calculateValue = this.calculateValue.bind(this)
    this.isOperator = this.isOperator.bind(this)
    this.addNumber = this.addNumber.bind(this)
    this.state = {
      displayValue: '',
      hasDecimal: false,
      inputArray: [],
      operatorCount: 0,
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
        func: this.calculateValue,
      },
    ]
  }
  updateDisplayValue(val, func) {
    this.setState({
      displayValue: val,
    })
  }

  addOperation(operator, type) {
    let lastInput = this.state.inputArray.length
      ? this.state.inputArray[this.state.inputArray.length - 1]
      : null

    //Initially this would be the operator, however if user enters additional numbers, this will save currentValue
    let currentValue = Number(this.state.displayValue)

    //Prevents operator from being added at beginning unless a '-' or displayValue is empty
    if (this.state.displayValue === '' && operator !== '-') return

    //Allows - operator to be added at beginning without a 0 being added to inputArray
    if (
      (this.state.displayValue === '' || this.state.displayValue === '0') &&
      operator === '-'
    ) {
      this.setState((prevState) => ({
        displayValue: operator,
        inputArray: [operator],
      }))
      return
    }

    //Prevents initial operator from being changed to a non '-' operator by checking last input value and checking if entered value is not a number
    if (
      this.state.inputArray.length === 1 &&
      lastInput === '-' &&
      !currentValue
    )
      return

    if (this.state.inputArray.length === 0 && operator === '-' && !currentValue)
      return

    //If user enters an operator, replace operator if additional added. However if - allow for a second addition
    if (currentValue !== 0 && !currentValue) {
      let operatorTracker =
        operator === '-' ? [this.state.operatorCount, operator] : [operator]

      this.setState((prevState) => ({
        displayValue: operator,
        operatorCount: operator,
        inputArray: [...prevState.inputArray, operator],
      }))
    }

    //If a number is entered by user, add number to array and to overall display
    //tok out currentValue !== '-' &&
    if (currentValue || currentValue === 0)
      this.addNumber(currentValue, operator)
  }
  //Adds number to input array
  addNumber(currentValue, operator) {
    this.setState((prevState) => ({
      displayValue: operator,
      hasDecimal: false,
      numNegatives: 0,
      inputArray: [...prevState.inputArray, currentValue, operator],
    }))
  }

  handleChange(event) {}

  concatenateNumbers(val) {
    //if the previous display entered is an operator or a 0 clear
    if (
      this.isOperator(this.state.displayValue) ||
      (this.state.displayValue == '0' && val !== '.')
    )
      this.setState({
        displayValue: '',
      })

    this.setState((prevState) => ({
      displayValue: helperConcatenateNumbers(prevState, val),
    }))

    let helperConcatenateNumbers = (prevState) => {
      //If already has a decimal, return original value
      if (this.state.hasDecimal && val === '.') return this.state.displayValue

      //Prevent multiple 0s from being inserted at beginning
      if (prevState.displayValue === '0' && val === 0)
        return prevState.displayValue

      //Replaces 0 at beginning with values
      if (prevState.displayValue === '0' && val !== '.') return val
      else return `${prevState.displayValue}${val}`
    }

    //If the current value is a decimal, update hasDecimal to true to prevent additional decimals
    if (val === '.') this.setState({ hasDecimal: true })
  }

  isOperator(val) {
    let bank = '!/+*-'
    return bank.indexOf(val) === -1 ? false : true
  }

  calculateValue(val) {
    let operations = {
      '-': (x, y) => x - y,
      '+': (x, y) => x + y,
      '*': (x, y) => x * y,
      '/': (x, y) => x / y,
    }
    //If equal is entered when display value is a number, add number to input array
    let input
    let currentValue = this.state.displayValue
    if (this.state.displayValue !== '=' && !this.isOperator(currentValue)) {
      this.setState((prevState) => ({
        displayValue: val,
        hasDecimal: false,
        inputArray: [...prevState.inputArray, Number(currentValue)],
      }))

      input = [...this.state.inputArray, Number(currentValue)]
    } else {
      input = [...this.state.inputArray]
      //Take out any operator at the end
      let flag = 0
      for (let i = input.length - 1; i >= 0; i--) {
        if (flag < 2 && this.isOperator(input[i])) {
          input.pop()
        }
        flag++
      }
    }
    ;``

    /*This section reduces extra - operators*/

    //combines - sign with first element
    if (input[0] === '-' && input.length > 1) {
      input[1] *= -1
      input = input.slice(1)
    }

    //reduces operators
    let reducedOp = []
    let count = []
    for (let i = 0; i < input.length; i++) {
      if (!this.isOperator(input[i])) {
        if (count.length > 0) {
          if (count.length >= 2) {
            if (count[count.length - 1] === '-')
              reducedOp.push(...count.slice(-2))
            else reducedOp.push(...count.slice(-1))
          } else {
            reducedOp.push(...count.slice(-1))
          }
        }
        count = []
        reducedOp.push(input[i])
      } else {
        count.push(input[i])
      }
    }
    if (count.length) {
      if (count.length > 2) {
        if (count[count.length - 1] === '-') reducedOp.push(...count.slice(-2))
        else reducedOp.push(...count.slice(-1))
      }
    }

    console.log(reducedOp, 'OPP')

    let reduceNegative = [reducedOp[0]]
    for (let i = 1; i < reducedOp.length; i++) {
      if (this.isOperator(reducedOp[i])) reduceNegative.push(reducedOp[i])

      if (i + 1 < reducedOp.length && !this.isOperator(reducedOp[i + 1]))
        reduceNegative.push(reducedOp[++i])
      else {
        if (i + 2 < reducedOp.length)
          reduceNegative.push(reducedOp[(i += 2)] * -1)
      }
    }
    console.log(reduceNegative, 'negative')
    //For multiplication and division, move along 2 at a time
    let reducedMD = []
    let current
    for (let i = 0; i < reduceNegative.length; i++) {
      if (i + 2 < reduceNegative.length) {
        if (reduceNegative[i + 1] === '*' || reduceNegative[i + 1] === '/') {
          current = current ? current : [reduceNegative[i]]
          //reducedMD.push(current*input[i+2])
          current = operations[reduceNegative[i + 1]](
            current,
            reduceNegative[i + 2]
          )
        } else {
          if (current) reducedMD.push(current, reduceNegative[i + 1])
          else reducedMD.push(input[i], reduceNegative[i + 1])

          current = null
          //if last element
          if (i + 2 === reduceNegative.length - 1)
            reducedMD.push(reduceNegative[i + 2])
        }
        i++
      }
    }
    if (current) reducedMD.push(current)
    console.log(reducedMD, 'REDUCED')

    let cumulative = reducedMD[0]
    for (let i = 1; i < reducedMD.length; i++) {
      if (i + 1 < reducedMD.length)
        cumulative = operations[reducedMD[i]](cumulative, reducedMD[++i])
    }
    console.log(cumulative, 'COM')

    this.setState({
      displayValue: cumulative,
      inputArray: [],
    })
  }

  clearDisplay(val) {
    this.setState({
      displayValue: '0',
      inputArray: [],
      hasDecimal: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <span>
        {/* <h1 id='main-title'>Javascript Calculator</h1> */}
        <div id='grid-container'>
          <Display
            displayValue={this.state.displayValue}
            currentValue={this.state.currentValue}
            inputArray={this.state.inputArray}
          />
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

/**
 * Because of codepen specs need to modify to allow for - sign to be replaced. Saving original code here, where had a different and cleaner logic of going about multiple operators

     if (currentValue !== 0 && !currentValue ){

      if( operator === '-' && this.state.numNegatives < 1) {
        this.setState(prevState => ({
          displayValue: operator,
          numNegatives: prevState.numNegatives + 1,
          inputArray: prevState.inputArray.length > 0? [...prevState.inputArray, operator]:[ operator],
        }))
      } else if ( !this.state.inputArray|| (this.state.inputArray.length > 1 && Number(this.state.inputArray [this.state.inputArray.length -2])))
      this.setState(prevState => ({
        displayValue: operator,
        currentOperator: operator,
        inputArray: [...prevState.inputArray.slice(0, -1), operator]
      }))


 */
