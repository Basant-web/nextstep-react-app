import { useEffect, useRef, useState } from "react";

import InputScreen from "./components/InputScreen";
import LoadingScreen from "./components/LoadingScreen";
import ResultScreen from "./components/ResultScreen";

import {
  analyzeSituation,
  answerQuestions,
  getSituation,
  updateSituation,
} from "./services/api";

import "./App.css";


// ==================================================
// ERROR MESSAGE
// ==================================================

function getErrorMessage(error) {
  if (error?.code === "TIMEOUT") {
    return "This is taking longer than expected. Please try again.";
  }

  if (error?.status === 429) {
    return "You're sending requests too quickly. Please wait a moment and try again.";
  }

  if (error?.status >= 500) {
    return "NextStep is having trouble right now. Please try again in a moment.";
  }

  if (error?.message?.includes("Failed to fetch")) {
    return "We couldn't connect to NextStep. Check your internet connection and try again.";
  }

  return "We couldn't process your situation. Please try again.";
}


// ==================================================
// APP
// ==================================================

function App() {
  const [screen, setScreen] = useState("input");

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);


  // ==================================================
  // REQUEST LOCKS
  // Prevent duplicate requests
  // ==================================================

  const submitLock = useRef(false);

  const answerLock = useRef(false);


  // ==================================================
  // CROSS-TAB SYNCHRONIZATION
  // ==================================================

  const syncSituation = (situationId) => {
    localStorage.setItem(
      "nextstep_sync",
      JSON.stringify({
        situation_id: situationId,
        time: Date.now(),
      })
    );
  };


  // ==================================================
  // START NEW SITUATION
  // ==================================================

  const handleNewSituation = () => {
    localStorage.removeItem(
      "nextstep_situation_id"
    );

    setResult(null);

    setError("");

    setScreen("input");
  };


  // ==================================================
  // GO TO RESULT
  // ==================================================

  const goToResult = (data) => {
    setResult(data);

    setError("");

    setScreen("result");
  };


  // ==================================================
  // RESUME SITUATION AFTER REFRESH
  // ==================================================

  useEffect(() => {
    const savedSituationId =
      localStorage.getItem(
        "nextstep_situation_id"
      );

    if (!savedSituationId) {
      return;
    }


    const loadSituation = async () => {
      try {
        setScreen("loading");

        const data =
          await getSituation(
            savedSituationId
          );

        setResult(data);

        setScreen("result");

      } catch (error) {
        console.error(
          "Resume failed:",
          error
        );

        localStorage.removeItem(
          "nextstep_situation_id"
        );

        setError(
          "We couldn't restore your previous situation. Please start again."
        );

        setScreen("input");
      }
    };


    loadSituation();

  }, []);


  // ==================================================
  // CROSS-TAB LISTENER
  // ==================================================

  useEffect(() => {

    const handleStorageChange =
      async (event) => {

        if (
          event.key !==
          "nextstep_sync"
        ) {
          return;
        }


        if (!event.newValue) {
          return;
        }


        try {

          const syncData =
            JSON.parse(
              event.newValue
            );


          if (
            !syncData?.situation_id
          ) {
            return;
          }


          const latestData =
            await getSituation(
              syncData.situation_id
            );


          setResult(
            latestData
          );

          setError("");

          setScreen("result");

        } catch (error) {

          console.error(
            "Cross-tab synchronization failed:",
            error
          );

        }
      };


    window.addEventListener(
      "storage",
      handleStorageChange
    );


    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };

  }, []);


  // ==================================================
  // SUBMIT SITUATION
  // ==================================================

  const handleSubmit = async (text) => {

    // Prevent duplicate clicks
    if (submitLock.current) {
      return;
    }


    submitLock.current = true;


    setIsSubmitting(true);

    setError("");

    setScreen("loading");


    try {

      const data =
        await analyzeSituation(
          text
        );


      console.log(
        "ANALYSIS:",
        data
      );


      // Save situation ID
      localStorage.setItem(
        "nextstep_situation_id",
        data.situation_id
      );


      // Tell other browser tabs
      syncSituation(
        data.situation_id
      );


      // Show result
      goToResult(data);

    } catch (error) {

      console.error(
        "Analysis failed:",
        error
      );


      setError(
        getErrorMessage(error)
      );


      // Return to input
      setScreen("input");

    } finally {

      submitLock.current = false;

      setIsSubmitting(false);

    }
  };


  // ==================================================
  // ANSWER CLARIFICATION QUESTIONS
  // ==================================================

  const handleAnswerQuestions =
    async (answers) => {

      // Prevent duplicate requests
      if (answerLock.current) {
        return;
      }


      // Make sure a situation exists
      if (!result?.situation_id) {
        return;
      }


      answerLock.current = true;


      setError("");

      setScreen("loading");


      try {

        const data =
          await answerQuestions(
            result.situation_id,
            answers
          );


        console.log(
          "UPDATED ANALYSIS:",
          data
        );


        // Save latest situation
        localStorage.setItem(
          "nextstep_situation_id",
          data.situation_id
        );


        // Sync other tabs
        syncSituation(
          data.situation_id
        );


        // Show updated result
        goToResult(data);

      } catch (error) {

        console.error(
          "Answer submission failed:",
          error
        );


        setError(
          getErrorMessage(error)
        );


        // Keep the current result
        setScreen("result");

      } finally {

        answerLock.current = false;

      }
    };


  // ==================================================
  // UPDATE SITUATION
  // ==================================================

  const handleUpdateSituation =
    async (text) => {

      if (isUpdating) {
        return;
      }


      if (!result?.situation_id) {
        return;
      }


      setIsUpdating(true);

      setError("");

      setScreen("loading");


      try {

        const data =
          await updateSituation(
            result.situation_id,
            text
          );


        console.log(
          "UPDATED SITUATION:",
          data
        );


        // Save latest situation
        localStorage.setItem(
          "nextstep_situation_id",
          data.situation_id
        );


        // Sync other tabs
        syncSituation(
          data.situation_id
        );


        // Show updated result
        goToResult(data);

      } catch (error) {

        console.error(
          "Update failed:",
          error
        );


        setError(
          getErrorMessage(error)
        );


        // Keep the current result
        setScreen("result");

      } finally {

        setIsUpdating(false);

      }
    };


  // ==================================================
  // DISMISS ERROR
  // ==================================================

  const handleDismissError = () => {
    setError("");
  };


  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="app">

      {/* ==========================================
          ERROR ALERT
      ========================================== */}

      {error && (
        <div
          className="error-alert"
          role="alert"
          aria-live="assertive"
        >

          <div className="error-alert-content">

            {/* Error icon */}

            <div
              className="error-icon"
              aria-hidden="true"
            >
              !
            </div>


            {/* Error text */}

            <div className="error-text">

              <strong>
                Something went wrong
              </strong>

              <p>
                {error}
              </p>

            </div>


            {/* Close button */}

            <button
              type="button"
              className="error-close"
              onClick={
                handleDismissError
              }
              aria-label="Dismiss error"
            >
              ×
            </button>

          </div>

        </div>
      )}


      {/* ==========================================
          INPUT SCREEN
      ========================================== */}

      {screen === "input" && (
        <InputScreen
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}


      {/* ==========================================
          LOADING SCREEN
      ========================================== */}

      {screen === "loading" && (
        <LoadingScreen />
      )}


      {/* ==========================================
          RESULT SCREEN
      ========================================== */}

      {screen === "result" &&
        result && (
          <ResultScreen
            result={result}

            onAnswerQuestions={
              handleAnswerQuestions
            }

            onNewSituation={
              handleNewSituation
            }

            onUpdateSituation={
              handleUpdateSituation
            }

            isUpdating={
              isUpdating
            }
          />
        )}

    </div>
  );
}


export default App;