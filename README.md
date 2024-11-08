# Student Course Registration System

This is a backend implementation of a **Student Course Registration System** using **Node.js** with **Express** and **MongoDB**. The system allows students to register for different courses with flexible shifts and payment options.

## Project Structure

```plaintext
.
├── src
│   ├── config               # Configuration files for database and environment
│   ├── controllers          # Controller files to handle requests and responses
│   ├── models               # Mongoose models for each entity (Student, Course, etc.)
│   ├── routes               # Route files for each entity
│   └── services             # Business logic and service functions
├── app.js                   # Express app setup
├── server.js                # Main server entry point
└── .env                     # Environment variables

```
```bash
git clone https://github.com/amanuelmandefro3/student-registration.git
cd student-registration
```



## Getting Started

### Prerequisites
- **Node.js**: Ensure Node.js is installed.
- **MongoDB**: MongoDB instance for database storage.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amanuelmandefro3/student-registration.git
   cd student-registration
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```plaintext
   PORT=3000
   MONGODB_URI=<your_mongo_db_connection_string>
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Usage

Once the server is running, use **Postman** or any other API client to interact with the endpoints. Refer to the API Endpoints section above for details on available routes.

For detailed API documentation, visit [Postman Documentation](https://documenter.getpostman.com/view/34558676/2sAY52bekd).