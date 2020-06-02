/*This Markdown Previewer is made using React, Redux, Bootstrap, and custom CSS. This being a Codepen project. All componets had to be named in one js file. CodePen: https://codepen.io/jtoaha/pen/XWmvpVy?editors=0110*/
marked.setOptions({
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});


//Redux
// Redux:
const ADD = 'ADD';

const addMarkdown = (parsed) => {
  return {
    type: ADD,
    parsed: parsed
  }
};

const initialState = {
  parsed: ""
}
const markdownReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {...state, parsed: action.parsed};
    default:
      return state;
  }
};

const store = Redux.createStore(markdownReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      defaultTextArea:
`Write some markdown style text and see it be rendered in the Preview Section.
# This is Heading 1 text
## This is Heading 2 text
- First item
- Second item
- Third item
[https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)
![Image](https://i.ibb.co/3mRnBhv/Screen-Shot-2020-05-14-at-1-30-37-PM.png)

 __Bolded Text__
\` inline code \`

\`\`\`
print("Hello World!")
\`\`\`
> "Start where you are. Use what you have. Do what you can." –Arthur Ashe `
    }
    let parsed = marked(this.state.defaultTextArea);
    this.props.addParsedMessage(parsed);

  }

  handleChange(event) {
    let parsed = marked(event.target.value);
    this.props.addParsedMessage(parsed);
  }

  //Allows autofocus of textarea element
  componentDidUpdate(prevProps, prevState) {
    this._input.focus();
  }

  render() {
    return (
      <div id='editor-section'>
        <div id='editor-container'>
          <h2>Markdown Editor</h2>
          <hr/>
          <textarea
            ref={c => (this._input = c)}
            onChange={this.handleChange}
            placeholder='Write some markdown style text'
            id='editor'
            defaultValue=
             {this.state.defaultTextArea} >

          </textarea>
        </div>
      </div>
    )
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick() {

  }

  render() {
    return (
      <div id='preview-section'>
        <div id='preview-container'>
          <h2>Markdown Preview</h2>
          <hr/>
          <div id='preview'
          dangerouslySetInnerHTML={{ __html: this.props.parsed }}
          >

          </div>
        </div>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {parsed: state.parsed}
};

const mapDispatchToProps = (dispatch) => {
  return {
    addParsedMessage: (parsed) => {
      dispatch(addMarkdown(parsed))
    }
  }
};

const Container1 = connect(mapStateToProps, mapDispatchToProps)(Editor);
const Container2 = connect(mapStateToProps, mapDispatchToProps)(Preview);



class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container1/>
        <Container2/>
      </Provider>
    );
  }
};

ReactDOM.render(<AppWrapper />, document.getElementById('whole'))

