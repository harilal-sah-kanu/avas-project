# Avas Project

Avas is a modern, eco-friendly property listing and booking platform inspired by Airbnb. It enables users to explore, create, and manage property listings, book stays, and leave reviews—all with a mobile-first, engaging UI/UX.

---

## 📌 Recent Updates

- **Enhanced UI/UX**: Improved filter interface with better visibility and cleaner design
- **Mobile Optimization**: Enhanced date picker functionality for better mobile device compatibility
- **Code Cleanup**: Removed unnecessary elements and optimized codebase for better performance
- **Bug Fixes**: Resolved various UI inconsistencies and improved overall user experience

---

## ✨ Features

- **User Authentication**: Secure signup, login, and logout for all users.
- **Property Listings**: Create, edit, and delete listings with image uploads (JPG/PNG, max 2MB).
- **Advanced Filters**: Filter by price range, category, and sort order with an intuitive interface.
- **Responsive Design**: Fully mobile-friendly with modern navbar, enhanced filter UI, and grid-based listings.
- **Interactive Elements**: Dynamic category slider, booking calendar with date selection, and cart summary.
- **Show Page**: Property details with booking calendar, price calculation (base price, tax, total), reviews, and similar properties.
- **Modern Footer**: Clean, compact design with social links and quick navigation.
- **Accessibility**: Mobile-optimized date pickers, flash messages, and accessible filter interfaces.
- **Organized Codebase**: All client-side scripts in `public/js` for better maintainability.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Frontend**: EJS templating, Bootstrap 5, FontAwesome icons
- **Image Uploads**: Multer & Cloudinary integration
- **Authentication**: Passport.js with session management
- **Custom Styling**: Modular CSS (listings.css, navbar.css, style.css, etc.)

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

- Property booking calendar and availability management system
- Payment gateway integration for secure online transactions
- User profile pages with booking history and preferences
- Real-time messaging between hosts and guests
- Interactive map integration for property locations
- Multi-language support for international users
- Enhanced admin dashboard for listings and user management
- Email notifications for bookings, reviews, and updates
- Mobile app development with API expansion
- Comprehensive test coverage and CI/CD implementation

---

## 📬 Contact

For any questions, suggestions, or collaboration opportunities:

- **Email**: [harilalsahk@gmail.com](mailto:harilalsahk@gmail.com)
- **Instagram**: [@iamdh.iraj](https://www.instagram.com/iamdh.iraj/)
- **LinkedIn**: [Harilal Sah](https://www.linkedin.com/in/harilal-sah9/)
- **Facebook**: [Hareelal Sah](https://www.facebook.com/hareelal13/)

---

**Avas** — Your trusted platform for finding and booking unique properties worldwide.
