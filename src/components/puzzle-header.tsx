type PuzzleHeaderProps = {
	title: string;
	id: string;
	description: string;
	instructions: string;
};

export const PuzzleHeader = ({
	title,
	id,
	description,
	instructions,
}: PuzzleHeaderProps) => (
	<div className="logic-puzzle__header">
		<div
			className="logic-puzzle__title"
			dangerouslySetInnerHTML={{ __html: title }}
		/>

		<div
			className="logic-puzzle__description"
			dangerouslySetInnerHTML={{ __html: description }}
		/>

		<dialog id={`${id}-instructions`} className="logic-puzzle__instructions">
			<div dangerouslySetInnerHTML={{ __html: instructions }} />
			<button
				onClick={() => {
					const dialog = document.getElementById(`${id}-instructions`);
					if (!dialog) {
						return;
					}
					(dialog as HTMLDialogElement).close();
				}}>
				Close
			</button>
		</dialog>
	</div>
);
