# RideShare API

> A complete ride-sharing API that supports user signup, login, account management, ride booking, ride cancellations, and admin controls. This is a backend service for an Uber-like ride-sharing application.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Description

This project is a node API that powers a ride-sharing platform. It includes functionality for users to authenticate users, book and cancel rides, review rides, and manage their profile. Admins have access to manage users and monitor platform activity.

Key features of the API:
- **User Management**: Signup, login, account verification, password reset.
- **Ride Management**: Book rides, cancel rides, track ride history.
- **Admin Control**: Admins can manage users and monitor platform activity.

---

## Installation

### Prerequisites

- Node.js (>= v14.0.0)
- npm (>= v6.0.0)
- MongoDB (or another database of your choice)
- Postman (or another API testing tool for testing the endpoints)

### Steps

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/rideshare-api.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd rideshare-api
    ```

3. **Install the dependencies**:

    ```bash
    npm install
    ```

4. **Create a `.env` file** with necessary environment variables:

    ```bash
    cp .env.example .env
    ```

   Add your database connection string, JWT secret, and any other required environment variables in the `.env` file.

5. **Start the server**:

    ```bash
    npm start
    ```

6. **Run seeder for dummy database**:

    ```bash
    npm run seed
    ```

---

## Usage

You can now test your API using Postman (or any other tool for API testing).

Make sure to review and authenticate using the following key features:

- **User authentication**: Includes signup, login, password reset, and email verification.
- **Ride management**: Allows users to book and cancel rides.
- **Admin functionalities**: Admins can manage users, monitor rides, and delete users.

---

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-branch`).
3. Commit your changes (`git commit -m 'commit message'`).
4. Push to the branch (`git push origin feature/your-branch`).
5. Open a pull request.

---

## License

MIT License © [Nathaniel Abolarin](https://github.com/Naythankik)

---

## Acknowledgments

- Thanks to [Express.js](https://expressjs.com/) for creating an excellent framework for building APIs.
- Thanks to [MongoDB](https://www.mongodb.com/) for providing a flexible NoSQL database.

