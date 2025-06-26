
# Smart Bus Pass - Digital Bus Pass Solution

## What is this website for?

Smart Bus Pass is a digital platform designed to simplify and modernize the process of applying for, approving, and managing student bus passes. It eliminates paperwork and long queues by allowing students to apply online, and enables admins and depot staff to review, approve, and issue digital bus passes efficiently.

**Key Features:**
- Students can apply for new or renewal bus passes online and upload required documents.
- Admins (e.g., school/college staff) can review, approve, or reject applications and add digital stamps/signatures.
- Depot staff can finalize passes, request payment, and issue the final digital bus pass.
- All users have dashboards to track application status and history.
- Email OTP authentication and notifications are built-in.

This project is ideal for educational institutions and transport authorities looking to digitize and streamline their bus pass workflows.

## Project Structure

```
SMART_PASS_WEBSITE-
│
├── BACKEND/         # Node.js/Express backend (API, DB models, controllers)
├── FRONTEND/        # HTML/CSS/JS frontend (static, no build step)
```

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud, e.g. MongoDB Atlas)

## Setup Instructions

### 1. Clone the Repository
```
git clone <your-fork-or-clone-url>
cd SMART_PASS_WEBSITE-
```

### 2. Configure the Backend
1. Go to the `BACKEND` folder:
   ```
   cd BACKEND
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the `BACKEND` folder with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/smartbuspass   # or your MongoDB Atlas URI
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```
   - Change `MONGODB_URI` to your MongoDB connection string if using Atlas.
   - Change `JWT_SECRET` to a secure random string.
   - Change `PORT` if you want a different backend port.

### 3. Start the Backend Server
```
npm start
```
- The backend will run on `http://localhost:5000` by default.

### 4. Configure the Frontend
- The frontend is static and does not require a build step.
- Open `FRONTEND/js/main.js` (and other JS files if needed) and ensure the `API_BASE_URL` points to your backend, e.g.:
  ```js
  const API_BASE_URL = 'http://localhost:5000/api';
  ```
- If deploying, update this URL to your backend server address.

### 5. Run the Frontend
- You can open `FRONTEND/index.html` directly in your browser for local development.
- For best results, use a local static server (e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) VS Code extension, or `npx serve`):
  ```
  npx serve FRONTEND
  ```
- The app will be available at `http://localhost:3000` (or another port).


## Email Sending Setup
The backend uses an email account to send OTPs and notifications (e.g., via Gmail SMTP).

### 1. Change the Sender Email
- Open `BACKEND/.env` and add or update these variables:
  ```
  EMAIL_USER=your_email@gmail.com
  EMAIL_PASS=your_app_password
  ```
- Replace `your_email@gmail.com` with the Gmail address you want to send emails from.

### 2. Create an App Password (Gmail)
If you use Gmail, you must use an **App Password** (not your normal password):
1. Go to [Google Account Security](https://myaccount.google.com/security).
2. Enable 2-Step Verification if not already enabled.
3. Under "Signing in to Google," find **App Passwords**.
4. Generate a new app password for "Mail" and "Other" (give it a name like `SmartBusPass`).
5. Copy the generated 16-character password and use it as `EMAIL_PASS` in your `.env`.

### 3. How It Works
- The backend uses these credentials to log in to Gmail's SMTP server and send emails (e.g., OTPs for login/signup).
- Your password is never exposed to users; only the backend uses it.
- If you change your Gmail password or disable 2FA, you must update/regenerate the app password.

**Note:** If you use another email provider, update the backend mail config accordingly (host, port, user, pass).

## What You Need to Change
- **MongoDB URI**: Update `.env` in `BACKEND` with your MongoDB connection string.
- **JWT Secret**: Set a secure value in `.env`.
- **API URLs**: Update `API_BASE_URL` in frontend JS if your backend is not on `localhost:5000`.
- **Uploads Folder**: Ensure `BACKEND/uploads` exists and is writable for file uploads.
- **Email Credentials**: Set `EMAIL_USER` and `EMAIL_PASS` in `.env` as described above.

## Common Issues
- CORS errors: Make sure backend allows requests from your frontend origin.
- MongoDB connection errors: Check your URI and that MongoDB is running.
- File upload errors: Ensure the `uploads` directory exists and is writable.

## License
MIT

---
For questions or issues, open an issue on GitHub or contact the maintainer.
