# Bookshelf API

Bookshelf API is a simple RESTful API for managing a collection of books. It allows you to perform CRUD (Create, Read, Update, Delete) operations on book records.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Running Tests](#running-tests)
- [Dependencies](#dependencies)

## Features

- Add a new book
- Get all books
- Get book details by ID
- Update book details by ID
- Delete a book by ID

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/api-bookshelf.git
    ```

2. Navigate to the project directory:

    ```bash
    cd api-bookshelf
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server in development mode:

    ```bash
    npm run start-dev
    ```

   or start the server in production mode:

    ```bash
    npm start
    ```

2. The server will be running at `http://localhost:5000`.

## Endpoints

- **Add a new book**
    - **Method**: POST
    - **URL**: `/books`
    - **Request Body**:
        ```json
        {
          "name": "Book Name",
          "author": "Author Name",
          "year": 2023,
          "publisher": "Publisher Name",
          "summary": "Summary of the book",
          "readPage": 100,
          "reading": true,
          "pageCount": 200
        }
        ```
    - **Response**:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil ditambahkan",
          "data": {
            "bookId": "nanoid"
          }
        }
        ```

- **Get all books**
    - **Method**: GET
    - **URL**: `/books`
    - **Query Parameters** (optional): `name`, `reading`, `finished`
    - **Response**:
        ```json
        {
          "status": "success",
          "data": {
            "books": [
              {
                "id": "nanoid",
                "name": "Book Name",
                "publisher": "Publisher Name"
              }
            ]
          }
        }
        ```

- **Get book details by ID**
    - **Method**: GET
    - **URL**: `/books/{bookId}`
    - **Response**:
        ```json
        {
          "status": "success",
          "data": {
            "book": {
              "id": "nanoid",
              "name": "Book Name",
              "author": "Author Name",
              "year": 2023,
              "publisher": "Publisher Name",
              "summary": "Summary of the book",
              "readPage": 100,
              "reading": true,
              "pageCount": 200,
              "finished": false,
              "insertedAt": "2023-05-01T00:00:00.000Z",
              "updatedAt": "2023-05-01T00:00:00.000Z"
            }
          }
        }
        ```

- **Update book details by ID**
    - **Method**: PUT
    - **URL**: `/books/{bookId}`
    - **Request Body**:
        ```json
        {
          "name": "Updated Book Name",
          "author": "Updated Author Name",
          "year": 2023,
          "publisher": "Updated Publisher Name",
          "summary": "Updated summary of the book",
          "readPage": 150,
          "reading": false,
          "pageCount": 200
        }
        ```
    - **Response**:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil diperbarui"
        }
        ```

- **Delete a book by ID**
    - **Method**: DELETE
    - **URL**: `/books/{bookId}`
    - **Response**:
        ```json
        {
          "status": "success",
          "message": "Buku berhasil dihapus"
        }
        ```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will run the Newman tests using the provided Postman collection and environment files.
