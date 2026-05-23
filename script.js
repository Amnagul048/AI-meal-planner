// ================= SIGNUP =================

function signup() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("signupEmail").value;

    const password =
        document.getElementById("signupPassword").value;

    fetch("/signup", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name,
            email,
            password
        })
    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        window.location.href = "/";
    });
}


// ================= LOGIN =================

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    fetch("/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    })

    .then(res => res.json())

    .then(data => {

        if (data.status === "success") {

            alert("Login Successful");

            window.location.href = "/dashboard";
        }

        else {

            alert(data.message);
        }
    });
}


// ================= GENERATE PLAN =================

function generatePlan() {

    const name =
        document.getElementById("userName").value;

    const age =
        document.getElementById("age").value;

    const gender =
        document.getElementById("gender").value;

    // NEW ALLERGY

    const allergy =
        document.getElementById("allergy").value;

    const weight =
        document.getElementById("weight").value;

    const height =
        document.getElementById("height").value;

    const goal =
        document.getElementById("goal").value;

    const diet =
        document.getElementById("diet").value;

    // VALIDATION

    if (
        name === "" ||
        age === "" ||
        gender === "" ||
        allergy === "" ||
        weight === "" ||
        height === "" ||
        goal === "" ||
        diet === ""
    ) {

        alert("Please fill all fields");

        return;
    }

    fetch("/meal-plan", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            age,
            gender,
            allergy,
            weight,
            height,
            goal,
            diet
        })
    })

    .then(res => res.json())

    .then(result => {

        console.log(result);

        document.getElementById("result").innerHTML = `

        <div class="result-card">

            <h3>Hello ${result.name}</h3>

            <p><strong>Age:</strong>
            ${result.age}</p>

            <p><strong>Gender:</strong>
            ${result.gender}</p>

            <p><strong>Allergy:</strong>
            ${result.allergy}</p>

            <p><strong>BMI:</strong>
            ${result.bmi}</p>

            <p><strong>Goal:</strong>
            ${result.goal}</p>

            <p><strong>Diet:</strong>
            ${result.diet}</p>

            <p><strong>Advice:</strong>
            ${result.advice}</p>

            <hr>

            <h3>Meal Plan</h3>

            <ul>

              <li>
              Breakfast:
              ${result.meal_plan.breakfast}
              </li>

              <li>
              Lunch:
              ${result.meal_plan.lunch}
              </li>

              <li>
              Dinner:
              ${result.meal_plan.dinner}
              </li>

              <li>
              Snack:
              ${result.meal_plan.snack}
              </li>

            </ul>

        </div>
        `;
    })

    .catch(error => {

        console.log(error);

        alert("Server Error");
    });
}


// ================= CHATBOT =================

function sendMessage() {

    const message =
        document.getElementById("chatInput").value;

    const chatBox =
        document.getElementById("chatBox");

    chatBox.innerHTML += `
      <p><b>You:</b> ${message}</p>
    `;

    fetch("/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message
        })
    })

    .then(res => res.json())

    .then(data => {

        chatBox.innerHTML += `
          <p><b>AI:</b> ${data.reply}</p>
        `;
    });

    document.getElementById("chatInput").value = "";
}


// ================= LOGOUT =================

function logout() {

    window.location.href = "/";
}

const API = "http://127.0.0.1:5000";

// SIGNUP

function signup(){

    fetch(`${API}/signup`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:document.getElementById("name").value,

            email:document.getElementById("email").value,

            password:document.getElementById("password").value
        })
    })

    .then(res=>res.json())

    .then(data=>{

        alert(data.message);
    });
}


// LOGIN

function login(){

    fetch(`${API}/login`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:document.getElementById("email").value,

            password:document.getElementById("password").value
        })
    })

    .then(res=>res.json())

    .then(data=>{

        if(data.status==="success"){

            document.getElementById("authBox").style.display="none";

            document.getElementById("dashboard").style.display="block";
        }

        else{

            alert(data.message);
        }
    });
}


