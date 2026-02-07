# Luminous – Student Record & Course Website

A Next.js + Tailwind CSS website for recording and managing enrolled students across **Govt Project**, **Paid Batch**, and **Online Batch**, each offering three courses:

- Digital Marketing for Freelancing Level 3  
- Web Design and Development for Freelancing Level 3  
- Hand Stitch and Embroidery  

## Tech Stack

- **Next.js 14** (App Router)  
- **Tailwind CSS**  
- **TypeScript**  

## Project Structure

- **Navbar**: Logo (left), menu items in center (Home, Courses, About, Blog, Contact), Login/Signup (right). Hover and active link styles.
- **Footer**: Copyright (left), same menu (center), social links (right).
- **Routes**:
  - `/` – Homepage (hero, stats, why us, popular courses, testimonials placeholder)
  - `/courses` – All courses with search and project filter (All, Govt Project, Paid Batch, Online Batch), pagination
  - `/courses/[slug]` – Course detail page
  - `/about` – About (story, mission/vision, values, team, gallery, CTA)
  - `/blog` – Blog listing (placeholder)
  - `/contact` – Contact form and address/phone/email
  - `/login` – Login (email, password, show/hide password, forgot link)
  - `/signup` – Signup (name, email, password, confirm, terms checkbox)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Course Data

Course list is generated in `app/data/courses.ts`: 3 projects × 3 courses = 9 courses. Adjust project names and course titles there as needed.
