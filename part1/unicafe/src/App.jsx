import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral

  if (total === 0) {
    return <p>No feedback collected</p>
  }

  const average = (good - bad) / total
  const percentage = (good / total) * 100

  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={percentage} />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increment = (setter, value) => () => {
    setter(value + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={increment(setGood, good)} text="good" />
        <Button onClick={increment(setNeutral, neutral)} text="neutral" />
        <Button onClick={increment(setBad, bad)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