// GENERATE PLAN

function generatePlan(){

    fetch(`${API}/meal-plan`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:document.getElementById("userName").value,

            age:document.getElementById("age").value,

            gender:document.getElementById("gender").value,

            allergy:document.getElementById("allergy").value,

            weight:document.getElementById("weight").value,

            height:document.getElementById("height").value,

            goal:document.getElementById("goal").value,

            diet:document.getElementById("diet").value
            
        })
    })

    .then(res=>res.json())

    .then(data=>{

        document.getElementById("result").innerHTML=`

        <h3>Hello ${data.name}</h3>

        <p><b>Age:</b> ${data.age}</p>

        <p><b>Gender:</b> ${data.gender}</p>

        <p><b>Allergy:</b> ${data.allergy}</p>

        <h3>BMI: ${data.bmi}</h3>

        <p><b>Goal:</b> ${data.goal}</p>

        <p><b>Diet:</b> ${data.diet}</p>

        <ul>

          <li>Breakfast: ${data.meal_plan.breakfast}</li>

          <li>Lunch: ${data.meal_plan.lunch}</li>

          <li>Dinner: ${data.meal_plan.dinner}</li>

          <li>Snack: ${data.meal_plan.snack}</li>

        </ul>
        `;
    });
}


// CHATBOT

function sendMessage(){

    const input =
    document.getElementById("chatInput");

    const message =
    input.value.toLowerCase();

    const chatBox =
    document.getElementById("chatBox");

    if(message === ""){

        return;
    }

    // USER MESSAGE

    chatBox.innerHTML += `

    <div class="user-msg">

        <b>You:</b> ${message}

    </div>
    `;

    let reply = "";

    // AI RESPONSES

    if(message.includes("weight loss")){

        reply =
        "Eat healthy food, reduce sugar, and exercise daily.";
    }

    else if(message.includes("weight gain")){

        reply =
        "Increase protein, milk, rice, eggs, and calorie intake.";
    }

    else if(message.includes("protein")){

        reply =
        "Eggs, chicken, fish, milk, yogurt, and nuts are high in protein.";
    }

    else if(message.includes("water")){

        reply =
        "Drink 2 to 3 liters of water daily.";
    }

    else if(message.includes("exercise")){

        reply =
        "Walking, cardio, gym, and stretching are good exercises.";
    }

    else if(message.includes("diet")){

        reply =
        "A balanced diet includes protein, vegetables, fruits, and water.";
    }

    else if(message.includes("bmi")){

        reply =
        "BMI helps measure body fitness based on height and weight.";
    }

    else if(message.includes("hello")){

        reply =
        "Hello 👋 How can I help you with fitness and diet?";
    }

    else{

        reply =
        "I can help with diet, fitness, BMI, protein, water, and exercise questions.";
    }

    // AI MESSAGE

    chatBox.innerHTML += `

    <div class="ai-msg">

        <b>AI:</b> ${reply}

    </div>
    `;

    input.value = "";

    chatBox.scrollTop =
    chatBox.scrollHeight;
}

