import { getInputHash } from '../helpers.ts';
import type { PuzzleOption } from '../index.js';

type CheckAnswerButtonProps = {
	input: Record<string, number>,
	options: Array<PuzzleOption>,
	solution: number
}

const checkAnswer = ({ input, options, solution }: CheckAnswerButtonProps) => {
	return getInputHash({ input, options }) === solution;
};

export const CheckAnswerButton = ({ input, options, solution }: CheckAnswerButtonProps) => {
	return (
		<button
			className="check-answer-button"
			onClick={() => {
				if (checkAnswer({ input, options, solution })) {
					document.dispatchEvent(new CustomEvent('puzzle_solved'));
				} else {
					document.dispatchEvent(new CustomEvent('puzzle_wrong'));
				}
			}}>
			Check Answer
		</button>
	);
};
