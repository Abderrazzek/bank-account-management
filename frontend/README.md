# Bank Account Management

## Task description

Develop a web application for bank accounts management, so accounts can be managed (created, edited, searched and deleted) and fund transfers can be performed between accounts.

## Requirements

- Implementation has to be done in React with TypeScript
- No security layer (authentication / authorization) needs to be provided
- Program has to be runnable without a special software/container
- The backend must be mocked and made possible to run locally along with the frontend
- The minimal attributes to define an account are:
- An owner ID (numeric)
- A Currency (String)
- A balance (numeric)
- The minimal requirements for the fund transfer are:
  - a fund transfer can be made between any two accounts
  - these 2 accounts may have different currencies
  - the balance of the debit account must be sufficient
- The frontend must have input validation with clear error messages
- The UI is expected to be user-friendly and have good graphic standards (you can use the theme of your choice and any pictures/logos/icons copyright free)
- Code must be covered with tests

## Additional information

- The code is expected to be of good quality and easy to maintain
- As business specification is very light, use common sense in case of doubt

## Run the app:

You need JSON Server to run the app. Install JSON Server globally if you have it already:

### `npm install -g json-server`

In the `frontend` directory, you can run:

### `npm install`

### `npm run dev`

db.json represents our data base

## Testing

Under the folder e2e you will find our testing implementation.
Update `browserstack.yml` with your credential to be able to run the tests scenarios.
To run the test, under `e2e` directory, you can run:

### `npm install`

### `npm run accounts-test`
