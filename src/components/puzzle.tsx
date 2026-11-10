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
	id: string;
	title: string;
	description: string;
	instructions: string;
	solution: number;
	clues: string[];
	options: PuzzleOption[];
	RenderPuzzleMonitor?: React.ComponentType<RenderMonitorProps>;
};

export const Puzzle = ({
	id,
	title,
	description,
	instructions,
	solution,
	clues,
	options,
	RenderPuzzleMonitor,
}: PuzzleProps) => {
	const dataID = `puzzle-input-(${id})`;
	const [input, _setInput] = useState(() => {
		try {
			const savedInputString = localStorage.getItem(dataID) ?? '{}';

			return JSON.parse(savedInputString);
		} catch {
			return {};
		}
	});

	const setInput = (newInput: any) => {
		localStorage.setItem(dataID, JSON.stringify(newInput));

		return _setInput(newInput);
	};

	const [hover, setHover] = useState([]);

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
