import { useState, useEffect } from "react";

function QuestionCall() {
  const [questions, setQuestions] = useState([]);

  // Fetch data from backend when the component loads
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5040/ques", {
          method: "GET",
        });
        const data = await response.json();
        setQuestions(data); // Store the array of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, []);

  const handleRevisionChange = async (id) => {
    try {
      // Fetch the current question to get its existing nextrevision
      const currentQuestion = questions.find((ques) => ques._id === id);
      let newRevisionDate;

      if (currentQuestion) {
        // Example spaced revision logic: Double the revision interval
        const currentRevisionDate = new Date(currentQuestion.nextrevision);
        newRevisionDate = new Date(currentRevisionDate);
        newRevisionDate.setDate(newRevisionDate.getDate() + 2); // Change this logic as needed
      } else {
        // Fallback in case the question isn't found
        newRevisionDate = new Date();
        newRevisionDate.setDate(newRevisionDate.getDate() + 1); // Default to 1 day if not found
      }

      const response = await fetch(
        `http://localhost:5040/update-revision/${id}`,
        {
          method: "PATCH", // Use PATCH for updating a resource
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nextrevision: newRevisionDate }),
        }
      );

      if (response.ok) {
        // Update the state to reflect the changes
        setQuestions((prevQuestions) =>
          prevQuestions.map((ques) =>
            ques._id === id ? { ...ques, nextrevision: newRevisionDate } : ques
          )
        );
      } else {
        const data = await response.json();
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error updating revision date:", error);
      alert("Error updating revision date.");
    }
  };

  return (
    <div>
      <h1>Today Revision Questions</h1>
      {questions.length === 0 ? (
        <p>No questions available for today.</p>
      ) : (
        <ul>
          {questions.map((ques) => (
            <li key={ques._id}>
              <a href={ques.link} target="_blank" rel="noopener noreferrer">
                {ques.title}
              </a>
              <input
                type="checkbox"
                onChange={() => handleRevisionChange(ques._id)}
                style={{ marginLeft: "10px" }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionCall;
