# FCC- Markdown Previewer

A Pen created on CodePen.io. Original URL: [https://codepen.io/jtoaha/pen/zYrOGqK](https://codepen.io/jtoaha/pen/zYrOGqK).

This Markdown Previewer was built as a project for the Free Code Camp Front End Libraries Track. It is implemented using React, React-Redux, Marked.js library (parses text to corresponding html format) and vanilla CSS. This being a Codepen project, all components had to be placed in one js file.

Overview of project:
This project is divided into two sections, which are housed in 2 seperate React components.
- One is the editor section, where users can enter text using Markdown syntax.
- The second section is the preview section, which shows the resulting formatted text.

Both sections are linked to a single Redux store. So that when the state (user text input in the editor) changes, the preview format is automatically updated as well.

Misc Features: Editor section textarea is autofocused. Vanilla CSS: The 2 sections are placed in scrollable divs in a single fixed container. Minamalist aesthetic.

-jt
