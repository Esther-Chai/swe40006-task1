import { format } from 'date-fns'

export type HistoryEntry = {
  expression: string
  result: string
  timestamp: Date
}

type HistoryLogProps = {
  entries: HistoryEntry[]
}

export default function HistoryLog({ entries }: HistoryLogProps): React.JSX.Element {
  if (entries.length === 0) return <></>

  return (
    <div className="history">
      <div className="history-title">History</div>
      <ul className="history-list">
        {entries
          .slice()
          .reverse()
          .map((entry, i) => (
            <li key={i} className="history-item">
              <span className="history-expr">{entry.expression}</span>
              <span className="history-result">{entry.result}</span>
              <span className="history-time">{format(entry.timestamp, 'HH:mm:ss')}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
