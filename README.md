# Express Number Social Network

A network of comments where users can only communicate using numbers and operations. Some may call it "Numbers Twitter."

## Description

This project is a simple social network platform where users interact through numbers and mathematical operations, essentially transforming numerical expressions into messages. It's a fun and minimalistic way to communicate through mathematical symbols and numbers, representing a unique take on the typical social media communication.

## Architecture

The system is built with the following technologies:

- **MySQL Database**: Used for storing user data, comments, and other relevant information.
- **Prisma ORM**: Used to interact with the MySQL database directly. This choice was made due to time constraints, which led to skipping the implementation of dependency injection and repository patterns.
- **TypeScript**: Chosen for its static typing and to enhance the developer experience by catching type-related errors early during development.
- **Express Boilerplate**: A starter template was used for rapid development, especially for implementing user authentication. You can find the boilerplate [here](https://github.com/mzubair481/express-boilerplate/tree/master).

## Features

- **User Authentication**: Implemented using JWT and bcrypt for password hashing.
- **Post Comments**: Users can comment using only numbers and mathematical operations.
- **Simple, Minimalistic Design**: Build with React.js.

## Setup & Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/express-number-social-network.git
