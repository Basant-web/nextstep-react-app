import { useState } from "react";
import ClarificationQuestions from "./ClarificationQuestions";

function ResultScreen({
  result,
  onAnswerQuestions,
  onNewSituation,
  onUpdateSituation,
  isUpdating,
}) {
  const [updateText, setUpdateText] = useState("");

  const handleUpdate = () => {
    if (!updateText.trim()) return;
    if (isUpdating) return;

    onUpdateSituation(updateText.trim());
    setUpdateText("");
  };

  // ==========================================
  // 1. SUPPORT / EMOTIONAL MODE
  // ==========================================

  if (result.mode === "support") {
    return (
      <main className="screen support-screen">

        <section className="support-container">

          <p className="eyebrow">
            LET'S SLOW THIS DOWN
          </p>

          <h1>
            You don't have to solve
            everything right now.
          </h1>

          <p className="support-message">
            {result.support?.message}
          </p>

          {result.support?.resources?.length > 0 && (
            <div className="support-resources">

              <h2>
                If you need immediate support
              </h2>

              {result.support.resources.map((resource, index) => (
                <div
                  className="resource"
                  key={index}
                >
                  <strong>
                    {resource.name}
                  </strong>

                  <p>
                    {resource.description}
                  </p>
                </div>
              ))}

            </div>
          )}

          <button
            type="button"
            className="primary-button"
            onClick={onNewSituation}
          >
            Start a new situation
          </button>

        </section>

      </main>
    );
  }


  // ==========================================
  // 2. OUT OF SCOPE MODE
  // ==========================================

  if (result.mode === "out_of_scope") {
    return (
      <main className="screen result-screen">

        <section className="result-container">

          <p className="eyebrow">
            NEXTSTEP
          </p>

          <h1>
            Let's focus on what NextStep can help with.
          </h1>

          <p className="subtitle">
            {result.summary}
          </p>

          <button
            type="button"
            className="primary-button"
            onClick={onNewSituation}
          >
            Describe a situation
          </button>

        </section>

      </main>
    );
  }


  // ==========================================
  // 3. NEEDS CLARIFICATION MODE
  // ==========================================

  if (result.mode === "needs_clarification") {
    return (
      <main className="screen result-screen">

        <section className="result-container">

          <p className="eyebrow">
            I NEED A LITTLE MORE INFORMATION
          </p>

          <h1>
            A couple of things need clarification.
          </h1>

          <p className="subtitle">
            {result.summary}
          </p>

          {result.clarifying_questions?.length > 0 && (
            <ClarificationQuestions
              questions={result.clarifying_questions}
              onSubmit={onAnswerQuestions}
            />
          )}

          <button
            type="button"
            className="new-situation-button"
            onClick={onNewSituation}
          >
            + Start a new situation
          </button>

        </section>

      </main>
    );
  }


  // ==========================================
  // 4. NORMAL RESULT
  // ==========================================

  return (
    <main className="screen result-screen">

      {/* ================================
          NAVBAR
      ================================= */}

      <header className="navbar">

        <h2 className="logo">
          Next<span>Step</span>
        </h2>

        <nav>
          <a href="#">Home</a>
          <a href="#">History</a>
          <a href="#">Settings</a>
        </nav>

      </header>


      <section className="result-container">

        {/* ================================
            SUCCESS MESSAGE
        ================================= */}

        <div
  className="sr-only"
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  Your situation has been analyzed. Your priorities and next step are ready.
</div>

        <div className="success-message">

          ✓

          <div>

            <strong>
              Here's your analysis
            </strong>

            <p>
              We've organised your situation.
            </p>

          </div>

        </div>


        {/* ================================
            SUMMARY
        ================================= */}

        <div className="result-heading">

          <div>

            <p className="eyebrow">
              YOUR SITUATION
            </p>

            <h1>
              What needs attention?
            </h1>

            <p>
              {result.summary}
            </p>

          </div>

        </div>


        {/* ================================
            ALL ISSUES
        ================================= */}

        {result.issues?.length > 0 && (
          <section className="all-issues-section">

            <h2 className="section-title">
              Everything you mentioned
            </h2>

            <p className="section-description">
              We've captured all the issues in your situation.
            </p>

            <div className="all-issues">

              {result.issues.map((issue, index) => (

                <div
                  className="issue-card"
                  key={issue.id || index}
                >

                  <div className="issue-number">
                    {index + 1}
                  </div>

                  <div className="issue-content">

                    <h3>
                      {issue.title || "Issue"}
                    </h3>

                    {issue.description && (
                      <p>
                        {issue.description}
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </section>
        )}


        {/* ================================
            NEXT STEP
        ================================= */}

        {result.next_action && (
          <section className="next-step-card">

            <div className="next-step-label">

              ✦ NEXT STEP

              <span>
                DO THIS FIRST
              </span>

            </div>

            <h2>
              {result.next_action.text}
            </h2>

            <p>
              {result.next_action.why}
            </p>

            <button
              type="button"
              className="complete-button"
            >
              ✓ Mark as done
            </button>

          </section>
        )}


        {/* ================================
            PRIORITIES
        ================================= */}

        {result.priorities?.length > 0 && (
          <>
            <h2 className="section-title">
              Your priorities
            </h2>

            <div className="priorities">

              {result.priorities.map((priority) => {

                const issue = result.issues?.find(
                  (item) => item.id === priority.issue_id
                );

                return (

                  <div
                    className="priority-card"
                    key={`${priority.rank}-${priority.issue_id}`}
                  >

                    <div className="priority-rank">
                      {priority.rank}
                    </div>

                    <div className="priority-content">

                      <h3>
                        {issue?.title || "Priority"}
                      </h3>

                      <p>
                        {priority.action}
                      </p>

                      <small>
                        {priority.reason}
                      </small>

                    </div>

                    <span>
                      {issue?.urgency >= 4
                        ? "HIGH"
                        : "MEDIUM"}
                    </span>

                  </div>

                );

              })}

            </div>
          </>
        )}


        {/* ================================
            CLARIFICATION QUESTIONS
        ================================= */}

        {result.clarifying_questions?.length > 0 && (

          <ClarificationQuestions
            questions={result.clarifying_questions}
            onSubmit={onAnswerQuestions}
          />

        )}


        {/* ================================
            CONFIDENCE
        ================================= */}

        {result.confidence && (

          <div className="confidence">

            <strong>
              Confidence: {result.confidence.level}
            </strong>

            {result.confidence.reasons?.map(
              (reason, index) => (

                <p key={index}>
                  {reason}
                </p>

              )
            )}

          </div>

        )}


        {/* ================================
            UPDATE SITUATION
        ================================= */}

        <section className="update-section">

          <p className="eyebrow">
            WHAT CHANGED?
          </p>

          <h2>
            Tell NextStep what happened next
          </h2>

          <p>
            If your situation changed, update it and
            we'll reassess your next step.
          </p>

          <textarea
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
            placeholder="For example: I emailed my manager and now she's angry and has CC'd HR."
            disabled={isUpdating}
          />

          <button
            type="button"
            className="primary-button"
            disabled={!updateText.trim() || isUpdating}
            onClick={handleUpdate}
          >
            {isUpdating
              ? "Reassessing..."
              : "Reassess situation →"}
          </button>

        </section>


        {/* ================================
            NEW SITUATION
        ================================= */}

        <button
          type="button"
          className="new-situation-button"
          onClick={onNewSituation}
        >
          + Start a new situation
        </button>

      </section>

    </main>
  );
}

export default ResultScreen;