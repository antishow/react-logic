import { LabelGroup } from './label-group';
import { CellGroup } from './cell-group';
import { PuzzleMonitor } from './puzzle-monitor.js';
import { CheckAnswerButton } from './check-answer.js';

export const Puzzle = ({ title, description, instructions, prompt, solution, clues, options, useState }) => {
  const keys = options.map(O => O.name);
  const columns = [];
  const rows = [];
  const [input, setInput] = useState([]);
  const [hover, setHover] = useState([]);

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
    <div className="logic-puzzle">
      <div
        className="logic-puzzle__header">
        <div
          className="logic-puzzle__title"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        <div
          className="logic-puzzle__description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div
        className="logic-puzzle__instructions"
        dangerouslySetInnerHTML={{ __html: instructions }}
      />

      <hr />

      <ol className="logic-puzzle__clues">{
        Array.from(clues).map((clue, n) =>
          <li
            key={n}
            className="logic-puzzle__clue"
            dangerouslySetInnerHTML={{ __html: clue }}
          />
        )
      }</ol>

      <div className="logic-puzzle-input-grid">
        <div className="logic-puzzle-input-grid__corner"></div>
        <div className="logic-puzzle-input-grid__columns">
          {
            columns.map((c, n) => <LabelGroup
              key={n}
              name={c}
              hover={hover}
              title={options.find(O => O.name === c).label}
              labels={options.find(O => O.name === c).values}
              onHoverLabel={(name) => setHover([name])}
              orientation="column"
            />)
          }
        </div>

        <div className="logic-puzzle-input-grid__rows">
          {
            rows.map((r, n) => <LabelGroup
              key={n}
              name={r}
              hover={hover}
              title={options.find(O => O.name === r).label}
              labels={options.find(O => O.name === r).values}
              onHoverLabel={(name) => setHover([name])}
              orientation="row"
            />)
          }
        </div>

        <div className="logic-puzzle-input-grid__cells"> {
          rows.map((r, i) => <div key={i} className="logic-puzzle-input-grid__cells-row">{
            columns.map((c, j) => {
              if (i + j >= options.length - 1) {
                return;
              }

              const rowOption = options.find(O => O.name === r);
              const columnOption = options.find(O => O.name === c);

              return <CellGroup
                key={`group-${i}-${j}`}
                row={rowOption}
                column={columnOption}
                hover={hover}
                input={input}
                onClickCell={(cellID) => {
                  const inputCells = Object.keys(input);

                  if (inputCells.includes(cellID)) {
                    setInput({
                      ...input,
                      [cellID]: (input[cellID] + 1) % 3
                    })
                  } else {
                    setInput({ ...input, [cellID]: 1 })
                  }
                }}
                onHoverCell={(hover) => setHover(hover)}
              />
            })}
          </div>)
        } </div>
      </div>

      <hr />

      <PuzzleMonitor prompt={prompt} input={input} options={options} />

      <CheckAnswerButton input={input} options={options} solution={solution} />
    </div>
  )
}
