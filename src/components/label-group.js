export const LabelGroup = ({ title, name, hover, onHoverLabel, labels = [], orientation = 'row' }) => {
  return <div data-name={ name } className={`logic-puzzle__label-group orientation-${orientation}`}>
    <label className="logic-puzzle__label-group__title">{ title }</label>
    {
      Array.from(labels).map((l, key) => {
        const labelProps = { 
          key,
          [`data-${name}`]: l 
        };
        return <label className={ Array.from(hover).includes(l) ? 'key-hover' : '' } onMouseEnter={ () => onHoverLabel(l) } onMouseLeave={ () => onHoverLabel() }{...labelProps}>{ l }</label>
      })
    }
  </div>
}
