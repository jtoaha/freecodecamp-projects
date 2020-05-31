/*This Random Quote Machine is made using React, Bootstrap, and custom CSS. CodePen: https://codepen.io/jtoaha/pen/XWmvpVy?editors=0110*/

class QuoteBox extends React.Component {
  constructor(props) {
    super(props)
    this.randomQuoteIndex = Math.floor(Math.random() * 20)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      currentQuote: this.props.quotes[this.randomQuoteIndex],
    }

    this.mystyle = {
      color: colors[this.randomQuoteIndex % 14],
    }
  }

  handleClick() {
    this.randomQuoteIndex = Math.floor(Math.random() * 20)
    this.setState({
      currentQuote: this.props.quotes[this.randomQuoteIndex],
    })
    this.mystyle = {
      color: colors[this.randomQuoteIndex % 7],
    }
  }

  render() {
    let currentQuote = this.state.currentQuote
    return (
      <div id='quote-machine'>
        <div className='transition-custom' id='quote-area'>
          <h3 style={this.mystyle} id='text'>
            "{currentQuote.text}"
          </h3>
          <h4 id='author'>–{currentQuote.author}</h4>
        </div>
        <div id='button-section'>
          <button
            className='btn btn-primary'
            type='submit'
            onClick={this.handleClick}
            id='new-quote'
          >
            {' '}
            New Quote{' '}
          </button>
          <a href='https://twitter.com/intent/tweet' id='tweet-quote' />
          <button className='btn btn-custom'>
            <a
              href='https://twitter.com/intent/tweet'
              className='twitter-share-button'
              data-text={`"${currentQuote.text}" –${currentQuote.author}`}
              data-show-count='false'
              data-url=' '
              id='tweet-quote'
            >
              {/* <i className='fa fa-twitter'></i> */}
            </a>
          </button>
        </div>
      </div>
    )
  }
}

let quotes = [
  {
    text: 'Start where you are. Use what you have. Do what you can.',
    author: 'Arthur Ashe',
  },
  {
    text:
      "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
    author: 'Muhammad Ali',
  },
  {
    text:
      'The secret of change is to focus all your energy not on fighting the old but on building the new.',
    author: 'David Millman',
  },
  {
    text:
      'Go confidently in the direction of your dreams. Live the life you have imagined.',
    author: 'Henry David Thoreau',
  },
  { text: 'May you live every day of your life.', author: 'Jonathan Swift' },
  {
    text: "Success isn't owned. It is leased, and rent is due.",
    author: 'JJ Watts',
  },
  {
    text:
      'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
  },
  {
    text:
      'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.',
    author: 'Thomas A. Edison',
  },
  {
    text: 'Don’t let them take you down. Leave a better world than you found.',
    author: 'Audioslave',
  },
  {
    text:
      'Real generosity towards the future lies in giving all to the present.',
    author: 'Albert Camus',
  },
  {
    text:
      'Remember, you alone get to choose what matters and what doesn’t. The meaning of everything in your life has precisely the meaning you give it.',
    author: 'Marc and Angel',
  },
  {
    text:
      'Let go of the thing that you’re trying to be (the noun), and focus on the actual work you need to be doing (the verb).',
    author: 'Austin Kleon',
  },
  {
    text: 'Life isn’t about finding yourself. Life is about creating yourself.',
    author: 'George Bernard Shaw',
  },
  {
    text:
      'Richness does not lie in the abundance of (worldly) goods but richness is the richness of the soul (heart, self).',
    author: 'Prophet Muhammed',
  },
  {
    text:
      'Opportunity does not knock, it presents itself when you beat down the door.',
    author: 'Kyle Chandler',
  },
  {
    text:
      "There is only one corner of the universe you can be certain of improving, and that's your own self.",
    author: 'Aldous Huxley',
  },
  {
    text:
      "You don't have to be great to start, but you have to start to be great.",
    author: 'Zig Ziglar',
  },
  {
    text: "You miss 100 percent of the shots you don't take.",
    author: 'Wayne Gretzky',
  },
  {
    text:
      'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
  },
  {
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
  },
]

let colors = [
  '#d291bc',
  '#679b9b',
  '#1b6ca8',
  '#303960',
  '#7c3c21',
  '#ad6989',
  '#6a097d',
  '#ffb367',
  '#708160',
  '#b49c73',
  '#035aa6',
  '#f6d743',
  '#6886c5',
  '#ad6989',
]

ReactDOM.render(
  <QuoteBox quotes={quotes} />,
  document.getElementById('quote-box')
)
