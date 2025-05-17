# avas-project

Avas is a property listing and booking platform built with Node.js, Express, MongoDB, and EJS. Users can explore, create, and manage property listings, as well as sign up, log in, and leave reviews.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete property listings
- Upload property images (with file size/type restrictions)
- Search and explore listings
- Leave reviews on listings
- Responsive, modern UI with custom navbar

## Tech Stack

- Node.js, Express.js
- MongoDB & Mongoose
- EJS templating
- Passport.js authentication
- Multer & Cloudinary for image uploads
- Bootstrap 5 for UI

## Folder Structure

```
├── app.js                  # Main Express app
├── controllers/            # Route controllers
├── models/                 # Mongoose models
├── routes/                 # Express route files
├── views/                  # EJS templates
│   ├── includes/           # Navbar, footer, flash
│   ├── layouts/            # Boilerplate layout
│   └── listings/           # Listing pages
├── public/
│   ├── css/                # CSS files (navbar.css, style.css, etc.)
│   ├── images/             # Static images
│   └── js/                 # Client-side JS
├── utils/                  # Utility functions
├── middleware.js           # Custom middleware
├── schema.js               # Joi validation schemas
├── cloudConfig.js          # Cloudinary config
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd Project
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory with:
     ```env
     CLOUD_NAME=your_cloudinary_name
     CLOUD_API_KEY=your_cloudinary_api_key
     CLOUD_API_SECRET=your_cloudinary_api_secret
     ATLASDB_URL=your_mongodb_connection_string
     SECRET=your_session_secret
     ```
4. Start the development server:
   ```sh
   npm start
   ```
5. Visit `http://localhost:8080` in your browser.

## Image Upload Limitations

- Only `.jpg`, `.jpeg`, and `.png` files are allowed.
- Maximum file size: 2MB (enforced on both frontend and backend).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
