# KaarYab Afghanistan

**An opportunity finder platform helping Afghan youth discover jobs, internships, scholarships, online courses, training programs, and volunteer work — all in one place.**

---

## 📖 Project Description

KaarYab Afghanistan is a modern, full-featured web application built as a final capstone project. It solves a real problem: opportunities for Afghan students, graduates, and job seekers are scattered across social media, group chats, and unrelated websites — making them easy to miss and hard to compare.

KaarYab brings jobs, scholarships, internships, online courses, training programs, and volunteer opportunities into a single, searchable, filterable, and easy-to-use platform.

## 🎯 Problem It Solves

Many young people in Afghanistan struggle to find reliable information about opportunities that could change their lives — a scholarship abroad, a remote internship, a local training program. That information exists, but it's fragmented. KaarYab centralizes it into one clean interface where opportunities can be browsed, searched, filtered, saved, and even submitted by users or organizations.

## 🧑‍🤝‍🧑 Target Users

- Students and fresh graduates
- Job seekers
- Women looking for remote opportunities
- Scholarship and internship applicants
- Organizations that want to share opportunities

## ✨ Features

### Core Functionality

- **Home Page** — Platform introduction, live statistics, featured opportunities, and category shortcuts
- **Opportunities Page** — Full catalog in a responsive card grid with pagination
- **Opportunity Details Page** — Dynamic route (`/opportunities/[id]`) with full opportunity information
- **Add Opportunity Page** — Validated form to submit new opportunities
- **Edit Opportunity Page** — Update any existing opportunity
- **Saved Opportunities Page** — Personal bookmark list, persisted across sessions
- **Dashboard Page** — Live statistics and analytics with interactive charts
- **About Page** — Platform mission, vision, and core values
- **Contact Page** — Message form for inquiries and suggestions
- **Custom 404 (Not Found) Page** and **Loading State** — Consistent, on-brand experience for missing routes and async loading

### Search & Filter

- Search opportunities by title
- Filter by category (Job, Scholarship, Internship, Online Course, Training Program, Volunteer Work)
- Filter by location
- Filter by work mode (Remote / On-site / Hybrid)
- Filter by deadline range (next 7 days, next 30 days, past)

### CRUD & Data Persistence

- **Create** — Add Opportunity form with full validation
- **Read** — Browse, search, and view opportunity details
- **Update** — Edit any opportunity's details
- **Delete** — Remove an opportunity, protected by a confirmation modal
- All opportunity and saved-bookmark data persists in **LocalStorage** via **React Context API**, so changes survive page refreshes and browser sessions

### Save Opportunity

- One-tap bookmarking from the opportunity card or detail page
- Dedicated Saved Opportunities page
- Save state persisted independently in LocalStorage

### Dashboard & Analytics

- Total opportunities, and totals broken down per category
- Featured opportunity count
- Expiring-soon opportunities (sorted by nearest deadline)
- Recent submissions feed
- **Pie chart** — distribution of opportunities by category (built with **Recharts**)
- **Bar chart** — breakdown of opportunities by type (built with **Recharts**)
- All charts and stats update live as opportunities are added, edited, or removed

### UI/UX

- Fully responsive layout — mobile, tablet, and desktop
- Light and dark mode, powered by Tailwind's `dark:` variant and a theme toggle in the navbar
- Clean, reusable navbar, footer, cards, buttons, forms, and badges
- Confirmation modal for destructive actions (deleting an opportunity)
- Empty states (no saved opportunities, no search results, no expiring deadlines)
- Custom loading and not-found states

## 🛠️ Technologies Used

| Category            | Technology                       |
| ------------------- | -------------------------------- |
| Framework           | Next.js 15 (App Router)          |
| UI Library          | React 19                         |
| Language            | TypeScript                       |
| Styling             | Tailwind CSS v4                  |
| Forms               | React Hook Form                  |
| Validation          | Yup (`@hookform/resolvers/yup`)  |
| State & Persistence | React Context API + LocalStorage |
| Charts              | Recharts                         |
| Icons               | Lucide React                     |
| Deployment          | Vercel                           |
| Version Control     | Git & GitHub                     |

## 📂 Project Structure (high level)

```
app/
├── page.tsx                     # Home
├── about/page.tsx
├── contact/page.tsx
├── add-opportunity/page.tsx
├── opportunities/
│   ├── page.tsx                 # Opportunities list
│   └── [id]/
│       ├── page.tsx             # Opportunity details
│       └── edit/page.tsx        # Edit opportunity
├── saved/page.tsx
├── dashboard/page.tsx
├── not-found.tsx
├── loading.tsx
├── layout.tsx
└── validation/AddOppSchema.ts

components/
├── header/
├── footer/
├── home/
├── about/
├── dashboard/
├── opportunitiesPage/
└── common/

context/
├── ThemeContext.tsx
└── OpportunityContext.tsx

utils/
├── mockData.ts                  # 120 seeded opportunity records
└── Constants.ts
```

