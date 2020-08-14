# Project: Pomodoro Clock built with React.js

A Pen created on CodePen.io. Original URL: [https://codepen.io/jtoaha/pen/eYZNpMj](https://codepen.io/jtoaha/pen/eYZNpMj).

  Built a Pomodoro Clock that alternates alternates between Session and Break modes. Built using React.js. Page layout implemented with CSS Grid. Further vanilla CSS was added to refine look. A bit of JQuery was also used to play sound files.

  NOTE: As this is a project originally meant to be displayed on CodePen, all React Components needed to be placed in a single file.

- Timer alternates between a Break mode (default: 25 minutes) and a Session mode (default: 5 minutes). A beep audio file is played when either session ends. (Audio file is played for one second keeping user experience in mind)
- Initally used JQuery to update timer-field, then switched to updating over to using React's built-in state object
- Makes use of the moment.js library to work with time values. (It does not support the value of 60, so manually adjusted usage for that edge case.)
- Does use a bit of JQuery by getting audio element so sound file (beep) can be played
- Responsive web page designed with CSS Grid layout
