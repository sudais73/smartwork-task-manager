
markdown
# 🧠 SmartWork — AI-Powered Task Manager

SmartWork is an intelligent task management app built with **Next.js 15**, **TypeScript**, and **MongoDB**, featuring **AI-based task recommendations**, real-time updates, and secure authentication via **Auth.js (NextAuth)**.  

---

## 🎯 Objective
The goal of **SmartWork** is to help users **organize, prioritize, and complete tasks efficiently** using AI.  
It allows authenticated users to:
- Create, edit, and delete tasks.
- Categorize tasks by status (`todo`, `in-progress`, `done`) and priority (`low`, `medium`, `high`).
- Get **AI-generated task recommendations** to improve productivity.
- Sync seamlessly across devices with Google or GitHub authentication.


##  Tech Stack

Frontend:
- Next.js 15 (App Router + Server Actions)
- React
- Tailwind CSS
- TypeScript

Backend:
- MongoDB (via Mongoose)
- NextAuth.js (Auth.js) for authentication (Google, GitHub)
- OpenAI API for AI recommendations

Deployment:
- Hosted on Vercel



SmartWork uses the **OpenAI API** to analyze user tasks and provide **personalized task recommendations** on the dashboard, helping users improve productivity and focus.

---

## 🔒 Authentication

SmartWork uses Auth.js (NextAuth) for secure OAuth2-based login with:

Google
GitHub

Each new user is automatically stored in MongoDB upon first sign-in.
 Deployment

SmartWork is deployed on **Vercel**.
Ensure the following redirect URLs are set in your Google & GitHub OAuth apps:



##  Future Enhancements

* ✅ AI-based task priority
* 📊 Productivity analytics with progress bar
* 🔔 Smart reminders & notifications


## 👨‍💻 Author

**Sudais Man**
[GitHub](https://github.com/sudais73) 


### ⭐ If you like this project, don’t forget to star the repo!
