const Course = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const Total = ({ parts }) => {
    console.log(parts, "parts");
    const sum = parts.reduce((s, p) => s + p.exercises, 0);
    return <p>Total exercises: {sum}</p>;
  };

  const Part = ({ name, exercises }) => {
    return (
      <li>
        {name} {exercises}
      </li>
    );
  };

  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ parts }) => {
    return (
      <ul>
        {parts.map((part) => (
          <Part key={part.name} name={part.name} exercises={part.exercises} />
        ))}
      </ul>
    );
  };

  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};
export default Course;
