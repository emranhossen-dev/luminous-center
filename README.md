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

- **Navbar**: Logo (left), menu in center (Home, Courses, About, Blog, Contact, **My Classes** when logged in), Login/Signup or user name + Logout (right).
- **Footer**: Copyright (left), same menu (center), social links (right).
- **Routes**:
  - `/` – Homepage
  - `/courses` – All courses (search, filter by project, pagination)
  - `/courses/[slug]` – Course detail; **Enroll** redirects to login if not logged in, then to enroll flow
  - `/courses/[slug]/enroll` – **Enrollment**: Govt project → registration form; Paid/Online batch → SSLCommerz payment → then access in My Classes
  - `/my-classes` – Logged-in only; lists enrolled courses (after govt registration or successful payment)
  - `/payment/success`, `/payment/fail`, `/payment/cancel` – SSLCommerz redirects after payment
  - `/about`, `/blog`, `/contact`, `/login`, `/signup`

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

Course list is in `app/data/courses.ts`: 3 projects × 3 courses = 9 courses. Govt courses have fee 0 (registration only); Paid/Online use default fee (e.g. 5000 BDT).

## Enrollment & Payment

- **Govt project**: User fills registration form (name, phone, NID, address); enrollment is saved and appears in My Classes.
- **Paid batch / Online batch**: User clicks “Pay & Enroll” → redirected to **SSLCommerz** (card, bKash, bank, etc.). On success, transaction is validated and course is added to My Classes.
- Auth and enrollments are stored in **localStorage** (demo). For production, use a backend and database.

## Environment (Payment)

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_APP_URL` – Your site URL (for payment callbacks).
- `SSLCOMMERZ_STORE_ID`, `SSLCOMMERZ_STORE_PASS` – From [SSLCommerz Sandbox](https://developer.sslcommerz.com/registration/) or live signup.
- `SSLCOMMERZ_IS_LIVE=false` for sandbox, `true` for production.
