import { useState } from 'react'

const StatisticLine = (props) => {
  const { text, value } = props
  return (
    <tbody>
        {text === "positive"?(
          <tr>
            <td>{text}</td>
            <td>{value}%</td>
          </tr>
        ):(
          <tr>
            <td>{text}</td>
            <td>{value}</td>
          </tr>
        )}
    </tbody>
  )
}

const Statistic = (props) => {
  const { good, neutral, bad, all } = props
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={(good - bad) / all}/>
        <StatisticLine text="positive" value={good / all * 100}/>
      </table>
    </>
  )

}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => {
        setGood(good + 1)
        setAll(all + 1)
      }} text="good"/>
      <Button handleClick={() => {
        setNeutral(neutral + 1)
        setAll(all + 1)
      }} text="neutral"/>
      <Button handleClick={() => {
        setBad(bad + 1)
        setAll(all + 1)
      }} text="bad"/>
      {all === 0 ? <p>No feedback given</p> : <Statistic good={good} neutral={neutral} bad={bad} all={all} />}
    </>
  )
}

export default App
