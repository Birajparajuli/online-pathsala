# Online Pathsala: _A Comprehensive Online Learning Platform_

![Online Pathsala Banner](https://github.com/Birajparajuli/online-pathsala/blob/main/public/auth-banner.png)
Online Pathsala is an innovative online video course platform designed to provide learners with engaging and interactive educational experiences. It offers a wide range of video courses, progress tracking, and a secure payment system through eSewa. The platform features a dedicated Teacher Portal, allowing educators to create courses, manage chapters, upload resources, and track analytics. The Admin Portal enables administrators to manage users, teachers, and transactions, ensuring smooth platform operations. Online Pathsala aims to create a seamless learning environment by integrating intuitive features for both students and instructors.


## Getting Started

To get a local copy up and running, please follow these simple steps.
First, run the development server:

1.  Clone Repo

```bash
git clone https://github.com/Birajparajuli/online-pathsala.git
```

2. Go to the project folder

```bash
cd online-pathsala
```

3. Install packages with npm

```bash
npm install
```

5. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.

6. Run development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
