const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>{props.part}: {props.exercises}</p>
    </div>
  );
};

const Content= (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises}></Part>
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises}></Part>
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises}></Part>   
    </div>
  );
};


const Total = (props) => {
  return (
    <div>
      <p>Total number of exercises: {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    </div>
  )
};

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
      <Header course={course} />
      <Content course={course}/>
      <Total course={course} />
    </div>
  )
}

export default App;
