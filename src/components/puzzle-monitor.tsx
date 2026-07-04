import { normalizePuzzleInput, cyrb53 } from '../helpers.ts';
import type { PuzzleOption } from '../index.ts';

type PuzzleMonitorProps = {
	input: Record<string, number>,
	options: Array<PuzzleOption>
}

export const PuzzleMonitor = ({ input, options }: PuzzleMonitorProps) => {
	const inputRows = normalizePuzzleInput({ input, options });
	const inputStr = cyrb53(JSON.stringify(inputRows));

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
					{inputRows.map((row, i) => {
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
