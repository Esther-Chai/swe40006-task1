import { useState } from 'react'
import Display from './components/Display'
import ButtonGrid from './components/ButtonGrid'
import HistoryLog, { HistoryEntry } from './components/HistoryLog'

const OPERATORS = ['+', '−', '×', '÷']

function evaluate(tokens: string[]): number {
  // Convert to numbers and ops, respecting × ÷ before + −
  const nums: number[] = []
  const ops: string[] = []

  tokens.forEach((t, i) => {
    if (i % 2 === 0) {
      nums.push(parseFloat(t))
    } else {
      ops.push(t)
    }
  })

  // First pass: × and ÷
  let i = 0
  while (i < ops.length) {
    if (ops[i] === '×' || ops[i] === '÷') {
      const result = ops[i] === '×' ? nums[i] * nums[i + 1] : nums[i + 1] !== 0 ? nums[i] / nums[i + 1] : 0
      nums.splice(i, 2, result)
      ops.splice(i, 1)
    } else {
      i++
    }
  }

  // Second pass: + and −
  return nums.reduce((acc, num, idx) => {
    if (idx === 0) return num
    return ops[idx - 1] === '+' ? acc + num : acc - num
  }, 0)
}

function App(): React.JSX.Element {
  const [tokens, setTokens] = useState<string[]>(['0'])
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const currentValue = tokens[tokens.length - 1]
  const isLastTokenOperator = OPERATORS.includes(currentValue)
  const display = isLastTokenOperator ? tokens[tokens.length - 2] : currentValue

  const handleButton = (btn: string): void => {
    if (btn === 'C') {
      setTokens(['0'])
      setWaitingForOperand(false)
      setExpression('')
      return
    }

    if (btn === '±') {
      if (isLastTokenOperator) return
      const val = String(parseFloat(display) * -1)
      setTokens([...tokens.slice(0, -1), val])
      return
    }

    if (btn === '%') {
      if (isLastTokenOperator) return
      const val = String(parseFloat(display) / 100)
      setTokens([...tokens.slice(0, -1), val])
      return
    }

    if (OPERATORS.includes(btn)) {
      // Replace last operator if already one
      if (isLastTokenOperator) {
        setTokens([...tokens.slice(0, -1), btn])
      } else {
        setTokens([...tokens, btn])
      }
      setWaitingForOperand(true)
      return
    }

    if (btn === '=') {
      if (tokens.length < 3 || isLastTokenOperator) return
      const fullExpr = tokens.join('')
      const result = evaluate(tokens)
      const resultStr = String(parseFloat(result.toFixed(10)))
      setExpression(fullExpr + '=')
      setTokens([resultStr])
      setWaitingForOperand(false)
      setHistory((h) => [...h, { expression: fullExpr, result: resultStr, timestamp: new Date() }])
      return
    }

    if (btn === '.') {
      if (isLastTokenOperator || waitingForOperand) {
        setTokens([...tokens, '0.'])
        setWaitingForOperand(false)
        return
      }
      if (!display.includes('.')) setTokens([...tokens.slice(0, -1), display + '.'])
      return
    }

    // Digit
    if (isLastTokenOperator || waitingForOperand) {
      setTokens([...tokens, btn])
      setWaitingForOperand(false)
    } else {
      const newVal = display === '0' ? btn : display + btn
      setTokens([...tokens.slice(0, -1), newVal])
    }
  }

  const liveExpression = expression || (tokens.length > 1 ? tokens.join('') : '')

  return (
    <div className="app-wrapper">
      <div className="calculator">
        <Display expression={liveExpression} value={display} />
        <ButtonGrid onButton={handleButton} />
      </div>
      <HistoryLog entries={history} />
    </div>
  )
}

export default App
