/*This Markdown Previewer is made using React, Redux, Bootstrap, and custom CSS. This being a Codepen project. All componets had to be named in one js file. CodePen: https://codepen.io/jtoaha/pen/XWmvpVy?editors=0110*/

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
  }

  handleChange(event) {
    let parsed = marked(event.target.value);
    this.props.addParsedMessage(parsed);
    console.log(this.props.parsed)
  }

  render() {
    return (
      <div id='editor-section'>
        <div id='editor-container'>
          <h2>Markdown Editor</h2>
          <textarea
            onChange={this.handleChange}
            placeholder='apples'
            id='editor'
            defaultValue=
             {`# This is Heading 1 text
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
> "Start where you are. Use what you have. Do what you can." –Arthur Ashe `} >

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
          <div id='preview'
          dangerouslySetInnerHTML={{ __html: this.props.parsed }}
          >

          </div>
        </div>
      </div>
    )
  }
}

const Whole = (props) => {
  return (
    <React.Fragment>
      <Editor props={props} />
      <Preview props={props} />
    </React.Fragment>
  )
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

