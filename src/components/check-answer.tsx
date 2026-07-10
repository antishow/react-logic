import type { PuzzleOption } from './puzzle.tsx';
import { useContext } from 'react';
import { getInputHash } from '../helpers.ts';
import { InputContext } from './puzzle.tsx';

type CheckAnswerButtonProps = {
	options: PuzzleOption[];
	solution: number;
};

export const CheckAnswerButton = ({
	options,
	solution,
}: CheckAnswerButtonProps) => {
	const input = useContext(InputContext);

	return (
		<button
			className="check-answer-button"
			onClick={() => {
				const inputHash = getInputHash({ input, options });
				const dispatch =
					inputHash === solution ? 'puzzle_solved' : 'puzzle_wrong';

				document.dispatchEvent(new CustomEvent(dispatch));
			}}>
			Check Answer
		</button>
	);
};
