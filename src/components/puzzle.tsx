import { useState, createContext } from 'react';
import { PuzzleMonitor } from './puzzle-monitor.jsx';
import { CheckAnswerButton } from './check-answer.jsx';
import { ClueList } from './clue-list.jsx';
import { PuzzleHeader } from './puzzle-header.jsx';
import { InputGrid } from './input-grid.jsx';

import type { RenderMonitorProps } from './puzzle-monitor.jsx';

export const InputContext = createContext<Record<string, number>>({});
export const HoverContext = createContext<string[]>([]);

export type PuzzleOption = {
	label: string;
	name: string;
	values: string[];
};

export type PuzzleProps = {
	title: string;
	id: string;
	savedInput: any | null;
	description: string;
	instructions: string;
	solution: number;
	clues: string[];
	options: PuzzleOption[];
	RenderPuzzleMonitor?: React.ComponentType<RenderMonitorProps>;
};

export const Puzzle = ({
	title,
	id,
	savedInput,
	description,
	instructions,
	solution,
	clues,
	options,
	RenderPuzzleMonitor,
}: PuzzleProps) => {
	const [input, _setInput] = useState(savedInput ?? {});
	const [hover, setHover] = useState([]);

	const setInput = (newInput: any) => {
		window.localStorage.setItem(
			`puzzle-input-(${id})`,
			JSON.stringify(newInput)
		);

		return _setInput(newInput);
	};

	return (
		<InputContext value={input}>
			<HoverContext value={hover}>
				<div className="logic-puzzle">
					<PuzzleHeader {...{ title, id, description, instructions }} />
					<ClueList {...{ clues, setHover }} />
					<InputGrid {...{ options, setHover, setInput }} />
					<PuzzleMonitor
						{...{ options, setInput, RenderMonitor: RenderPuzzleMonitor }}
					/>
					<CheckAnswerButton {...{ solution, options }} />
				</div>
			</HoverContext>
		</InputContext>
	);
};
