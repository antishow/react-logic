# React Logic

This is a ReactJS component that displays an interactive, grid-based logic puzzle. It includes the display for the story, instructions, clues, the grid of course, and then also an "input monitor" that displays the grid's input state in a table format, and finally the button to check the answer. It will dispatch events to the document on either a correct or incorrect guess, but responding to those events is on you!

## First, a Warning

This repo was really just built for personal use and has changed shape a lot over the course of time. It's poorly documented and probably full of holes or weird code that isn't The Proper React Way. I am an old web dev _(as in, a human being)_ that is using this as a way to learn Typescript and React with something besides a productivity tracker. You are welcome to clone and use it however you like, it does work, and I've pushed [a bunch of puzzles up to itch.io](https://antishow.itch.io/) with it, but you're probably going to be like _“This thing sucks!”_. Sorry! I'm sure it'll be better next time if you ever come back, I have been picking away at this thing for literally years now; [here's the original vanilla JS version I wrote on CodePen in Janurary 2023](https://codepen.io/antishow/pen/RwBZxGb).

## Quick Start

Being a text-based puzzle, it's pretty much just a lot of strings to set, so I like to use a [json file matching the shape of the PuzzleProps type](src/example.json). Import the component and the json, then pass the latter into the former. Now register a pair of event listeners on your document for `puzzle_wrong` and `puzzle_solved` and have those callbacks do whatever you want to happen when the user enters a guess.

```js
import examplePuzzle from './example.json';
import Puzzle from '@antishow/react-logic';
import '@antishow/react-logic/style.css';

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

Instead, run this locally and enter the correct solution there. If you inspect the PuzzleMonitor element using your browser tools you'll see a `data-input` attribute with the hash for that input. Just save that value!

## Styling

### Styling the Input Grid

The CSS for the input grid is driven by a set of custom properties applied at the :root level so it should be very easy to override whatever you need. Of course you can also just add your own style declarations for the selectors in style.css, but there's not much in there besides the grid layout.

```css
:root {
	--puzzle--font-size: 14px;
	--puzzle--clue-size: 14px;
	--puzzle--mark-size: 14px;
	--puzzle--void-size: 100px;
	--puzzle--grid-size: 20px;
	--puzzle--padding-size: 6px;
	--puzzle--border-width: 1px;
	--puzzle--border-color: #000;
	--puzzle--text-color: #000;
	--puzzle--background-color: #fff;
	--puzzle--hover-color: #eee;
	--puzzle--true-color: #070;
	--puzzle--false-color: #f33;
}
```

### Styling Individual Cells

The cell element is `.logic-puzzle-input-grid__cell`, and like I mentioned above will come with the styles already written. There are also a few extra helpful attributes so you can customize your cell style to its current state or the values it represents. Since each cell represents the intersection of a Row and Column, they all have a pair of 'value attributes' attached to their element dataset.

Going by the example.json file, the very first cell on the first row would be where `Name: Tom` and `Color: Red` intersect, so the html element in-browser will have `data-name="Tom"` and `data-color="Red"` attributes and you can use css selectors like `[data-name]`, `[data-color='Blue']`, or `[data-name='Tom'][data-color='Red']` depending on how specific you're trying to be.

There's also a `data-status` attribute to show that cell's current status. `0` means the cell is empty, `1` means that it has been marked as False, and `2` means that it has been marked as True.

Finally, the component itself will add class names to the cells depending on their status and also the status of the other cells in the puzzle or what the user is doing:

- **input-status--explicit-true**  
  No big surprise here, this means that the user has marked the cell as true. Generally speaking in normal puzzles this would just be the same as `[data-status=2]`, but it's possible to have multiple truthy values.
- **input-status--explicit-false**  
  Similar idea, but for false. This differentiates between cells that have been intentionally marked as false by the user, and those that are just empty or...
- **implicit-false**
  If there's another cell marked as True in the same row or column, then this one can't _also_ be True, so the implicit-false class is added to the empty cell.

### Hover Effects

There's an internal context variable called `hover`. Whenever the user hovers on a cell or label that is tied to a bit of data from the puzzle, this property is set to a list of all of the _key/value pairs_ represented by the thing being hovered. When all of those cells and labels are being rendered if they have a matching key/value pair, they get an extra `key-hover` css class. Or in short, when you hover over a cell in a row or column, it and all of the other cells in the same row and same column will get the hover class.

But wait, there's more! You can also use an `em` tag in Clue text to apply the same key/value pair association. Same as the others, when the user hovers the em element the key-hover class is added to all corresponding cells and labels in the puzzle. For example given the clue: `The <em data-animal="Cat">Cat</em> badge is <em data-shape="Square">Square</em>`, when the User hovers over the word `Cat`, all Cat Cells and Labels in the Puzzle will get the key-hover class.
