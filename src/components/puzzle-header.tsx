type PuzzleHeaderProps = {
	title: string,
	description: string,
	instructions: string,
};

export const PuzzleHeader = ({ title, description, instructions }: PuzzleHeaderProps) => (
	<div className="logic-puzzle__header">
		<div
			className="logic-puzzle__title"
			dangerouslySetInnerHTML={{ __html: title }}
		/>

		<div
			className="logic-puzzle__description"
			dangerouslySetInnerHTML={{ __html: description }}
		/>

		<div
			className="logic-puzzle__instructions"
			dangerouslySetInnerHTML={{ __html: instructions }}
		/>
	</div>
);
