/**
Overview: This Drum Machine project sets up a drum machine user can interact with, either by:
- Pressing corresponding letter on their keyboard (i.e, Q, W, E, A, S, D, Z, X, C)
- Or simply pressing the button
Check the readme for this project for more helpful details.
-jt
06/04/20
 */
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
    keycodeValue: 83,
    url:
      'https://www.dropbox.com/s/58qp6j5r1okekoo/idg_HipH-intermed-1982_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 1982 hifi',
  },
  {
    id: 'D',
    keycodeValue: 68,
    url:
      'https://www.dropbox.com/s/3t5ryrkt5dq26gb/idg_HipH-intermed-2220_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2220 hifi',
  },
  {
    id: 'Z',
    keycodeValue: 90,
    url:
      'https://www.dropbox.com/s/i9smjs55r3cju6x/idg_HipH-intermed-2222_hifi.mp3?raw=1',
    description: 'IDG HipH Intermed 2222 hifi',
  },
  {
    id: 'X',
    keycodeValue: 88,
    url:
      'https://www.dropbox.com/s/2b6ffkgrih966kc/idg_Hi_H-intermed-2300_hifi.mp3?raw=1',
    description: 'IDG Hi H Intermed 2300 hifi',
  },
  {
    id: 'C',
    keycodeValue: 67,
    url:
      'https://www.dropbox.com/s/yok22zzavl1et4u/idg-pian-intermed-1321_hifi.mp3?raw=1',
    description: 'IDG Pian Intermed 1321 hifi',
  },
]

var randomColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'magenta',
  'cyan',
]

var randomColorIndex = 0

class DrumPad extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {}

  componentDidMount(prevProps, prevState) {
    $(`#sound${this.props.soundFile.id}`).on('mousedown', () => {
      $(`#sound${this.props.soundFile.id}`).css({
        'background-color': 'green',
        'box-shadow': '1px 5px #000',
        transform: 'translateY(4px)',
      })

      document.getElementById(this.props.soundFile.id).play()
      let currentSound = this.props.soundFile.description
      this.props.updateCurrentSound(currentSound)
    })

    $(`#sound${this.props.soundFile.id}`).on('mouseup', () => {
      $(`#sound${this.props.soundFile.id}`).css({
        'background-color': '#ff63b9',
        padding: '1em',
        'padding-right': '1.25em',
        'padding-left': '1.25em',
        margin: '.5em',
        'border-radius': '50px',
        'box-shadow': '5px 6px',
      })
    })

    $(`#sound${this.props.soundFile.id}`).on('mouseout', () => {
      $(`#sound${this.props.soundFile.id}`).css({
        'background-color': '#ff63b9',
        padding: '1em',
        'padding-right': '1.25em',
        'padding-left': '1.25em',
        margin: '.5em',
        'border-radius': '50px',
        'box-shadow': '5px 6px',
      })
    })

    $(`body`).keydown((event) => {
      var keycode = event.which
      if (keycode == this.props.soundFile.keycodeValue) {
        document.getElementById(this.props.soundFile.id).play()
        $(`#sound${this.props.soundFile.id}`).css({
          'background-color': 'green',
          'box-shadow': '1px 5px #000',
          transform: 'translateY(4px)',
        })

        let currentSound = this.props.soundFile.description
        this.props.updateCurrentSound(currentSound)
      }
    })

    $(`body`).keyup((event) => {
      var keycode = event.which

      $(`#sound${this.props.soundFile.id}`).css({
        'background-color': '#ff63b9',
        padding: '1em',
        'padding-right': '1.25em',
        'padding-left': '1.25em',
        margin: '.5em',
        'border-radius': '50px',
        'box-shadow': '5px 6px',
      })
    })
  }

  render() {
    return (
      <button
        ref={(c) => (this._drumbutton = c)}
        className={`drum-pad`}
        id={`sound${this.props.soundFile.id}`}
      >
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
  return <h2 id='display'>Display: {props.currentSound}</h2>
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.updateCurrentSound = this.updateCurrentSound.bind(this)
    this.state = {
      currentSound: ' ',
    }
  }
  updateCurrentSound(val) {
    this.setState({
      currentSound: val,
    })
  }
  handleChange(event) {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let currentSound = this.state.currentSound
    return (
      <span>
        <h1 id='main-title'>Drum Machine</h1>
        <Display currentSound={currentSound} />
        {this.props.soundFiles.map((soundFile) => (
          <DrumPad
            updateCurrentSound={this.updateCurrentSound}
            key={soundFile.id}
            soundFile={soundFile}
          />
        ))}
      </span>
    )
  }
}

ReactDOM.render(
  <DrumMachine soundFiles={soundFiles} />,
  document.getElementById('drum-machine')
)
