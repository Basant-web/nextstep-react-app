const API_BASE_URL = "https://nextstepmockapi.onrender.com";

const CANDIDATE_EMAIL = "yadavbasant2800@gmail.com";

async function handleResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    // Response was not valid JSON
  }

  if (!response.ok) {
    const error = new Error(
      data?.error?.message || `Request failed (${response.status})`
    );

    error.status = response.status;
    error.code = data?.error?.code;

    throw error;
  }

  if (!data) {
    throw new Error("The server returned an invalid response.");
  }

  return data;
}


// Analyze a new situation
export async function analyzeSituation(text) {
  const response = await fetch(`${API_BASE_URL}/v1/situations`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-Candidate-Id": CANDIDATE_EMAIL,
      "Idempotency-Key": crypto.randomUUID(),
    },

    body: JSON.stringify({
      text,
      locale: "en-IN",
      client_time: new Date().toISOString(),
    }),
  });

  return handleResponse(response);
}


// Answer clarification questions
export async function answerQuestions(situationId, answers) {
  const response = await fetch(
    `${API_BASE_URL}/v1/situations/${situationId}/answers`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "X-Candidate-Id": CANDIDATE_EMAIL,
        "Idempotency-Key": crypto.randomUUID(),
      },

      body: JSON.stringify({
        answers,
        client_time: new Date().toISOString(),
      }),
    }
  );

  return handleResponse(response);
}


// Get latest situation
export async function getSituation(situationId) {
  const response = await fetch(
    `${API_BASE_URL}/v1/situations/${situationId}`,
    {
      headers: {
        "X-Candidate-Id": CANDIDATE_EMAIL,
      },
    }
  );

  

  return handleResponse(response);
}

export async function updateSituation(situationId, text) {
  const response = await fetch(
    `${API_BASE_URL}/v1/situations/${situationId}/updates`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Candidate-Id": CANDIDATE_EMAIL,
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        text,
        client_time: new Date().toISOString(),
      }),
    }
  );

  return handleResponse(response);
}