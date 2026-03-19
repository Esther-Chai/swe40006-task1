type DisplayProps = {
  expression: string
  value: string
}

export default function Display({ expression, value }: DisplayProps): React.JSX.Element {
  return (
    <div className="display">
      <div className="expression">{expression}</div>
      <div className="main-display">{value}</div>
    </div>
  )
}
