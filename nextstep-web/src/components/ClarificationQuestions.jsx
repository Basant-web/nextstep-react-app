import { useState } from "react";


function ClarificationQuestions({
  questions,
  onSubmit
}) {

  const [answers, setAnswers] = useState({});


  const handleSelect = (
    questionId,
    answer
  ) => {

    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer
    }));

  };


  const handleSubmit = () => {

    const formattedAnswers =
      questions.map((question) => ({

        question_id: question.id,

        answer:
          answers[question.id] ?? null

      }));


    onSubmit(formattedAnswers);

  };


  return (

    <section className="questions-section">

      <p className="eyebrow">
        A LITTLE MORE CLARITY
      </p>


      <h2>
        Help me understand
      </h2>


      <p className="questions-intro">
        A few answers can change what
        should come first.
      </p>


      {questions.map((question) => (

        <div
          className="question-card"
          key={question.id}
        >

          <h3>
            {question.question}
          </h3>


          <div className="question-options">

            {question.options?.map((option) => (

              <button

                key={option}

                className={
                  answers[question.id] === option
                    ? "selected"
                    : ""
                }

                onClick={() =>
                  handleSelect(
                    question.id,
                    option
                  )
                }

              >
                {option}

              </button>

            ))}

          </div>


          {question.skippable && (

            <button

              className="skip-button"

              onClick={() =>
                handleSelect(
                  question.id,
                  null
                )
              }

            >
              Skip this question
            </button>

          )}

        </div>

      ))}


      <button

        className="primary-button"

        onClick={handleSubmit}

      >
        Continue →
      </button>

    </section>

  );

}


export default ClarificationQuestions;