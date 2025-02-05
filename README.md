# 🌍 AI-Powered Travel Planner

An AI-based travel website that generates personalized trip recommendations using FastAPI (DeepSeek-R1) and React (TailwindCSS).

## 📌 Features

✅ Enter a destination, budget, and interests, and get an AI-generated itinerary.  
✅ Uses FastAPI as the backend, powered by DeepSeek-R1.  
✅ Frontend built with React + TailwindCSS, served via NGINX.  
✅ Dockerized for easy deployment using Docker Compose.

---

## 🛏️ Project Structure
```
travel-ai/
│── backend/               # FastAPI backend
│   ├─ app.py             # FastAPI API server
│   ├─ requirements.txt   # Python dependencies
│   └─ Dockerfile         # Backend Docker config
│── frontend/              # React frontend
│   ├─ src/               # React components
│   ├─ public/            # Static assets
│   ├─ package.json       # React dependencies
│   └─ Dockerfile         # Frontend Docker config
│── docker-compose.yml     # Manages both backend & frontend containers
│── README.md              # Project Documentation
```

---

## 🔹 Prerequisites
Ensure you have the following installed:

- **Docker** 🐫 [Download Here](https://www.docker.com/get-started)
- **Node.js 18+** [Download Here](https://nodejs.org/)
- **Python 3.9+** [Download Here](https://www.python.org/)

---

## 🚀 Quick Start
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/travel-ai.git
cd travel-ai
```

### 2️⃣ Run Everything with Docker
```bash
docker compose up --build
```
This builds and starts both the frontend (React) and backend (FastAPI).

---

## 🔹 Access the Website
| **Service** | **URL** |
|------------|---------|
| **Frontend (React Travel Website)** | 📌 [http://localhost:3000](http://localhost:3000) |
| **Backend (FastAPI API Docs - Swagger UI)** | 📌 [http://localhost:8000/docs](http://localhost:8000/docs) |

---

## 👩‍💻 API Documentation
Once the backend is running, you can test the API at **http://localhost:8000/docs**.

### 📌 Example API Request
```bash
curl -X GET "http://localhost:8000/recommend/?destination=Paris&budget=mid-range&interests=culture"
```

#### 🔹 Response:
```json
{
  "destination": "Paris",
  "recommendation": "Explore the Louvre, visit the Eiffel Tower, enjoy authentic French cuisine..."
}
```

---

## 🔹 Stopping the Containers
```bash
docker compose down
```

---

## ⚠️ Troubleshooting

### 1️⃣ Backend Not Running?
Run:
```bash
docker logs <backend-container-id>
```
Restart with:
```bash
docker compose up --build
```

### 2️⃣ Frontend Not Loading?
Run:
```bash
docker logs <frontend-container-id>
```
Ensure the frontend React app is running:
```bash
cd frontend
npm start
```

### 3️⃣ CORS Issues?
If the frontend gets a **CORS policy error**, ensure `backend/app.py` has:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
Then restart the backend.

---

## 📌 Deployment

### 🔹 Deploying with Docker
To deploy to **AWS / GCP / Azure**, use:
```bash
docker compose up -d
```
This runs everything in **detached mode**.

### 🔹 Deploying Frontend (Vercel)
Install Vercel CLI:
```bash
npm install -g vercel
```
Deploy:
```bash
vercel
```

### 🔹 Deploying Backend (AWS EC2 or DigitalOcean)
SSH into your cloud server:
```bash
ssh user@your-server-ip
```
Pull the latest code:
```bash
git pull origin main
```
Restart Docker services:
```bash
docker compose up --build -d
```

---

## 🐝 License
This project is open-source under the **MIT License**.

---

## 💡 Future Enhancements
✅ User Authentication (Firebase/Auth0)  
✅ Save favorite trips for later  
✅ Payment gateway integration (Stripe/PayPal)

---

## 🌟 Contributors
🚀 **Built by [Vamshi Shakamuri]**  
Contributions are welcome! Submit a pull request if you'd like to improve this project.

---

### 🔥 Now Your AI-Powered Travel Planner is Ready!
📌 Visit **[http://localhost:3000](http://localhost:3000)** and start exploring trips! 🌍✨

