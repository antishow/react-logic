import type { PuzzleOption } from "..";

const INPUT_STATUS = [
	'input-status--empty',
	'input-status--explicit-false',
	'input-status--explicit-true',
];

type CellGroupProps = {
	row: PuzzleOption,
	column: PuzzleOption,
	hover: Array<string>,
	onClickCell: Function,
	onHoverCell: Function,
	input: Record<string, number>
};

export const CellGroup = ({
	row,
	column,
	hover,
	onClickCell,
	onHoverCell,
	input,
}: CellGroupProps) => (
	<div
		className="logic-puzzle-input-grid__cell-group"
		data-row={row.label.toLowerCase()}
		data-column={column.label.toLowerCase()}>
		{row.values?.map((r, i) => {
			return (
				<div
					key={`row-${i}`}
					className="logic-puzzle-input-grid__cell-group-row">
					{column.values?.map((c, j) => {
						const cellID = `${row.name}___${r},${column.name}___${c}`;

						const rowValue = row.values[i];
						const columnValue = column.values[j];

						const inputStatusIndex = input[cellID] || 0;
						const inputStatus = INPUT_STATUS[inputStatusIndex];

						const cellProps = {
							[`data-${row.name}`]: r,
							[`data-${column.name}`]: c,
							[`data-status`]: inputStatusIndex,
							onClick: () => onClickCell(cellID),
						};

						const className = [
							'logic-puzzle-input-grid__cell',
							inputStatus,
							hover.includes(r) || hover.includes(c)
								? 'key-hover'
								: '',
						].filter((c) => c);

						const inputKeys = Object.keys(input);
						const trueInSameRow = inputKeys.filter(K => {
							if (K === cellID) {
								return false;
							}

							const rowMatch = new RegExp(
								`^${row.name}___${r},${column.name}___.+$`
							);

							return K.match(rowMatch) && (input[K] > 1)
						});

						const trueInSameCol = inputKeys.filter(K => {
							if (K === cellID) {
								return false;
							}

							const colMatch = new RegExp(
								`^${row.name}___.+,${column.name}___${c}$`
							);

							return K.match(colMatch) && (input[K] > 1)
						});

						const trueNeighborCount = trueInSameRow.length + trueInSameCol.length;
						const isImplicitlyFalse = trueNeighborCount > 0;

						if (isImplicitlyFalse) {
							className.push('implicit-false');
						}

						return (
							<div
								key={`${i},${j}`}
								onMouseEnter={() => onHoverCell([rowValue, columnValue])}
								onMouseLeave={() => onHoverCell([])}
								className={className.join(' ')}
								{...cellProps}
							/>
						);
					})}
				</div>
			);
		})}
	</div>
);
