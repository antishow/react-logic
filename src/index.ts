import { Puzzle } from './components/puzzle.tsx';
import './style.css';

export default Puzzle;
export type PuzzleOption = {
  label: string,
  name: string,
  values: Array<string>
}

export type Puzzle = {
  title: string,
  description: string,
  instructions: string,
  solution: number,
  clues: Array<string>,
  options: Array<PuzzleOption>
}