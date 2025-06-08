# InkSpire

InkSpire is a full-stack blogging platform designed for developers. It features Markdown editing, AI-powered content assistance, blog analytics, and admin controls. Built with modern technologies, it provides a seamless experience for both writers and readers.

## Features

- **AI-Powered Assistance**: Generate blog titles, outlines, and summaries using AI.
- **Rich Text Editing**: Create and edit blogs with a Markdown editor powered by TinyMCE and Lexical.
- **User Authentication**: Secure login and registration with JWT-based authentication.
- **Blog Management**: Create, edit, delete, and bookmark blogs.
- **Analytics Dashboard**: View blog statistics, including views, likes, and monthly activity.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and DaisyUI.
- **Dark Mode**: Toggle between light and dark themes.

## Tech Stack

### Frontend
- **React**: Component-based UI development.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework.
- **DaisyUI**: Tailwind CSS components.
- **Framer Motion**: Animations and transitions.

### Backend
- **Node.js**: JavaScript runtime.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.

### AI Integration
- **Gemini**: AI-powered content generation.

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/inkspire.git
   cd inkspire
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `client` and `server` directories.
   - Add the following variables:
     - **Client**:
       ```env
       VITE_URL=http://localhost:5000/api
       ```
     - **Server**:
       ```env
       MONGO_URI=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret
       CLOUDINARY_URL=your_cloudinary_url
       ```

4. Start the development servers:
   - **Client**:
     ```bash
     cd client
     npm run dev
     ```
   - **Server**:
     ```bash
     cd server
     npm start
     ```

5. Open the app in your browser:
   ```
   http://localhost:5173
   ```

## Folder Structure

```
InkSpire/
├── client/          # Frontend code
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── Pages/       # Application pages
│   │   ├── redux/       # Redux state management
│   │   ├── context/     # Context providers
│   │   └── api/         # API integration
│   └── public/          # Static assets
├── server/          # Backend code
│   ├── controllers/    # API controllers
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── middlewares/    # Express middlewares
│   └── utils/          # Utility functions
└── README.md        # Project documentation
```

## Deployment

The application is live at: [InkSpire](https://ink-spire-lac.vercel.app/)

```
