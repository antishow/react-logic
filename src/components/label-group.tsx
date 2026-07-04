export enum Orientation {
	Column = 'column',
	Row = 'row',
}

type LabelGroupProps = {
	title: string,
	name: string,
	hover: Array<string>,
	onHoverLabel: Function,
	labels: Array<string>,
	orientation: Orientation
}

export const LabelGroup = ({
	title,
	name,
	hover,
	onHoverLabel,
	labels = [],
	orientation = Orientation.Row,
}: LabelGroupProps) => {
	return (
		<div
			data-name={name}
			className={`logic-puzzle__label-group orientation-${orientation}`}>
			<label className="logic-puzzle__label-group__title">{title}</label>
			{Array.from(labels).map((l, key) => {
				const labelProps = { [`data-${name}`]: l };

				return (
					<label
						className={Array.from(hover).includes(l) ? 'key-hover' : ''}
						onMouseEnter={() => onHoverLabel(l)}
						onMouseLeave={() => onHoverLabel()}
						key={key}
						{...labelProps}>
						{l}
					</label>
				);
			})}
		</div>
	);
};
