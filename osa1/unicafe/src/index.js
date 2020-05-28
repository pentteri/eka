import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}
  </button>
)

const StatisticsLine = (props) => {
  return ( <tr><td>{props.text}</td><td>{props.value}</td></tr> )
}


const Statistics = (props) => {
  const count = props.good + props.bad + props.neutral
  if (count) {  
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text='good' value={props.good}/>
            <StatisticsLine text='neutral' value={props.neutral}/>
            <StatisticsLine text='bad' value={props.bad}/>
            <StatisticsLine text='all' value={count}/>
            <StatisticsLine text='average' value={(props.good - props.bad)/count}/>
            <StatisticsLine text='positive' value={`${100 * props.good / count} %`} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good+1)} />
      <Button text='neutral' handleClick={() => setNeutral(neutral+1)}/>
      <Button text='bad' handleClick={() => setBad(bad+1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)