import { useState,useEffect } from "react";
import Description from "./Description/Description.jsx";
import Options from "./Options/Options.jsx";
import Feedback from "./Feedback/Feedback.jsx";
import Notifications from "./Notifications/Notifications.jsx";

const getInitialValues = () => {
  const savedValues = window.localStorage.getItem("values");
  if (savedValues !== null) {
    return JSON.parse(savedValues);
  }
  return {
    good: 0,
    neutral: 0,
    bad: 0,
  };
}
export default function App(){
  const [values, setValues] = useState(getInitialValues) ;
  function resetFeedback() {
    setValues({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  }
  useEffect(() => {
    window.localStorage.setItem("values", JSON.stringify(values));
  }, [values]);
  const updateFeedback = feedbackType => {
    setValues({
      ...values,
      [feedbackType]: values[feedbackType] + 1,
    });
  }
  const totalFeedback = values.good + values.neutral + values.bad;
  const positiveFeedback = Math.round((values.good / totalFeedback) * 100);
  return(
    <>
    <Description/>
    <Options
        handler={updateFeedback}
        reset = {resetFeedback}
        total= {totalFeedback}
      />
      {totalFeedback > 0 ? (
      <Feedback
          values={values}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
        ) : (
        <Notifications/>)}
    </>
  )
}
