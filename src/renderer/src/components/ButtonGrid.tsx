const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
]

const OPERATORS = ['+', '−', '×', '÷']

type ButtonGridProps = {
  onButton: (btn: string) => void
}

export default function ButtonGrid({ onButton }: ButtonGridProps): React.JSX.Element {
  return (
    <div className="buttons">
      {buttons.map((row, i) => (
        <div key={i} className="row">
          {row.map((btn) => (
            <button
              key={btn}
              className={[
                'btn',
                OPERATORS.includes(btn) || btn === '=' ? 'btn-operator' : '',
                btn === 'C' || btn === '±' || btn === '%' ? 'btn-function' : '',
                btn === '0' ? 'btn-zero' : ''
              ]
                .join(' ')
                .trim()}
              onClick={() => onButton(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
