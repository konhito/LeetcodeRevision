import { useState, useEffect } from "react";
import { CheckboxDemo } from "./utils/CheckBox.jsx";

function QuestionCall() {
  const [questions, setQuestions] = useState([]);
  const [checkedQuestions, setCheckedQuestions] = useState({}); // Track checked state

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://leet-server-od2t.vercel.app/ques",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error fetching questions.");
      }
    };

    fetchQuestions();
  }, []);

  const handleRevisionChange = async (id) => {
    try {
      const currentQuestion = questions.find((ques) => ques._id === id);
      let newRevisionDate;

      if (currentQuestion) {
        const currentRevisionDate = new Date(currentQuestion.nextrevision);
        newRevisionDate = new Date(currentRevisionDate);
        newRevisionDate.setDate(newRevisionDate.getDate() + 2);
      } else {
        newRevisionDate = new Date();
        newRevisionDate.setDate(newRevisionDate.getDate() + 1);
      }

      const response = await fetch(
        `https://leet-server-od2t.vercel.app/update-revision/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nextrevision: newRevisionDate }),
        }
      );

      if (response.ok) {
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

  const handleCheckboxChange = (id) => {
    setCheckedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    handleRevisionChange(id);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Today's Revision Questions
      </h1>
      {questions.length === 0 ? (
        <p className="text-center text-gray-500">
          No questions available for today.
        </p>
      ) : (
        <ul className="space-y-4">
          {questions.map((ques) => (
            <li
              key={ques._id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center gap-10">
                <CheckboxDemo
                  checked={!!checkedQuestions[ques._id]} // Check if the question is marked
                  onCheckedChange={() => handleCheckboxChange(ques._id)} // Handle checkbox change
                />
                <a
                  href={ques.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {ques.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionCall;
