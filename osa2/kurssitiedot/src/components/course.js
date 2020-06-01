import React from 'react'

const Header = (props) => (
    <div>
      <h2>{props.kurssi}</h2>
    </div>
  )
  
  const Part = (props) => (
    <p>
    {props.kappale} {props.tehtavia}
  </p> 
  )
  
  const Content = ({parts}) => (
    <>
      {parts.map((part) => <Part kappale = {part.name} tehtavia = {part.exercises} key={part.id}/> )}
    </>
  )
  
  const Total = (props) => (
    <b>Total of {props.parts.reduce((sum, part) => (sum + part.exercises), 0)} exercises</b>
  )
  
  const Course = ({course}) => {
    return (
      <div>
        <Header kurssi = {course.name}/>
        <Content parts = {course.parts} />
        <Total parts = {course.parts} /> 
      </div>
    )
  }

  export default Course