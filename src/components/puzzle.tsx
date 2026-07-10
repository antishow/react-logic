import { useState, createContext } from 'react';
import { PuzzleMonitor } from './puzzle-monitor.jsx';
import { CheckAnswerButton } from './check-answer.jsx';
import { ClueList } from './clue-list.jsx';
import { PuzzleHeader } from './puzzle-header.jsx';
import { InputGrid } from './input-grid.jsx';

export const InputContext = createContext<Record<string, number>>({});
export const HoverContext = createContext<string[]>([]);

export type PuzzleOption = {
	label: string;
	name: string;
	values: string[];
};

export type PuzzleProps = {
	title: string;
	description: string;
	instructions: string;
	solution: number;
	clues: string[];
	options: PuzzleOption[];
};

export const Puzzle = ({
	title,
	description,
	instructions,
	solution,
	clues,
	options,
}: PuzzleProps) => {
	const [input, setInput] = useState({});
	const [hover, setHover] = useState([]);

	return (
		<InputContext value={input}>
			<HoverContext value={hover}>
				<div className="logic-puzzle">
					<PuzzleHeader {...{ title, description, instructions }} />
					<ClueList {...{ clues, setHover }} />
					<InputGrid {...{ options, setHover, setInput }} />
					<PuzzleMonitor {...{ options }} />
					<CheckAnswerButton {...{ solution, options }} />
				</div>
			</HoverContext>
		</InputContext>
	);
};
