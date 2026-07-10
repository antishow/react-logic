import { useContext } from 'react';
import { HoverContext } from './puzzle';

export const Orientation = {
	Column: 'column',
	Row: 'row',
} as const;

export type Orientation = (typeof Orientation)[keyof typeof Orientation];

type LabelGroupProps = {
	title: string;
	name: string;
	onHoverLabel: Function;
	labels: string[];
	orientation: Orientation;
};

export const LabelGroup = ({
	title,
	name,
	onHoverLabel,
	labels = [],
	orientation = Orientation.Row,
}: LabelGroupProps) => {
	const hover = useContext(HoverContext);

	return (
		<div
			data-name={name}
			className={`logic-puzzle__label-group orientation-${orientation}`}>
			<label className="logic-puzzle__label-group__title">{title}</label>
			{labels.map((label, n) => {
				const labelProps = { [`data-${name}`]: label };

				return (
					<label
						className={hover.includes(label) ? 'key-hover' : ''}
						onMouseEnter={() => onHoverLabel(label)}
						onMouseLeave={() => onHoverLabel()}
						key={n}
						{...labelProps}>
						{label}
					</label>
				);
			})}
		</div>
	);
};
