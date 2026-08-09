import type { PuzzleOption } from './puzzle.tsx';
import { useContext } from 'react';
import { normalizePuzzleInput, cyrb53 } from '../helpers.ts';
import { InputContext } from './puzzle.tsx';

export type RenderMonitorProps = {
	options: PuzzleOption[];
	input: any;
	setInput?: Function;
};

type PuzzleMonitorProps = {
	options: PuzzleOption[];
	setInput?: Function;
	RenderMonitor?: React.ComponentType<RenderMonitorProps>;
};

const BasicPuzzleTable = (props: RenderMonitorProps) => {
	const { input, options } = props;
	const normalizedInput = normalizePuzzleInput({ input, options });
	const inputStr = cyrb53(JSON.stringify(normalizedInput));

	return (
		<div data-input={inputStr} className="logic-puzzle-monitor">
			<table>
				<thead>
					<tr>
						{options.map((O, i) => (
							<th key={i} data-name={O.name}>
								{O.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{normalizedInput.map((row, i) => {
						return (
							<tr key={i}>
								{Object.keys(row).map((k, j) => (
									<td key={j} data-name={k}>
										{row[k]}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export const PuzzleMonitor = (props: PuzzleMonitorProps) => {
	const { options, setInput, RenderMonitor } = props;
	const input = useContext(InputContext);

	if (!RenderMonitor) {
		return <BasicPuzzleTable {...{ input, options }} />;
	}

	return <RenderMonitor {...{ input, setInput, options }} />;
};
