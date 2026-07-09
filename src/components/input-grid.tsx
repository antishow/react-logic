import { useContext } from 'react';
import type { PuzzleOption } from '../index.ts';

import { HoverContext, InputContext } from './puzzle.tsx';
import { LabelGroup } from './label-group.tsx';
import { CellGroup } from './cell-group.tsx';
import { Orientation } from './label-group.tsx';

type InputGridProps = {
	options: Array<PuzzleOption>,
	setHover: Function,
	setInput: Function,
};

export const InputGrid = ({ options, setHover, setInput }: InputGridProps) => {
	const input = useContext<Record<string, number>>(InputContext);
	const hover = useContext(HoverContext);
	
	const keys = options.map((O) => O.name);
	const columns: string[] = [];
	const rows: string[] = [];

	for (let n = 1; n < keys.length; n++) {
		columns.push(keys[n]);
	}

	for (let n = 0; n < keys.length - 1; n++) {
		if (n === 0) {
			rows.push(keys[n]);
		} else {
			rows.push(keys[keys.length - n]);
		}
	}

	return (
		<div className="logic-puzzle-input-grid">
			<div className="logic-puzzle-input-grid__corner"></div>
			<div className="logic-puzzle-input-grid__columns">
				{columns.map((c, n) => (
					<LabelGroup
						key={ n }
						name={ c }
						title={ options.find((O) => O.name === c)?.label || 'Untitled' }
						labels={ options.find((O) => O.name === c)?.values || [] }
						onHoverLabel={ (name: string) => setHover( [ name ] ) }
						orientation={ Orientation.Column }
					/>
				))}
			</div>

			<div className="logic-puzzle-input-grid__rows">
				{rows.map((r, n) => (
					<LabelGroup
						key={ n }
						name={ r }
						title={ options.find((O) => O.name === r)?.label || 'Untitled' }
						labels={ options.find((O) => O.name === r)?.values || [] }
						onHoverLabel={ (name: string) => setHover( [ name ] ) }
						orientation={ Orientation.Row }
					/>
				))}
			</div>

			<div className="logic-puzzle-input-grid__cells">
				{' '}
				{rows.map((r, i) => (
					<div key={i} className="logic-puzzle-input-grid__cells-row">
						{columns.map((c, j) => {
							if (i + j >= options.length - 1) {
								return;
							}

							const rowOption = options.find((O) => O.name === r);
							const columnOption = options.find((O) => O.name === c);

							if (!rowOption || !columnOption) {
								return;
							}

							return (
								<CellGroup
									key={`group-${i}-${j}`}
									row={rowOption}
									column={columnOption}
									setHover={setHover}
									onClickCell={(cellID: string) => {
										const inputCells = Object.keys(input);

										if (inputCells.includes(cellID)) {
											setInput({
												...input,
												[cellID]: (input[cellID] + 1) % 3,
											});
										} else {
											setInput({ ...input, [cellID]: 1 });
										}
									}}
								/>
							);
						})}
					</div>
				))}{' '}
			</div>
		</div>
	);
};