## 🚀 How to Run Locally

1. **Clone the repository**

   ```bash
   git clone <your-github-repo-url>
   cd kaaryab-afghanistan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   ```
   http://localhost:3000
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```


## 🔗 Live Demo

https://kaaryab-afghanistan-liart.vercel.app/

## 💻 GitHub Repository

https://github.com/faezahahmadi/kaaryab-afghanistan.git

## 🔮 Future Improvements

- **Authentication** — User accounts so saved opportunities and submissions are tied to a real profile instead of browser LocalStorage
- Replace LocalStorage/Context with a proper backend (database + API routes) so data persists across devices

## 👤 Author

Built by **Faezah Ahmadi** as a final capstone project — Next.js, TypeScript, and Tailwind CSS.

## 📸 Screenshots
<img width="1365" height="730" alt="1" src="https://github.com/user-attachments/assets/58eacad1-c0e5-4aae-b6f7-f6b10c729fd3" />
<img width="1366" height="730" alt="2" src="https://github.com/user-attachments/assets/255a0d0b-b657-4d9e-9f69-dfabbaa59093" />
<img width="1362" height="730" alt="3" src="https://github.com/user-attachments/assets/23756e6d-d02d-47d5-bb4b-01975884f9c5" />
<img width="1361" height="632" alt="24" src="https://github.com/user-attachments/assets/4efb913c-57c2-414e-8e2a-50dd3786cb23" />
<img width="1366" height="727" alt="23" src="https://github.com/user-attachments/assets/6e9c3ba1-de98-462e-9e42-b4cfe919809c" />
<img width="1366" height="727" alt="22" src="https://github.com/user-attachments/assets/ba65fcd6-96e2-4a3c-8560-60a289461c36" />
<img width="1366" height="722" alt="21" src="https://github.com/user-attachments/assets/33ec1342-1c0e-44d6-890a-ff714b02c628" />
<img width="1354" height="626" alt="20" src="https://github.com/user-attachments/assets/a2f09645-0a35-4291-b2e7-dad02f435348" />
<img width="1366" height="719" alt="19" src="https://github.com/user-attachments/assets/dae7af6e-e8ad-450d-94b3-195b752d2228" />
<img width="1366" height="728" alt="18" src="https://github.com/user-attachments/assets/6f6e86e0-1b79-422b-b156-77821f24711a" />
<img width="1366" height="668" alt="17" src="https://github.com/user-attachments/assets/b11b1967-88b2-41a5-9916-92cd878d2efb" />
<img width="1366" height="686" alt="16" src="https://github.com/user-attachments/assets/0b0849da-ef76-436d-a133-71ded61abf3e" />
<img width="1366" height="673" alt="15" src="https://github.com/user-attachments/assets/52d30832-980d-4ef4-a4d4-7edc98c25216" />
<img width="1276" height="718" alt="14" src="https://github.com/user-attachments/assets/a1c86f2f-20a7-4724-aed6-028117175145" />
<img width="844" height="684" alt="13" src="https://github.com/user-attachments/assets/db430b9c-bf29-49c5-bba6-a326aed70ad1" />
<img width="1351" height="706" alt="12" src="https://github.com/user-attachments/assets/e78f8ec5-27a9-4641-b5da-beb1b43374a9" />
<img width="1366" height="729" alt="11" src="https://github.com/user-attachments/assets/0ca62170-6f81-4076-83cd-7e1becbd2f1f" />
<img width="1366" height="728" alt="10" src="https://github.com/user-attachments/assets/3fe5ec67-49f6-4abb-90bd-d0bb15deec77" />
<img width="1366" height="721" alt="9" src="https://github.com/user-attachments/assets/a4029081-de11-4dc4-9dc9-e7c32ee991e5" />
<img width="1366" height="729" alt="8" src="https://github.com/user-attachments/assets/e243ab3b-c8e0-4535-bda9-5bf1df11aad0" />
<img width="1360" height="635" alt="7" src="https://github.com/user-attachments/assets/2b862d44-4dae-4ec1-8590-cca44c46aec0" />
<img width="1366" height="707" alt="6" src="https://github.com/user-attachments/assets/6a8e1b28-983f-41c5-b5ff-9ea7f5d62fa5" />
<img width="1366" height="728" alt="5" src="https://github.com/user-attachments/assets/b33a049b-10e9-41ec-a216-844822eeb177" />
<img width="1366" height="703" alt="4" src="https://github.com/user-attachments/assets/6c8993a4-89d2-4079-9444-9ef9b552879f" />

