# 🧠 Matrix Synapse AI-Powered Messaging Platform

This project deploys a **Matrix Synapse homeserver** on an **AWS EC2 instance**, bridges social media messages via **Mautrix**, and applies **AI processing** (summarization, intent parsing, vector storage, fine-tuning) to synced messages. A modern **React frontend** presents insights.

---

## 🚀 Features

- ✅ Matrix Synapse homeserver via Docker
- ✅ Social media bridge via Mautrix (LinkedIn/Instagram)
- ✅ NGINX reverse proxy with SSL
- ✅ DuckDNS domain support (Free)
- ✅ AI pipeline:
  - Daily conversation reports
  - Conversation summarization
  - Message prioritization
  - Intent detection (NLP)
  - Vector storage (e.g., FAISS, Pinecone)
  - Knowledge base generation
  - Fine-tuning with Hugging Face LLMs
- ✅ Frontend: Vite + React + Tailwind

---

## 🛠 Tech Stack

| Component     | Tool/Framework |
|---------------|----------------|
| Backend       | Matrix Synapse, Mautrix Bridge |
| AI            | Hugging Face Transformers, FAISS, LangChain |
| Frontend      | React, Vite, TailwindCSS |
| Server        | AWS EC2 (Free Tier) |
| Reverse Proxy | NGINX |
| Domain        | DuckDNS |
| Deployment    | Docker, crontab |

---

## 🧩 Setup Instructions

### 1. Matrix Synapse on EC2

```bash
# SSH into your EC2
ssh -i key.pem ubuntu@your-ec2-ip

# Install Docker
sudo apt update
sudo apt install -y docker.io docker-compose

# Clone repo and start
git clone https://github.com/YOUR-REPO/matrix-ai-platform.git
cd matrix-ai-platform
docker-compose up -d
````

### 2. NGINX Reverse Proxy with DuckDNS

* Register at: [https://www.duckdns.org](https://www.duckdns.org)
* Get your free token and subdomain (e.g., `matrixchat.duckdns.org`)
* Setup script: `/opt/duckdns/duck.sh` (with cron)
* Configure NGINX for reverse proxy to Matrix Synapse

### 3. Mautrix Bridge (Instagram or LinkedIn)

* Setup via `mautrix-instagram/config.yaml`
* Follow [official Mautrix docs](https://docs.mau.fi/bridges/)
* Run bridge via Docker

---

## 🤖 AI Pipeline (Python)

```bash
cd ai-pipeline
pip install -r requirements.txt

# Run daily report, summarizer, and NLP
python generate_daily_report.py
python summarize_messages.py
python fine_tune_model.py
```

---

## 🌐 Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
matrix-ai-platform/
│
├── ai-pipeline/           # Python AI processing scripts
├── mautrix-instagram/     # Bridge configuration
├── frontend/              # React + Tailwind + Vite frontend
├── nginx.conf             # Reverse proxy settings
├── docker-compose.yml
└── README.md
```

---

## 📹 Demo & Deployment Links

* 🔗 Matrix Homeserver: [https://matrixchat.duckdns.org](https://matrixchat.duckdns.org)
* 🌐 Frontend App: [https://matrixchat.duckdns.org/app](https://matrixchat.duckdns.org/app)
* 📽 Demo Video: \[YouTube Link]

---

## 🧪 Testing & Evaluation

* AI models tested on real messages
* Accuracy validated against human summaries
* Daily reports auto-generated
* LLMs fine-tuned using Hugging Face

---

## 📜 License

MIT © \[Your Name]

---

## 🤝 Contributions

Feel free to fork, PR, or suggest ideas!
