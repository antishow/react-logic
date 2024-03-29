import { normalizePuzzleInput, cyrb53 } from '../helpers';

export const PuzzleMonitor = ({ prompt, input, options }) => {
  const inputRows = normalizePuzzleInput({ input, options });
  const inputStr = cyrb53(JSON.stringify(inputRows));

  return (
    <div className="logic-puzzle-monitor">
      <label className="prompt">{ prompt }</label>
      <table>
        <thead>
          <tr>
            { options.map((O, i) => <th key={i} data-name={ O.name }>{ O.label }</th>) }
          </tr>
        </thead>
        <tbody>
          { inputRows.map((row, i) => {
            return <tr key={i}>{
              Object.keys(row).map((k, j) => <td key={j} data-name={k}>{row[k]}</td>)
            }</tr>
          })}
        </tbody>
      </table>
    </div>
  );
}
