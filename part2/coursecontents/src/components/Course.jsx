const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} key={part.name} />
    ))}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Total = ({ parts }) => {
  const total = parts.reduce(
    (currentTotal, part) => part.exercises + currentTotal,
    0
  )
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Course