function downloadPDF(){

    const result =
    document.getElementById("result").innerText;

    if(result === ""){

        alert("Generate a meal plan first");

        return;
    }

    const blob = new Blob(
        [result],
        {type:"text/plain"}
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "diet_plan.txt";

    link.click();


   
    // NEW INGREDIENTS

    const ingredients =
        document.getElementById("ingredients").value;

    // NEW CALORIES

    const calories =
        document.getElementById("calories").value;

    const weight =
        document.getElementById("weight").value;

    const height =
        document.getElementById("height").value;

    const goal =
        document.getElementById("goal").value;

    const diet =
        document.getElementById("diet").value;

    fetch(`${API}/meal-plan`, {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            age,
            gender,
            allergy,
            ingredients,
            calories,
            weight,
            height,
            goal,
            diet
        })
    })

    .then(res=>res.json())

    .then(data=>{

        document.getElementById("result").innerHTML=`

        <h3>Hello ${data.name}</h3>

        <p><b>Age:</b> ${data.age}</p>

        <p><b>Gender:</b> ${data.gender}</p>

        <p><b>Allergy:</b> ${data.allergy}</p>

        <p><b>Ingredients:</b> ${data.ingredients}</p>

        <p><b>Calories Goal:</b> ${data.calories}</p>

        <h3>BMI: ${data.bmi}</h3>

        <p><b>Goal:</b> ${data.goal}</p>

        <p><b>Diet:</b> ${data.diet}</p>

        <h2>7 Days Meal Plan</h2>

        <ul>

          <li><b>Day 1:</b> ${data.meal_plan.day1}</li>

          <li><b>Day 2:</b> ${data.meal_plan.day2}</li>

          <li><b>Day 3:</b> ${data.meal_plan.day3}</li>

          <li><b>Day 4:</b> ${data.meal_plan.day4}</li>

          <li><b>Day 5:</b> ${data.meal_plan.day5}</li>

          <li><b>Day 6:</b> ${data.meal_plan.day6}</li>

          <li><b>Day 7:</b> ${data.meal_plan.day7}</li>

        </ul>
        `;
    });
}
// ================= GENERATE PLAN =================

function generatePlan() {

    const name =
        document.getElementById("userName").value;

    const age =
        document.getElementById("age").value;

    const gender =
        document.getElementById("gender").value;

    const allergy =
        document.getElementById("allergy").value;

    const ingredients =
        document.getElementById("ingredients").value;

    const calories =
        document.getElementById("calories").value;

    const weight =
        document.getElementById("weight").value;

    const height =
        document.getElementById("height").value;

    const goal =
        document.getElementById("goal").value;

    const diet =
        document.getElementById("diet").value;

    // VALIDATION

    if (
        name === "" ||
        age === "" ||
        gender === "" ||
        allergy === "" ||
        ingredients === "" ||
        calories === "" ||
        weight === "" ||
        height === "" ||
        goal === "" ||
        diet === ""
    ) {

        alert("Please fill all fields");

        return;
    }

    fetch(`${API}/meal-plan`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name,
            age,
            gender,
            allergy,
            ingredients,
            calories,
            weight,
            height,
            goal,
            diet
        })
    })

    .then(res => res.json())

    .then(data => {

        console.log(data);

        document.getElementById("result").innerHTML = `

        <div class="result-card">

            <h2>Hello ${data.name}</h2>

            <p><b>Age:</b> ${data.age}</p>

            <p><b>Gender:</b> ${data.gender}</p>

            <p><b>Allergy:</b> ${data.allergy}</p>

            <p><b>Ingredients:</b> ${data.ingredients}</p>

            <p><b>Calories Goal:</b> ${data.calories}</p>

            <p><b>BMI:</b> ${data.bmi}</p>

            <p><b>Goal:</b> ${data.goal}</p>

            <p><b>Diet:</b> ${data.diet}</p>

            <hr>

            <h2>7 Days Meal Plan</h2>

            <ul>

                <li><b>Day 1:</b> ${data.meal_plan.day1}</li>

                <li><b>Day 2:</b> ${data.meal_plan.day2}</li>

                <li><b>Day 3:</b> ${data.meal_plan.day3}</li>

                <li><b>Day 4:</b> ${data.meal_plan.day4}</li>

                <li><b>Day 5:</b> ${data.meal_plan.day5}</li>

                <li><b>Day 6:</b> ${data.meal_plan.day6}</li>

                <li><b>Day 7:</b> ${data.meal_plan.day7}</li>

            </ul>

        </div>
        `;
    })

    .catch(error => {

        console.log(error);

        alert("Server Error");
    });
}
