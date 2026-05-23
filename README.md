# 🥗 AI Meal Planner

A web-based application that generates personalized 7-day meal plans using Artificial Intelligence. Built with Python Flask backend and HTML/CSS/JavaScript frontend, powered by Google Gemini AI.

---

## 🚀 Features

- 🔐 User Registration & Login
- 📊 BMI Calculator (auto from weight & height)
- 🍽️ 7-Day Personalized Meal Plan Generator
- 🤖 AI Chatbot (Google Gemini AI) for diet queries
- 📥 Download meal plan as a text file
- 🥦 Supports 7 diet types × 3 fitness goals

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python Flask |
| Database | SQLite (via SQLAlchemy) |
| AI | Google Gemini AI (`google-genai`) |

---

## 📁 Project Structure

```
AI-meal-planner/
├── backend/
│   └── app.py          # Flask backend (API + DB + AI)
├── index.html          # Main frontend page
├── style.css           # Styling
├── script.js           # Frontend logic & API calls
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/AI-meal-planner.git
cd AI-meal-planner
```

### 2. Create Virtual Environment
```bash
python -m venv .venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
.venv\Scripts\activate
```

**Mac/Linux:**
```bash
source .venv/bin/activate
```

### 4. Install Dependencies
```bash
.venv\Scripts\python.exe -m pip install flask flask-cors flask-sqlalchemy google-genai
```

### 5. Add Your Gemini API Key

Open `backend/app.py` and replace the API key:
```python
GEMINI_API_KEY = "your_api_key_here"
```

Get a free API key from: https://aistudio.google.com/apikey

### 6. Run the Backend
```bash
.venv\Scripts\python.exe backend/app.py
```

Flask will start at: `http://127.0.0.1:5000`

### 7. Open the Frontend

Open `index.html` with VS Code Live Server or any browser.

---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/signup` | POST | Register a new user |
| `/login` | POST | Login existing user |
| `/meal-plan` | POST | Generate 7-day meal plan |
| `/chat` | POST | AI chatbot response |

---

## 🥗 Supported Diet Types

| Goal | Diet Types |
|------|-----------|
| Weight Loss | Vegetarian, Non-Vegetarian, Vegan, Keto, High Protein, Low Carb, Mediterranean |
| Weight Gain | Vegetarian, Non-Vegetarian, Vegan, Keto, High Protein, Low Carb, Mediterranean |
| Maintain Weight | Vegetarian, Non-Vegetarian, Vegan, Keto, High Protein, Low Carb, Mediterranean |

---

## 📸 How to Use

1. **Register** with your name, email, and password
2. **Login** to access the dashboard
3. Fill in your **health details** (age, weight, height, goal, diet type, etc.)
4. Click **Generate Plan** to get your 7-day meal plan
5. Use the **AI Chatbot** to ask diet-related questions
6. **Download** your meal plan as a text file

---

## 🔮 Future Enhancements

- Mobile application (Android/iOS)
- Calorie tracking & nutritional breakdown
- User meal plan history
- Admin panel
- Multi-language support (Urdu, Arabic)

---

## 📄 License

This project is for educational purposes — Web Engineering Course Project.
