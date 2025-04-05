const Header = props => {
  return <h1>{props.course.name}</h1>
}

const Part = props => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Content = ({ parts }) => {
  return (
    <div>
      {
        parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)
      }
    </div>
  )
}

const Total = ({parts}) => {
  return <b>total of {parts.reduce((sum, order) => sum + order.exercises, 0)} exercises</b>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course