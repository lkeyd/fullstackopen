import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <p>
      {props.text}: {props.value}
    </p>
  );
};

const StatisticLineStar = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.total == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else
    return (
      <div>
        <h2>statistics</h2>
        <table>
          <tbody>
            <StatisticLineStar text="good" value={props.good} />
            <StatisticLineStar text="neutral" value={props.neutral} />
            <StatisticLineStar text="bad" value={props.bad} />
            <StatisticLineStar text="all" value={props.total} />
            <StatisticLineStar text="average" value={props.average} />
            <StatisticLineStar
              text="positive"
              value={props.good / props.total}
            />
          </tbody>
        </table>
      </div>
    );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    let newGood = good + 1;
    let newTotal = total + 1;
    let newAverage = (newGood - bad) / newTotal;
    setGood(newGood);
    setTotal(newTotal);
    setAverage(newAverage);
  };

  const handleNeutralClick = () => {
    let newNeutral = neutral + 1;
    let newTotal = total + 1;
    let newAverage = (good - bad) / newTotal;
    setNeutral(newNeutral);
    setTotal(newTotal);
    setAverage(newAverage);
  };

  const handleBadClick = () => {
    let newBad = bad + 1;
    let newTotal = total + 1;
    let newAverage = (good - newBad) / newTotal;
    setBad(newBad);
    setTotal(newTotal);
    setAverage(newAverage);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => handleGoodClick()} text="good" />
        <Button onClick={() => handleNeutralClick()} text="neutral" />
        <Button onClick={() => handleBadClick()} text="bad" />
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
      />
    </div>
  );
};

export default App;
