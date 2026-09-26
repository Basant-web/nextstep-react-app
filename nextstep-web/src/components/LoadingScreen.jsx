import { useEffect, useState } from "react";


function LoadingScreen() {

  const [seconds, setSeconds] = useState(0);


  useEffect(() => {

    const timer = setInterval(() => {

      setSeconds((previous) => previous + 1);

    }, 1000);


    return () => {
      clearInterval(timer);
    };

  }, []);


  let message =
    "Understanding your situation...";


  if (seconds >= 5 && seconds < 10) {

    message =
      "Finding what matters most...";

  }


  if (seconds >= 10) {

    message =
      "Putting together your next step...";

  }


  const progress =
    Math.min(
      (seconds / 15) * 100,
      95
    );


  return (

    <main className="screen loading-screen">

      <div className="loading-card">

        <div
          className="loading-icon"
          aria-hidden="true"
        >
          ✨
        </div>


        <p className="eyebrow">
          NEXTSTEP
        </p>


        <h1
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </h1>


        <p className="loading-description">
          We're organizing the situation so
          you don't have to.
        </p>


        <div className="progress-container">

          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        <div className="loading-stages">

          <div
            className={
              seconds >= 1
                ? "stage active"
                : "stage"
            }
          >

            <span aria-hidden="true">
              ✓
            </span>

            <p>
              Understand
            </p>

          </div>


          <div
            className={
              seconds >= 5
                ? "stage active"
                : "stage"
            }
          >

            <span aria-hidden="true">
              ✓
            </span>

            <p>
              Prioritize
            </p>

          </div>


          <div
            className={
              seconds >= 10
                ? "stage active"
                : "stage"
            }
          >

            <span aria-hidden="true">
              ✓
            </span>

            <p>
              Next step
            </p>

          </div>

        </div>


        {seconds >= 15 && (

          <p className="waiting-message">
            This is taking a little longer than
            usual. Please keep this page open.
          </p>

        )}

      </div>

    </main>

  );

}


export default LoadingScreen;