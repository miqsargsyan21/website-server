# README

## Overview

This project is a NestJS-based backend for a social networking application. It consists of multiple controllers handling authentication, friend requests, and user management. Below is a detailed overview of each controller and its associated endpoints.

## Controllers

### `AuthController`

Handles user authentication and registration.

- **Base URL:** `/api/auth`

#### Endpoints

1. **Login**

    - **Method:** `POST`
    - **Endpoint:** `/login`
    - **Description:** Authenticates a user and returns a JWT token.
    - **Request Body:**
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** JWT token on successful authentication.

2. **Register**

    - **Method:** `POST`
    - **Endpoint:** `/register`
    - **Description:** Registers a new user.
    - **Request Body:**
      ```json
      {
        "email": "string",
        "password": "string",
        "firstName": "string",
        "lastName": "string",
        "age": "number",
        "bio": "string (optional)"
      }
      ```
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** Confirmation of registration.

3. **Get Profile**

    - **Method:** `GET`
    - **Endpoint:** `/profile`
    - **Description:** Retrieves the profile of the currently authenticated user.
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** User profile information.

### `FriendRequestController`

Manages friend requests, including creating, accepting, and declining requests.

- **Base URL:** `/api/friends`

#### Endpoints

1. **Find All Requests**

    - **Method:** `GET`
    - **Endpoint:** `/requests`
    - **Description:** Retrieves all friend requests.
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** List of friend requests.

2. **Add Friend Request**

    - **Method:** `POST`
    - **Endpoint:** `/add`
    - **Description:** Sends a friend request to another user.
    - **Request Body:**
      ```json
      {
        "receiverId": "number"
      }
      ```
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** Confirmation of friend request sent.

3. **Accept Friend Request**

    - **Method:** `POST`
    - **Endpoint:** `/accept`
    - **Description:** Accepts a pending friend request.
    - **Request Body:**
      ```json
      {
        "receiverId": "number"
      }
      ```
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** Confirmation of friend request acceptance.

4. **Decline Friend Request**

    - **Method:** `POST`
    - **Endpoint:** `/decline`
    - **Description:** Declines a pending friend request.
    - **Request Body:**
      ```json
      {
        "receiverId": "number"
      }
      ```
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** Confirmation of friend request decline.

### `UserController`

Handles user data management, including retrieval and search.

- **Base URL:** `/api/users`

#### Endpoints

1. **Find All Users**

    - **Method:** `GET`
    - **Endpoint:** `/`
    - **Description:** Retrieves a list of all users.
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** List of all users.

2. **Search Users**

    - **Method:** `GET`
    - **Endpoint:** `/search`
    - **Description:** Performs an advanced search for users based on query parameters.
    - **Query Parameters:**
        - `firstName` (optional): User's firstName.
        - `lastName` (optional): User's lastName.
        - `age` (optional): User's age.
    - **Response:**
        - **Status Code:** `200 OK`
        - **Body:** List of users matching the search criteria.