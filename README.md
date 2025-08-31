This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.








<!-- school management app readme section  -->
School Management App
This is a Next.js application for a web development assignment. It features two pages: a form to add school data and a page to display a list of schools fetched from a MySQL database.

Features
Add School Page (/addSchool):

A responsive form built with react-hook-form and yup for validation.

Submits data, including a school image, to a backend API route.

Handles client-side validation and form submission.

Show Schools Page (/showSchools):

Displays a list of schools in a card-based layout.

Fetches data from a backend API route.

Responsive design for various screen sizes.

Local Setup
Prerequisites
Node.js and npm installed.

A running MySQL database instance (e.g., via XAMPP).

1. Database Configuration
Start your XAMPP Control Panel and ensure the Apache and MySQL services are running.

Go to http://localhost/phpmyadmin/ in your browser.

Create a new database named school_management.

Execute the following SQL query to create the schools table:

CREATE TABLE `schools` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `address` TEXT NOT NULL,
  `city` TEXT NOT NULL,
  `state` TEXT NOT NULL,
  `contact` TEXT NOT NULL,
  `image` TEXT NOT NULL,
  `email_id` TEXT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

2. Project Installation
Clone the repository and navigate into the project directory.

Install the project dependencies:

npm install

Install the MySQL library for the backend:

npm install mysql2

3. Running the Project
Start the Next.js development server:

npm run dev

Access the application in your browser:

Add School Page: http://localhost:3000/addSchool

Show Schools Page: http://localhost:3000/showSchools

4. Deployment
This project is configured to be easily deployed to platforms like Vercel or Netlify. You will need to use a cloud-based MySQL service (like PlanetScale) and configure environment variables for your database credentials.


vercel link : https://school-management-app-sepia.vercel.app/