import { useState } from "react";

const StatisticsLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  } else
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={good + neutral + bad} />
          <StatisticsLine
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticsLine
            text="Positive"
            value={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </table>
      </div>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
