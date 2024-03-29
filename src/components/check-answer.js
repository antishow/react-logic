import { getInputHash } from '../helpers.js';

const checkAnswer = ({ input, options, solution }) => {
  const inputHash = getInputHash({ input, options });

  return inputHash === parseInt(solution);
}

export const CheckAnswerButton = ({ input, options, solution }) => {
  return <button
    className="check-answer-button"
    onClick={() => {
      if (checkAnswer({ input, options, solution })) {
        document.dispatchEvent(new CustomEvent('puzzle_solved'));
      } else {
        document.dispatchEvent(new CustomEvent('puzzle_wrong'));
      }
    }}>Check Answer</button>
}
