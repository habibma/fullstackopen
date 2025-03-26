import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine  = ({text, value}) => <p>{text} {value}</p>

const Statistics = (props) => {
  if (props.all === 0){
    return <p>No feedback given</p>
  }
  else {
    return (
      <div>
      <h2>statistics</h2>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <p>all {props.all}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive} %</p>
    </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleFeedback = (feedback) => {
    let newGood = good;
    let newNeutral = neutral;
    let newBad = bad;
    if (feedback === 'good')
    {
      newGood = good + 1;
      setGood(newGood);
    }
    if (feedback === 'neutral')
    {
      newNeutral = neutral + 1;
      setNeutral(newNeutral);
    }
     if (feedback === 'bad')
    {
      newBad = bad + 1;
      setBad(newBad);
    }
    const newAll = all + 1;
    setAll(newAll)
    setAverage((newGood - newBad) / newAll)
    setPositive(newGood / newAll * 100)
  }
  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={() => handleFeedback('good')} text='good' />
      <Button onClick={() => handleFeedback('neutral')} text='neutral' />
      <Button onClick={() => handleFeedback('bad')} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </>
  )
}

export default App