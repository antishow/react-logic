import { useEffect } from 'react';

type ClueListProps = {
	ref: any,
	clues: Array<string>,
	hover: Array<string>,
	setHover: Function,
};

export const ClueList = ({ ref, clues, hover, setHover }: ClueListProps) => {
	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const clues: HTMLElement = ref.current.querySelector('.logic-puzzle__clues');
		const emText: Array<HTMLElement> = Array.from(clues.querySelectorAll('em'));

		const handleMouseOver = (e: MouseEvent) => {
			if (!emText.includes(e.target as HTMLElement)) {
				return;
			}

			const clue: HTMLElement = e.target as HTMLElement;
			const value = Object.values(clue.dataset);
			const strValue = value.join(',');

			if (hover.join(',') === strValue) {
				return;
			}

			setHover(value);
			const handleMouseMove = (move: MouseEvent) => {
				const target = move.target as HTMLElement;
				
				if (Object.values(target.dataset).join(',') === strValue) {
					return;
				}

				setHover([]);
				document.removeEventListener('mousemove', handleMouseMove);
			};
			document.addEventListener('mousemove', handleMouseMove);
		};

		clues.addEventListener('mouseover', handleMouseOver);
		return () => {
			clues.removeEventListener('mouseover', handleMouseOver);
		};
	});

	return (
		<ol className="logic-puzzle__clues">
			{Array.from(clues).map((clue, n) => (
				<li
					key={n}
					className="logic-puzzle__clue"
					dangerouslySetInnerHTML={{ __html: clue }}
				/>
			))}
		</ol>
	);
};
