# Avas Project

Avas is a modern, eco-friendly property listing and booking platform inspired by Airbnb. It enables users to explore, create, and manage property listings, book stays, and leave reviews—all with a strong Go Green theme and a mobile-first, engaging UI/UX.

---

## ✨ Features

- **User Authentication**: Secure signup, login, and logout for all users.
- **Property Listings**: Create, edit, and delete listings with image uploads (JPG/PNG, max 2MB).
- **Search & Explore**: Filter by price, category, and sort order. Use interactive sliders and badges for a fun experience.
- **Responsive Design**: Fully mobile-friendly, with a modern navbar, filter UI, and grid-based listings.
- **Go Green Theme**: Animated green campaign, floating leaves, and eco-friendly messaging throughout the site.
- **Engaging Homepage**: Welcome banner, property tips, and interactive filter slider.
- **Show Page**: Booking calendar, cart summary (base price, tax, total), reviews, and similar properties.
- **Footer**: Animated, colorful, and engaging social/contact icons. "Contact Us" button opens mailto to harilalsahk@gmail.com. Green campaign and quick links.
- **Accessibility**: Flash messages and filter UIs are mobile-friendly and accessible.
- **All client-side scripts** are organized in `public/js` for maintainability.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Frontend**: EJS templating, Bootstrap 5, FontAwesome, Animate.css
- **Image Uploads**: Multer & Cloudinary
- **Authentication**: Passport.js
- **Custom CSS**: listings.css, navbar.css, style.css

---

## 📁 Folder Structure

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

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory with:
     ```env
     CLOUD_NAME=your_cloudinary_name
     CLOUD_API_KEY=your_cloudinary_api_key
     CLOUD_API_SECRET=your_cloudinary_api_secret
     ATLASDB_URL=your_mongodb_connection_string
     SECRET=your_session_secret
     ```
4. **Start the development server:**
   ```sh
   npm start
   ```
5. **Visit** `http://localhost:8080` in your browser.

---

## 📸 Image Upload Limitations

- Only `.jpg`, `.jpeg`, and `.png` files are allowed.
- Maximum file size: 2MB (enforced on both frontend and backend).

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Suggestions for new features, bug fixes, and improvements are highly encouraged.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🔮 Future Plans

- Add support for property booking calendar and availability management
- Integrate payment gateway for secure online bookings
- Implement user profile pages and messaging between users
- Add map integration for property locations
- Improve accessibility and add multi-language support
- Enhance admin dashboard for better listing and user management
- Add automated email notifications for bookings and reviews
- Expand API endpoints for mobile app integration
- Improve test coverage and add CI/CD workflows

---

## 📬 Contact

- Email: [harilalsahk@gmail.com](mailto:harilalsahk@gmail.com)
- Instagram: [@iamdh.iraj](https://www.instagram.com/iamdh.iraj/)
- LinkedIn: [Harilal Sah](https://www.linkedin.com/in/harilal-sah9/)

---

**Avas** — Every booking helps plant trees and support eco-friendly stays. Let's make the world greener together!
