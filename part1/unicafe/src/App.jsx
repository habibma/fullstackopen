import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </>
  )
}

export default App