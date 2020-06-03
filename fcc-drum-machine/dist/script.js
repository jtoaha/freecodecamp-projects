// !! IMPORTANT README:

// You may add additional external JS and CSS as needed to complete the project, however the current external resource MUST remain in place for the tests to work. BABEL must also be left in place.

/***********
INSTRUCTIONS:
  - Select the project you would
    like to complete from the dropdown
    menu.
  - Click the "RUN TESTS" button to
    run the tests against the blank
    pen.
  - Click the "TESTS" button to see
    the individual test cases.
    (should all be failing at first)
  - Start coding! As you fulfill each
    test case, you will see them go
    from red to green.
  - As you start to build out your
    project, when tests are failing,
    you should get helpful errors
    along the way!
    ************/

// PLEASE NOTE: Adding global style rules using the * selector, or by adding rules to body {..} or html {..}, or to all elements within body or html, i.e. h1 {..}, has the potential to pollute the test suite's CSS. Try adding: * { color: red }, for a quick example!

// Once you have read the above messages, you can delete all comments.

var test

const soundFiles = [
  {
    id: 'Q',
    keycodeValue: 81,
    url:
      'https://www.dropbox.com/s/vbevt8aicdavbop/Bigbeat_-Mach_New-7662_hifi.mp3?raw=1',
    description: 'Bigbeat Mach New 7662 hifi',
  },
  {
    id: 'W',
    keycodeValue: 87,
    url:
      'https://www.dropbox.com/s/zu0a5u08exhi9kx/Dull_Dru-Public_D-260_hifi.mp3?raw=1',
    description: 'Dull Dru Public D-260 hifi',
  },
  {
    id: 'E',
    keycodeValue: 69,
    url:
      'https://www.dropbox.com/s/nl4ysdskgqoborl/idg_Bass-intermed-2205_hifi.mp3?raw=1',
    description: 'IDG Bass Intermed 2205 hifi',
  },
  {
    id: 'A',
    keycodeValue: '65',
    url:
      'https://www.dropbox.com/s/739t4lt2zaddm9a/idg_bong-intermed-1682_hifi.mp3?raw=1',
    description: 'IDG Bong Intermed 1682 hifi',
  },
  {
    id: 'S',
    keycodeValue: '83',
    url:
      'https://www.dropbox.com/s/58qp6j5r1okekoo/idg_HipH-intermed-1982_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 1982 hifi',
  },
  {
    id: 'D',
    keycodeValue: '68',
    url:
      'https://www.dropbox.com/s/3t5ryrkt5dq26gb/idg_HipH-intermed-2220_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2220 hifi',
  },
  {
    id: 'Z',
    keycodeValue: '90',
    url:
      'https://www.dropbox.com/s/i9smjs55r3cju6x/idg_HipH-intermed-2222_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2222 hifi',
  },
  {
    id: 'X',
    keycodeValue: '88',
    url:
      'https://www.dropbox.com/s/i9smjs55r3cju6x/idg_HipH-intermed-2222_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2222 hifi',
  },
  {
    id: 'C',
    keycodeValue: '67',
    url:
      'https://www.dropbox.com/s/i9smjs55r3cju6x/idg_HipH-intermed-2222_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2222 hifi',
  },
]

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
  }

  handleChange(event) {}

  componentDidMount(prevProps, prevState) {
    $(`#sound${this.props.soundFile.id}`).on('click', () => {
      document.getElementById(this.props.soundFile.id).play()
    })

    $(`body`).keydown((event) => {
      var keycode = event.keyCode;
      console.log(keycode)
      console.log(event.which)
      if(keycode == this.props.soundFile.keycodeValue)
       document.getElementById(this.props.soundFile.id).play()
    })
  }

  render() {
    return (
      <button className='drum-pad' id={`sound${this.props.soundFile.id}`}>
        {this.props.soundFile.id}
        <audio
          id={this.props.soundFile.id}
          className='clip'
          src={this.props.soundFile.url}
          type='audio/mpeg'
        ></audio>
      </button>
    )
  }
}

//To display description of the most recent sound byte that was clicked
const Display = (props) => {
  return <h2 id='display'>Placeholder Text</h2>
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {}
  }

  handleChange(event) {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <span>
        <h1 id='main-title'>Drum Machine</h1>
        <Display />
        {this.props.soundFiles.map((soundFile) => (
          <DrumPad key={soundFile.id} soundFile={soundFile} />
        ))}
      </span>
    )
  }
}

ReactDOM.render(
  <DrumMachine soundFiles={soundFiles} />,
  document.getElementById('drum-machine')
)
