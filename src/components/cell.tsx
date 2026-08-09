import { useContext } from 'react';
import { HoverContext, InputContext } from './puzzle';
import { applyFilters } from '@antishow/hooks';

type CellProps = {
	rowName: string;
	rowValue: string;
	columnName: string;
	columnValue: string;
	onClickCell: Function;
	setHover: Function;
};

type NeighborList = {
	row: string[];
	column: string[];
};

const INPUT_STATUS = ['empty', 'explicit-false', 'explicit-true'];

export const Cell = (props: CellProps) => {
	const { rowName, rowValue, columnName, columnValue, onClickCell, setHover } =
		props;

	const hover = useContext(HoverContext);
	const input = useContext(InputContext);

	const cellID = `${rowName}___${rowValue},${columnName}___${columnValue}`;
	const inputStatusIndex = input[cellID] || 0;
	const inputStatusOptions = applyFilters(
		'reactLogic.inputStatusOptions',
		INPUT_STATUS,
		{ rowName, rowValue, columnName, columnValue }
	);
	const inputStatus = inputStatusOptions[inputStatusIndex];

	const cellProps = {
		[`data-${rowName}`]: rowValue,
		[`data-${columnName}`]: columnValue,
		[`data-status`]: inputStatusIndex,
	};

	const className = [
		'logic-puzzle-input-grid__cell',
		`input-status--${inputStatus}`,
		hover.includes(rowValue) || hover.includes(columnValue) ? 'key-hover' : '',
	].filter((C) => C);

	const inputKeys = Object.keys(input);

	const trueNeighbors = inputKeys.reduce<NeighborList>(
		(trueNeighbors, K) => {
			if (K === cellID) {
				return trueNeighbors;
			}

			const rowMatch = new RegExp(
				`^${rowName}___${rowValue},${columnName}___.+$`
			);

			if (K.match(rowMatch) && input[K] > 1) {
				return {
					...trueNeighbors,
					row: [...trueNeighbors.row, K],
				};
			}

			const colMatch = new RegExp(
				`^${rowName}___.+,${columnName}___${columnValue}$`
			);

			if (K.match(colMatch) && input[K] > 1) {
				return {
					...trueNeighbors,
					column: [...trueNeighbors.column, K],
				};
			}

			return trueNeighbors;
		},
		{ row: [], column: [] }
	);

	const trueNeighborCount =
		trueNeighbors.row.length + trueNeighbors.column.length;

	const isImplicitlyFalse = applyFilters(
		'reactLogic.isImplicitlyFalse',
		trueNeighborCount > 0,
		{ rowName, rowValue, columnName, columnValue, trueNeighbors, input }
	);

	if (isImplicitlyFalse) {
		className.push('implicit-false');
	}

	return (
		<div
			onMouseEnter={() => setHover([rowValue, columnValue])}
			onMouseLeave={() => setHover([])}
			onClick={(e) => onClickCell(cellID, e)}
			className={className.join(' ')}
			{...cellProps}
		/>
	);
};
