# Final Web Project Proposal

## Project Title & Summary
**StudySprint AI** is a web-based study planner and focus assistant that helps students organize coursework, generate personalized study sessions, and stay accountable with smart reminders. The app combines a clean task dashboard with AI-powered recommendations and real-time productivity insights, turning scattered assignments and deadlines into a structured weekly plan that is easy to follow on desktop and mobile.

## Purpose & Goals
The project solves a common student problem: feeling overwhelmed by multiple deadlines and not knowing what to study first. It demonstrates how modern web apps can combine interactive UI, external APIs, and AI features to create practical, user-centered tools. Goals include improving time management, reducing procrastination, and showcasing full-stack-ready frontend skills such as state management, asynchronous API integration, and responsive design.

## Features
- Assignment and exam tracker with priority tags, due dates, and completion states.
- AI study plan generator that suggests what to work on each day based on urgency and estimated effort.
- “Explain this topic” AI helper for quick concept breakdowns in simpler language.
- Calendar view with drag-and-drop rescheduling.
- Pomodoro focus timer with session history and streak tracking.
- Local notifications/reminders for upcoming deadlines.
- Optional weather-based study tip using a weather API (e.g., suggest indoor deep-work sessions on rainy days).
- Data persistence with local storage (and optional cloud sync in a future version).

## Tools & Frameworks
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **UI Framework:** React + Vite
- **Styling:** Tailwind CSS
- **APIs/Integrations:** OpenAI API (AI planner + concept helper), OpenWeather API (context tips)
- **PWA Features:** Service worker, installable app manifest, offline support for previously loaded tasks
- **Version Control:** Git + GitHub

## Deployment Plan
The project will be deployed on **Vercel** for fast CI/CD from GitHub, automatic preview deployments, and easy production rollbacks. The repository will remain public on GitHub, and each push to the main branch will trigger a new production build.
