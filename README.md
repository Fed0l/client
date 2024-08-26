# TODO Website Frontend

## Overview

The frontend of the TODO website project is built using React and provides a user interface for managing to-do lists. It includes features for user authentication, task management, and a responsive design built with Tailwind CSS. This project interacts with the backend API to handle user data and tasks securely.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Material-UI**: Component library for React, including icons and styling.
- **Axios**: HTTP client for making API requests.
- **React Router**: Library for routing and navigation in React applications.
- **Day.js**: Library for date manipulation.
- **dotenv**: Module for environment variables management.
- **JWT-decode**: Library for decoding JSON Web Tokens.

## Installation Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Fed0l/client
   cd client
   ```

2. **Install Dependencies**

   Ensure you have Node.js installed. Run:

   ```bash
   npm install
   ```

3. **Setup Environment Variables**

   Copy the `.env.sample` file to a new file named `.env` and configure the `REACT_BASE_URL` with your backend URL:

   ```plaintext
   REACT_BASEURL_URL=http://localhost:3001
   ```

## Usage

1. **Start the Development Server**

   To run the development server and see the frontend in action, use:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

2. **Build for Production**

   To build the application for production, use:

   ```bash
   npm run build
   ```

   The production build will be located in the `build` directory.

## Configuration

- **API Base URL**: Set the `REACT_BASEURL_URL` in the `.env` file to point to your backend API.


## Contributing

Contributions are welcome! Please follow these guidelines:

- Fork the repository and create a new branch for your changes.
- Ensure your code adheres to the existing style and passes all tests.
- Submit a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact [mohseni.fedros@gmail.com](mailto:mohseni.fedros@gmail.com).

