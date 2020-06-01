var testing;

/*This Markdown Previewer is made using React, Bootstrap, and custom CSS. CodePen: https://codepen.io/jtoaha/pen/XWmvpVy?editors=0110*/

class Editor extends React.Component {
  constructor(props) {
    super(props)

    }


  handleClick() {
  }

  render() {
    return (
      <div id= "editor-container">
      <h2>Markdown Editor</h2>
      <textarea id="editor-textarea"></textarea>
      </div>
    )
  }
}



ReactDOM.render(
  <Editor />,
  document.getElementById('editor-section')
)

class Preview extends React.Component {
  constructor(props) {
    super(props)

    }


  handleClick() {
  }

  render() {
    return (
      <div id= "editor-container">
      <h2>Markdown Preview</h2>

      </div>
    )
  }
}

ReactDOM.render(
  <Preview />,
  document.getElementById('preview-section')
)
