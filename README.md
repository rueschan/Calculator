# Calculator

This is a JS-based calculator. Hierarchy of operations supported.

## Quickstart

### Prerequisites

Before proceeding with this app you need to install:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

### 1. Clone the project

To clone this project simply copy & paste this in your command line. These commands will copy the project for you and move you into it.
```
git clone https://github.com/rueschan/Calculator.git
cd Calculator
```

### 2. Launch app

The easiest and fastest way to run this app is through the `npm run fresh-start` command. This command will install and launch the app for you.

> To execute this app on your own just run: `npm run start`. Make sure you have previously installed **prod** required dependencies with `npm install --prod`

## Quality

This app tries to cover lint and testing standards. The easiest and fastest way to run a quality test is through the `npm run quality-check` command. This command will do dependencies installation and both linting and unit tests.

### Lint

It has been built following _Airbnb_ linting rules for javascript. This helps easier code reading and understanding.

> To run a lint review use the command `npm run lint`. Make sure you have previously installed **all** required dependencies with `npm install`

### Unit tests

It has unit tests made with [Jest](https://jestjs.io/) covering all four types of operations (addition, subtraction, multiplication, and division).

> To run tests use the command `npm run test`. Make sure you have previously installed **all** required dependencies with `npm install`
