const Header = ({ header }) => {
    return <h1>{header}</h1>
  }
  
  const Content = ({ parts }) => {
    return parts.map(part => <Part key={part.id} part={part} />)
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (<p><strong>total of {total} exercises</strong></p>)
  }
  
  const Part = ({ part }) => {
    return <p>{part.name} {part.exercises}</p>
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course