from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# ================= APP =================

app = Flask(__name__)
CORS(app)

# ================= GEMINI AI =================

genai.configure(api_key="YOUR_GEMINI_API_KEY")

model = genai.GenerativeModel("gemini-1.5-flash")

# ================= USERS =================

users = {}

# ================= FOOD DATABASE =================

FOODS = {

    "Weight Loss": {

        "Vegetarian": [
            "Oats + Milk",
            "Salad + Yogurt",
            "Vegetable Soup",
            "Green Tea"
        ],

        "Non-Vegetarian": [
            "Egg Whites",
            "Chicken Salad",
            "Soup",
            "Boiled Eggs"
        ],

        "Vegan": [
            "Fruit Smoothie",
            "Quinoa Salad",
            "Vegan Soup",
            "Nuts"
        ],

        "Keto": [
            "Boiled Eggs",
            "Chicken Salad",
            "Avocado",
            "Cheese"
        ],

        "High Protein": [
            "Protein Shake",
            "Chicken Breast",
            "Fish",
            "Greek Yogurt"
        ],

        "Low Carb": [
            "Egg Salad",
            "Vegetables",
            "Soup",
            "Nuts"
        ],

        "Mediterranean": [
            "Olive Salad",
            "Fish + Rice",
            "Greek Salad",
            "Fruits"
        ]
    },

    "Weight Gain": {

        "Vegetarian": [
            "Banana Shake",
            "Paneer Rice",
            "Peanut Butter",
            "Milk"
        ],

        "Non-Vegetarian": [
            "Chicken Rice",
            "Eggs",
            "Beef Rice",
            "Protein Shake"
        ],

        "Vegan": [
            "Banana Smoothie",
            "Rice + Beans",
            "Vegan Pasta",
            "Dry Fruits"
        ],

        "Keto": [
            "Egg Omelette",
            "Chicken Steak",
            "Cheese",
            "Nuts"
        ],

        "High Protein": [
            "Protein Shake",
            "Chicken Rice",
            "Eggs",
            "Milk"
        ],

        "Low Carb": [
            "Chicken Salad",
            "Fish",
            "Vegetables",
            "Cheese"
        ],

        "Mediterranean": [
            "Rice + Fish",
            "Olive Pasta",
            "Salad",
            "Yogurt"
        ]
    },

    "Maintain Weight": {

        "Vegetarian": [
            "Oats",
            "Rice + Vegetables",
            "Fruits",
            "Yogurt"
        ],

        "Non-Vegetarian": [
            "Eggs",
            "Chicken",
            "Fruits",
            "Soup"
        ],

        "Vegan": [
            "Oats + Fruits",
            "Beans + Rice",
            "Vegetable Soup",
            "Smoothie"
        ],

        "Keto": [
            "Eggs",
            "Chicken Salad",
            "Avocado",
            "Cheese"
        ],

        "High Protein": [
            "Eggs",
            "Chicken",
            "Fish",
            "Milk"
        ],

        "Low Carb": [
            "Vegetables",
            "Soup",
            "Chicken",
            "Nuts"
        ],

        "Mediterranean": [
            "Olive Salad",
            "Fish",
            "Vegetables",
            "Yogurt"
        ]
    }
}

# ================= SIGNUP =================

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:

        return jsonify({
            "message": "Please fill all fields"
        })

    if email in users:

        return jsonify({
            "message": "User already exists"
        })

    users[email] = {
        "name": name,
        "password": password
    }

    return jsonify({
        "message": "Signup Successful"
    })

# ================= LOGIN =================

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    if email in users and users[email]["password"] == password:

        return jsonify({
            "status": "success",
            "message": "Login Successful"
        })

    return jsonify({
        "status": "fail",
        "message": "Invalid Credentials"
    })

# ================= MEAL PLAN =================

@app.route("/meal-plan", methods=["POST"])
def meal_plan():

    data = request.json

    name = data.get("name")
    age = data.get("age")
    gender = data.get("gender")
    allergy = data.get("allergy")

    # NEW FEATURES

    ingredients = data.get("ingredients")
    calories = data.get("calories")

    weight = data.get("weight")
    height = data.get("height")
    goal = data.get("goal")
    diet = data.get("diet")

    if not name or not age or not gender or not allergy or not ingredients or not calories or not weight or not height or not goal or not diet:

        return jsonify({
            "message": "Please fill all fields"
        })

    weight = float(weight)
    height = float(height)

    bmi = weight / ((height / 100) ** 2)

    meals = FOODS.get(goal, {}).get(diet)

    if not meals:

        return jsonify({
            "message": "Meal plan not found"
        })

    # 7 DAYS MEAL PLAN

    weekly_plan = {

        "day1": meals[0],
        "day2": meals[1],
        "day3": meals[2],
        "day4": meals[3],
        "day5": meals[0],
        "day6": meals[1],
        "day7": meals[2]
    }

    return jsonify({

        "name": name,

        "age": age,

        "gender": gender,

        "allergy": allergy,

        "ingredients": ingredients,

        "calories": calories,

        "bmi": round(bmi, 2),

        "goal": goal,

        "diet": diet,

        "advice": "Your AI personalized diet plan is ready.",

        # DAILY PLAN

        "meal_plan": {

            "breakfast": meals[0],

            "lunch": meals[1],

            "dinner": meals[2],

            "snack": meals[3]
        },

        # WEEKLY PLAN

        "weekly_plan": weekly_plan
    })

# ================= CHATBOT =================

@app.route("/chat", methods=["POST"])
def chat():

    data = request.json

    message = data.get("message")

    if not message:

        return jsonify({
            "reply": "Please ask something."
        })

    try:

        prompt = f"""
        You are a professional nutrition AI assistant.

        User Question:
        {message}
        """

        response = model.generate_content(prompt)

        return jsonify({
            "reply": response.text
        })

    except:

        return jsonify({
            "reply": "AI service unavailable right now."
        })

# ================= RUN =================

if __name__ == "__main__":

    app.run(debug=True)