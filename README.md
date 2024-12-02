# E-Commerce Backend API

This repository contains the backend implementation for an e-commerce application, built using **Express.js**. The API provides features for managing a shopping cart, placing orders, and generating discount codes for administrative purposes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [License](#license)

---

## Features

- **Cart Management**: Add items to the cart and view the current cart.
- **Order Management**: Place orders and view order summaries.
- **Discount Codes**: Automatically generate discount codes for every nth order.
- **Admin Reports**: Get purchase summaries, including total items, amounts, and discounts.

---

## Tech Stack

- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Testing**: [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
- **Environment Variables**: [dotenv](https://github.com/motdotla/dotenv)
- **UUID Generator**: [uuid](https://github.com/uuidjs/uuid)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mehulrana017/interview-ecommerce-be.git
   cd interview-ecommerce-be
   ```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=5000
NTH_ORDER=5  # Configure after how many orders a discount code should be generated
```

## Scripts

```bash
# Start production server
yarn start

# Start development server with hot reload
yarn dev

# Run tests
yarn test
```

## API Endpoints

### Cart Routes (`/api/cart`)

- **GET /** - Get the current cart contents

  - Response: Array of cart items

- **POST /add** - Add an item to the cart
  - Request body:
    ```json
    {
      "id": "string",
      "name": "string",
      "quantity": "number",
      "price": "number"
    }
    ```
  - Response: Updated cart contents

### Order Routes (`/api/order`)

- **POST /place** - Place a new order
  - Request body:
    ```json
    {
      "items": "array",
      "subtotal": "number",
      "discountedAmount": "number",
      "discountCode": "string"
    }
    ```
  - Response: Order confirmation

### Admin Routes (`/api/admin`)

- **GET /generate-discount** - Generate a discount code for every nth order

  - Response: Generated discount code and percentage

- **GET /summary** - Get purchase summary
  - Response: Summary of all orders including:
    - Total items sold
    - Total purchase amount
    - Discount codes used
    - Total discount amount

## Testing

The application includes a comprehensive test suite using Jest and Supertest. Tests cover:

- Cart operations
- Order processing
- Admin functionalities
- Discount code generation
- Purchase summary generation

Run the tests using:

```bash
yarn test
```

## Dependencies

### Main Dependencies

- express: ^4.21.1
- body-parser: ^1.20.3
- cors: ^2.8.5
- dotenv: ^16.4.5
- joi: ^17.13.3
- uuid: ^11.0.3

### Dev Dependencies

- jest: ^27
- supertest: ^7.0.0
- @babel/preset-env: ^7.26.0
- babel-jest: ^29.7.0

## Data Storage

The server currently uses in-memory storage through arrays:

- `orders`: Stores all placed orders
- `cart`: Manages the current shopping cart

## Error Handling

The server includes global error handling middleware that catches and processes errors, returning appropriate error responses to the client.

## Input Validation

The application uses Joi for request validation to ensure data integrity and proper error handling.

## CORS

Cross-Origin Resource Sharing (CORS) is enabled for all routes by default, allowing the API to be accessed from different origins.
