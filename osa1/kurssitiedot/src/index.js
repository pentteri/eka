import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h1>{props.kurssi}</h1>
  </div>
)

const Part = (props) => (
  <p>
  {props.kappale} {props.tehtavia}
</p> 
)

const Content = (props) => (
  <>
    <Part kappale = {props.parts[0].name} tehtavia = {props.parts[0].exercises} />
    <Part kappale = {props.parts[1].name} tehtavia = {props.parts[1].exercises} />
    <Part kappale = {props.parts[2].name} tehtavia = {props.parts[2].exercises} />
  </>
)

const Total = (props) => (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header kurssi = {course.name}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))