import { useState } from "react";


function InputScreen({
  onSubmit,
  isSubmitting,
}) {

  const [text, setText] = useState("");


  const handleSubmit = () => {

    if (!text.trim()) {
      return;
    }

    if (isSubmitting) {
      return;
    }

    onSubmit(text.trim());

  };


  return (

    <main className="screen input-screen">

      <header className="navbar">

        <h2 className="logo">
          Next<span>Step</span>
        </h2>


        <nav>

          <a href="#home">
            Home
          </a>

          <a href="#history">
            History
          </a>

          <a href="#settings">
            Settings
          </a>

        </nav>

      </header>


      <section className="input-container">

        <p className="eyebrow">
          YOUR NEXT STEP STARTS HERE
        </p>


        <h1>
          What's going on?
        </h1>


        <p className="subtitle">
          Describe your situation in your own words.
          You can write in English, Hindi, or a mix.
        </p>


        <div className="textarea-wrapper">

          <label
            className="sr-only"
            htmlFor="situation-input"
          >
            Describe your situation
          </label>


          <textarea
            id="situation-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell me what's happening..."
            maxLength={2000}
            disabled={isSubmitting}
          />


          <span className="character-count">
            {text.length}/2000
          </span>

        </div>


        <p className="example-title">
          Not sure how to start? Try an example:
        </p>


        <div className="examples">

          <button
            type="button"
            onClick={() =>
              setText(
                "Viva is tomorrow, my laptop is not working and my project partner is not replying."
              )
            }
          >
            I have multiple problems
          </button>


          <button
            type="button"
            onClick={() =>
              setText(
                "I have exams, work and family problems and I feel completely overwhelmed."
              )
            }
          >
            I'm feeling overwhelmed
          </button>


          <button
            type="button"
            onClick={() =>
              setText(
                "I got a message from my manager and I'm confused about what I should do."
              )
            }
          >
            I got a message
          </button>

        </div>


        <button
          type="button"
          className="primary-button"
          onClick={handleSubmit}
          disabled={
            isSubmitting ||
            !text.trim()
          }
          aria-label="Analyze my situation and find my next step"
        >

          {isSubmitting
            ? "Understanding..."
            : "✨ Figure out my next step"}

          <span>
            →
          </span>

        </button>


        <p className="privacy">
          🔒 Your information is used only to help
          understand your situation.
        </p>

      </section>

    </main>

  );

}


export default InputScreen;