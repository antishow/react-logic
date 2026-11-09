# React Logic

This is a ReactJS component that displays an interactive, grid-based logic puzzle. It includes the display for the story, instructions, clues, the grid of course, and then also an "input monitor" that displays the grid's input state in a table format, and finally the button to check the answer. It will dispatch events to the document on either a correct or incorrect guess, but responding to those events is on you!

## First, a Warning

This repo was really just built for personal use and has changed shape a lot over the course of time. It's poorly documented and probably full of holes or weird code that isn't The Proper React Way. I am an old web dev _(as in, a human being)_ that is using this as a way to learn Typescript and React with something besides a productivity tracker. You are welcome to clone and use it however you like, it does work, and I've pushed [a bunch of puzzles up to itch.io](https://antishow.itch.io/) with it, but you're probably going to be like _“This thing sucks!”_. Sorry! I'm sure it'll be better next time if you ever come back, I have been picking away at this thing for literally years now.

## Quick Start

Being a text-based puzzle, it's pretty much just a lot of strings to set, so I like to use json files matching the shape of the PuzzleProps type. Import the component and the json, then pass the latter into the former. Now register a pair of event listeners on your document for `puzzle_wrong` and `puzzle_solved` and have those callbacks do whatever you want to happen when the user enters a guess.

```js
import examplePuzzle from './example.json';
import Puzzle from '@antishow/react-logic';

// I dunno your app so I'm skipping steps for brevity. You get it!
root.render(<Puzzle {...examplePuzzle} />);

document.addEventListener('puzzle_wrong', () =>
	alert('Wrong! You lose! Good day, sir!')
);

document.addEventListener('puzzle_solved', () =>
	alert('Perfect. Brilliant. You are the very best!')
);
```

## The Solution

You'll notice that the Solution is just a number and not an object that describes the solution like one might expect. I didn't want any smarty-pants _(smarty-pantses?)_ being able to just read the solution out of the in-browser javascript, so I just don't put it in there in a human-readable format.

Instead, run this locally and enter the correct solution there. If you inspect the PuzzleMonitor element using your browser tools you'll see a `data-input` attribute with the hash for that input. Just copy that value!
