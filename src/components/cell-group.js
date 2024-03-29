const INPUT_STATUS = [
  'input-status--empty',
  'input-status--explicit-false',
  'input-status--explicit-true',
];

export const CellGroup = ({ row, column, hover, onClickCell, onHoverCell, input }) => <div 
  className="logic-puzzle-input-grid__cell-group" data-row={ row.label?.toLowerCase() } data-column={ column.label?.toLowerCase() }>
  { row.values?.map((r, i) => {
    return <div key={`row-${i}`} className="logic-puzzle-input-grid__cell-group-row">
      { column.values?.map((c, j) => {
        const cellID = `${row.name}:${r},${column.name}:${c}`;
        const cellProps = {
          [`data-${row.name}`]: r,
          [`data-${column.name}`]: c,
          onClick: () => onClickCell(cellID),
        };

        const rowValue = row.values[i];
        const columnValue = column.values[j];

        const className = [ 
          'logic-puzzle-input-grid__cell', 
          INPUT_STATUS[input[cellID]],
          (Array.from(hover).includes(r) || Array.from(hover).includes(c)) ? 'key-hover' : ''
        ].filter(c => c);

        const isImplicitlyFalse = Object.keys(input).filter(inputKey => {
          if (inputKey === cellID) {
            return false;
          }

          const rowMatch = new RegExp(`^${row.name}\:${r},${column.name}\:.+$`);
          const colMatch = new RegExp(`^${row.name}\:.+,${column.name}\:${c}$`);
          return (inputKey.match(rowMatch) || inputKey.match(colMatch)) && (input[inputKey] === 2);
        }).length > 0;

        if (isImplicitlyFalse) {
          className.push('implicit-false');
        }

        return <div 
          key={`${i},${j}`} 
          onMouseEnter={ () => onHoverCell([rowValue, columnValue]) }
          onMouseLeave={ () => onHoverCell([]) }
          className={ className.join(' ') } 
          {...cellProps} 
        />
      }) }
    </div>
  }) }
</div>

