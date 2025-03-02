# CharchaHub 💬

Welcome to CharchaHub, a real-time chat application! 🚀

## Overview ℹ️

CharchaHub allows users to connect and chat with each other in real-time. It's built with a modern tech stack to provide a seamless and engaging user experience.

## Features ✨

-   **Real-time Messaging**: Send and receive messages instantly. ⚡
-   **User Authentication**: Secure user login and registration. ✅
-   **Contact Management**: Add and manage your contacts easily. 📇
-   **Profile Management**: Update your profile information. 👤
-   **Channels and Direct Messages**: Communicate in channels or directly with other users. 📢
-   **File Uploads**: Share files with your contacts. 📁

## Tech Stack 💻

### Client 📱

-   **React**: A JavaScript library for building user interfaces. ⚛️
-   **Redux**: For state management. 🗂️
-   **Tailwind CSS**: A utility-first CSS framework. 🎨
-   **Vite**: A build tool that provides a fast and optimized development experience. ⚡

### Server ⚙️

-   **Node.js**: An open-source, cross-platform JavaScript runtime environment. 🌐
-   **Express**: A web application framework for Node.js. 🚀
-   **Socket.IO**: Enables real-time, bidirectional communication between web clients and servers. 🔗
-   **MongoDB**: A NoSQL database. 💾

## Project Structure 📂

```
Chat-App/
├── client/             # React client application
│   ├── src/          # Source code
│   ├── public/       # Public assets
│   ├── package.json  # Client dependencies
│   └── ...
└── server/             # Node.js server application
    ├── index.js      # Server entry point
    ├── routes/       # API routes
    ├── controllers/  # Route handlers
    ├── models/       # Data models
    ├── package.json  # Server dependencies
    └── ...
```

## Getting Started 🚀

### Prerequisites

-   Node.js and npm installed.
-   MongoDB installed and running.

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/shuklaAlkesh/CharchaHub.git
    ```

2.  Install client dependencies:

    ```bash
    cd client
    npm install
    ```

3.  Install server dependencies:

    ```bash
    cd server
    npm install
    ```

4.  Set up environment variables:

    -   Create a `.env` file in the `server` directory.
    -   Add the following variables:

        ```
        PORT=5000
        MONGO_URL=<your-mongodb-connection-string>
        ```

### Running the Application

1.  Start the server:

    ```bash
    cd server
    npm start
    ```

2.  Start the client:

    ```bash
    cd client
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:5173`.

## Conclusion 🎉

Thanks for checking out CharchaHub! We hope you enjoy using it.

## View Deployed Project 🌐

You can view the deployed project here: [CharchaHub](https://charcha-hub.vercel.app/)
