# NextStep --- Web Developer Technical Challenge

### GitHub Repository

the repository link:

`https://github.com/Basant-web/nextstep-react-app`

### Live Demo

live demo link:

`https://nextstep99.netlify.app/`

## Overview

NextStep is a decision-support web experience that helps users turn a
complicated situation into a clear next step.

The application allows a user to describe what is happening in their own
words. The application then uses the provided NextStep Mock API to
organize the situation and present the most useful information.

The main result can include:

-   A summary of the situation
-   All identified issues
-   Priorities
-   The recommended next action
-   Clarifying questions
-   Confidence information
-   Situation updates and reassessment

## Tech Stack

-   React
-   JavaScript
-   CSS
-   Vite
-   REST API
-   Browser LocalStorage

## Features

### 1. Situation Input

Users can describe their situation in their own words.

The input screen supports:

-   English
-   Hindi
-   Hinglish
-   Character limit
-   Example situations
-   Submit/loading state
-   Accessible form labeling

### 2. Situation Analysis

After submission, the application sends the situation to the provided
API and displays the returned analysis.

The result screen can show:

-   Situation summary
-   Everything the user mentioned
-   Priorities
-   Next action
-   Clarifying questions
-   Confidence information

### 3. Clarifying Questions

If the API returns `needs_clarification`, the application displays the
questions returned by the API.

The selected answers are sent back to the API and the updated analysis
is displayed.

### 4. Support Mode

When the API returns `support` mode, the application displays the
support response and available resources instead of showing a normal
priority/task list.

### 5. Out-of-Scope Mode

When the API returns `out_of_scope`, the application explains that the
request is outside the intended use of NextStep and allows the user to
describe a relevant situation.

### 6. Situation Updates

Users can describe what happened after the original analysis.

The application sends the update to the API and displays the reassessed
situation.

### 7. Loading Experience

The API can take several seconds to respond, so the application provides
a staged loading experience.

The loading messages progress through:

1.  Understanding your situation
2.  Finding what matters most
3.  Putting together your next step

If the request takes longer, the interface tells the user that it is
taking longer than usual.

### 8. Error Handling

The application handles several API failure cases, including:

-   Timeout
-   Rate limiting
-   Server errors
-   Network connection failures
-   General API errors

Errors are displayed prominently at the top of the interface so users
can immediately understand what happened.

### 9. Duplicate Request Protection

Request locks are used to prevent accidental duplicate submissions while
a request is already in progress.

### 10. Persistence

The current situation ID is stored in LocalStorage.

This allows the application to retrieve the latest situation again after
a page refresh.

### 11. Cross-Tab Synchronization

The application uses the browser `storage` event to detect situation
changes made in another browser tab and retrieve the latest situation
from the API.

### 12. Responsive Design

The interface is designed for desktop and mobile layouts, including
narrow mobile screens.

The layout was tested with the challenge's small-screen requirement in
mind.

### 13. Accessibility

The application includes:

-   Semantic HTML
-   Accessible form labels
-   Keyboard-friendly controls
-   `role="alert"` for important errors
-   Live announcements for important status changes
-   Information that is not communicated by color alone

## API Integration

The application uses the provided NextStep Mock API.

Base URL:

`https://nextstepmockapi.onrender.com`

The application sends the required candidate ID and uses an idempotency
key for POST requests.

The main API operations used are:

-   Create a situation
-   Retrieve a situation
-   Submit clarification answers
-   Update/reassess a situation

## Project Structure

``` text
nextstep-web/
├── src/
│   ├── components/
│   │   ├── InputScreen.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ResultScreen.jsx
│   │   └── ClarificationQuestions.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── README.md
├── package.json
├── package-lock.json
└── vite.config.js
```

## Testing

The application was tested using the scenarios provided in the
challenge.

The scenarios cover:

1.  Multiple urgent problems
2.  Hinglish input
3.  Contradictory or uncertain information
4.  Emotional distress/support mode
5.  Out-of-scope request
6.  Prompt injection attempt
7.  Situation update/reassessment

### Failure Testing

The API's chaos/failure modes were also used during development to test
error handling.

A server-error response was tested successfully.

Temporary `X-Chaos` headers used for testing were removed from the final
implementation.

## Scenario Results

### Scenario 1 — Multi-problem
![Scenario 1](./src/images/scenario1.png)

### Scenario 2 — Hinglish
![Scenario 2](./src/images/scenario2.png)

### Scenario 3 — Contradictory
![Scenario 3.1](./src/images/scenario3.1.png)

![Scenario 3.2](./src/images/scenario3.2.png)

### Scenario 4 — Emotional / At-risk
![Scenario 4](./src/images/scenario4.png)

### Scenario 5 — Irrelevant / Misuse
![Scenario 5](./src/images/scenario5.png)

### Scenario 6 — Adversarial
![Scenario 6](./src/images/scenario6.png)

### Scenario 7 — Worse after action
![Scenario 7](./src/images/scenario7.png)

## Running the Project

Clone the repository and open the project folder.

Install dependencies:

``` bash
npm install
```

Start the development server:

``` bash
npm run dev
```

Open the local URL shown by Vite in the terminal.

## AI Usage Disclosure

AI tools were used during development as an implementation, debugging,
and learning assistant.

### How AI Was Used

AI was used for:

-   React component structure
-   CSS and responsive layout suggestions
-   API integration guidance
-   Error-handling suggestions
-   Explaining React and JavaScript concepts
-   Reviewing the implementation against the challenge requirements

### What Was Accepted

AI suggestions were used when they matched the challenge requirements
and worked correctly after testing.

### What Was Modified

AI-generated code and suggestions were modified to fit the application's
existing component structure, API integration, UI, and testing results.

### What Was Rejected

Some suggested approaches were rejected when they did not work correctly
during testing or were not suitable for the application's behavior.

### Example of an AI Failure

An earlier browser-history approach was attempted to improve Back-button
behavior.

During testing, the approach did not behave as expected and caused
unwanted navigation behavior.

Instead of keeping unreliable code, the history approach was removed and
the application was kept on the stable implementation.

## Design Decisions

### Show All Identified Issues

The result screen displays all issues returned by the API rather than
hiding issues that were identified from the user's situation.

This helps the user see that the complete situation was understood.

### Different Modes

The application treats different API modes differently:

-   `standard` --- normal analysis with issues, priorities, and next
    action
-   `needs_clarification` --- asks the user for additional information
-   `support` --- shows support-focused content
-   `out_of_scope` --- explains that the request is outside the intended
    scope

## Known Limitations

This project was created as a technical challenge submission rather than
a production application.

The implementation focuses on the requirements described in the
challenge brief and the behavior provided by the mock API.
