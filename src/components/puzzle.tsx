import { useState, useRef, createContext } from 'react';
import { PuzzleMonitor } from './puzzle-monitor.jsx';
import { CheckAnswerButton } from './check-answer.jsx';
import { ClueList } from './clue-list.jsx';
import { PuzzleHeader } from './puzzle-header.jsx';
import { InputGrid } from './input-grid.jsx';
import type { Puzzle as IPuzzle } from '../index.ts';

export const InputContext = createContext({});
export const HoverContext = createContext([]);

export const Puzzle = ({
	title,
	description,
	instructions,
	solution,
	clues,
	options,
}: IPuzzle) => {
	const [input, setInput] = useState({});
	const [hover, setHover] = useState([]);
	const ref = useRef(null);

	return (
		<InputContext value={ input } >
			<HoverContext value={ hover }>
				<div ref={ref} className="logic-puzzle">
					<PuzzleHeader {...{ title, description, instructions }} />
					<ClueList {...{ ref, clues, setHover }} />
					<InputGrid {...{ options, setHover, setInput }} />
					<PuzzleMonitor {...{ options }} />
					<CheckAnswerButton {...{ solution, options }} />
				</div>
			</HoverContext>
		</InputContext>
	);
};
