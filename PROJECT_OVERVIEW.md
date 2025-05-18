# Project Overview: avas-project

## Project Purpose

Avas is a property listing and booking platform. It allows users to explore, create, and manage property listings, sign up, log in, and leave reviews. The project is designed for learning and practical application of full-stack web development using Node.js, Express, MongoDB, and EJS.

---

## Main Technologies & Their Purpose

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for routing, middleware, and server logic.
- **MongoDB & Mongoose**: NoSQL database and ODM for storing users, listings, and reviews.
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **Passport.js**: Handles user authentication (signup, login, session management). Provides strategies for local authentication and session support.
- **Multer**: Middleware for handling file uploads (images) from forms.
- **Cloudinary**: Cloud service for storing and serving uploaded images securely.
- **Bootstrap 5**: CSS framework for responsive and modern UI.
- **dotenv**: Loads environment variables from a .env file into process.env.
- **Joi**: Used for schema validation of user input (e.g., listing forms).
- **express-session**: Manages user sessions for authentication.
- **connect-flash**: Provides flash messages for user feedback (e.g., login errors).
- **method-override**: Allows HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- **nodemon** (dev): Automatically restarts the server on file changes during development.

---

## API Connections: Authentication & Authorization

- **Authentication**

  - Uses Passport.js with the LocalStrategy for username/password authentication.
  - Endpoints:
    - `POST /users/signup` — Register a new user.
    - `POST /users/login` — Log in an existing user.
    - `GET /users/logout` — Log out the current user.
  - Session-based authentication: User info is stored in a session (via express-session) after login.

- **Authorization**
  - Middleware checks if a user is logged in before allowing access to certain routes (e.g., creating/editing/deleting listings, leaving reviews).
  - Example middleware: `isLoggedIn`, `isAuthor` (checks if the user is the author of a listing/review).
  - Endpoints protected by authorization:
    - `POST /listings` — Create a new listing (requires login).
    - `PUT /listings/:id` — Edit a listing (requires login and ownership).
    - `DELETE /listings/:id` — Delete a listing (requires login and ownership).
    - `POST /listings/:id/reviews` — Add a review (requires login).
    - `DELETE /listings/:id/reviews/:reviewId` — Delete a review (requires login and ownership).

---

## Folder & File Structure Explained

- **app.js**: Entry point; sets up Express app, middleware, routes, and error handling.
- **cloudConfig.js**: Configures Cloudinary for image uploads.
- **middleware.js**: Custom Express middleware (e.g., authentication checks, error handling).
- **schema.js**: Joi validation schemas for validating user input (e.g., listing forms).
- **package.json**: Project metadata and dependencies.
- **README.md**: Project instructions and overview.

### Folders

- **controllers/**: Route handler logic for listings, reviews, and users.
  - `listing.js`: Listing CRUD logic.
  - `review.js`: Review CRUD logic.
  - `users.js`: User authentication and profile logic.
- **models/**: Mongoose schemas/models for MongoDB collections.
  - `listing.js`: Listing schema.
  - `review.js`: Review schema.
  - `user.js`: User schema.
- **routes/**: Express route definitions.
  - `listing.js`: Listing-related routes.
  - `review.js`: Review-related routes.
  - `search.js`: Search functionality routes.
  - `user.js`: User authentication/profile routes.
- **utils/**: Utility/helper functions.
  - `expressError.js`: Custom error class for Express.
  - `wrapAsync.js`: Helper to catch async errors in routes.
- **init/**: Database seeding and initialization scripts.
  - `data.js`: Sample data for seeding.
  - `index.js`: Script to seed the database.
- **public/**: Static assets served to the client.
  - **css/**: Stylesheets (navbar, listings, etc.).
  - **images/**: Static images (logo, icons, etc.).
  - **js/**: Client-side JavaScript (listing page, general scripts).
- **views/**: EJS templates for rendering HTML.
  - **includes/**: Partial templates (navbar, footer, flash messages).
  - **layouts/**: Base layout template.
  - **listings/**: Listing-related pages (index, show, edit, new, search results, listing card partial).
  - **users/**: User-related pages (login, signup).
  - `error.ejs`: Error page.
  - `home.ejs`: Home page.

---

## How the Pieces Fit Together

- **User requests** are routed by Express (in `app.js`), handled by controllers, and interact with MongoDB via Mongoose models.
- **Authentication** is managed by Passport.js, with session support.
- **Image uploads** are handled by Multer (for file parsing) and Cloudinary (for storage).
- **Frontend** is rendered using EJS templates, styled with Bootstrap and custom CSS.
- **Validation** is enforced using Joi schemas.
- **Error handling** is centralized via custom middleware and utility classes.

---

## Development Scripts

- `npm start`: Runs the server (production mode).
- `npm run dev`: Runs the server with nodemon for auto-reloading during development.

---

## Notes

- Environment variables (in `.env`) are required for Cloudinary, MongoDB, and session secret.
- Only image files (`.jpg`, `.jpeg`, `.png`) up to 2MB are allowed for uploads.

---

This file is for your personal reference. You can expand it as your project grows or as you add new features.
---

## Additional Project Details

### Environment Variables Required

Create a `.env` file in the project root with the following variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### User Roles

- **Guest**: Can browse listings and view details.
- **Registered User**: Can create listings, leave reviews, and manage their own content.
- **Admin** (optional, if implemented): Can manage all listings and users.

### Key Features

- User registration and login with secure password hashing.
- Create, edit, and delete property listings with image uploads.
- Leave and manage reviews on listings.
- Search and filter listings by location, price, and keywords.
- Flash messages for user feedback (success, errors).
- Responsive design for mobile and desktop.

### Planned Enhancements

- Add user profile editing.
- Implement advanced search and filtering.
- Integrate map view for listings.
- Add pagination for listings and reviews.

---