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

## 📸 Screenshots

## 🔗 Live Demo

https://kaaryab-afghanistan-liart.vercel.app/

## 💻 GitHub Repository

https://github.com/faezahahmadi/kaaryab-afghanistan.git

## 🔮 Future Improvements

- **Authentication** — User accounts so saved opportunities and submissions are tied to a real profile instead of browser LocalStorage
- Replace LocalStorage/Context with a proper backend (database + API routes) so data persists across devices

## 👤 Author

Built by **Faezah** as a final capstone project — Next.js, TypeScript, and Tailwind CSS.
