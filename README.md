# La-Routine-New
E-commerce platform for the "La-Routine-New" clothing brand.

---

## About
La-Routine-New is an online store designed for a seamless shopping experience. It allows customers to browse and purchase fashionable clothing items while ensuring secure data handling and email notifications.

---

## Features
- **Product Browsing:** View a wide selection of clothing items.
- **Purchase Functionality:** Add products to the cart and complete purchases.
- **Customer Data Submission:** Automatically sends customer details and order information to the admin's email.
- **Dynamic Product Management:** Load products directly from a MongoDB database.

---

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB
- **Version Control:** Git

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/username/la-routine-new.git
   ```

2. Navigate to the project directory:
   ```bash
   cd la-routine-new
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the root directory with the following keys:
   ```env
   MONGO_URI=your_mongodb_connection_string
   EMAIL_SERVICE=your_email_service_provider
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

5. Start the application:
   ```bash
   npm start
   ```
   
---

## Usage
- Browse products by category or search for specific items.
- Add items to your cart and proceed to checkout.
- Provide your details to complete the order. An email with the order details will be sent to the admin.
  
---

## API Endpoints

### Products
- **GET /api/products**: Fetch all products.
- **GET /api/products/:id**: Fetch a specific product.

### Orders
- **POST /api/orders**: Place a new order. Sends an email with order details.

---

## Contributing
We welcome contributions! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push them:
   ```bash
   git commit -m "Add feature"
   git push origin feature-name
   ```
4. Submit a pull request.

---


## Note
This project is for educational purposes only and does not include licensing, support, or active maintenance.


---


## Acknowledgments
- Thanks to the La-Routine-New team for inspiration.
- Special thanks to our early adopters for their feedback.

---

## Built With
- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://www.mongodb.com/) - Database

