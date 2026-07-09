import type { PuzzleOption } from '..';
import { Cell } from './cell';

type CellGroupProps = {
	row: PuzzleOption;
	column: PuzzleOption;
	onClickCell: Function;
	setHover: Function;
};

export const CellGroup = ({
	row,
	column,
	onClickCell,
	setHover,
}: CellGroupProps) => (
	<div
		className="logic-puzzle-input-grid__cell-group"
		data-row={row.label.toLowerCase()}
		data-column={column.label.toLowerCase()}>
		{row.values?.map((rowValue, i) => {
			return (
				<div
					key={`row-${i}`}
					className="logic-puzzle-input-grid__cell-group-row">
					{column.values?.map((columnValue, j) => (
						<Cell
							key={`${i},${j}`}
							rowName={row.name}
							rowValue={rowValue}
							columnName={column.name}
							columnValue={columnValue}
							onClick={onClickCell}
							setHover={setHover}
						/>
					))}
				</div>
			);
		})}
	</div>
);
