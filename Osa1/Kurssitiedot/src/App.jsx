const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return <h1>{props.course.name}</h1>;
  };

  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercise}
      </p>
    );
  };

  const Content = (props) => {
    return (
      <div>
        <Part name={props.parts[0].name} exercise={props.parts[0].exercise} />
        <Part name={props.parts[1].name} exercise={props.parts[1].exercise} />
        <Part name={props.parts[2].name} exercise={props.parts[2].exercise} />
      </div>
    );
  };

  const Total = (props) => {
    console.log(props);
    return (
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;
