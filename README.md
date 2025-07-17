# TalentLoom - Your All-in-One Interview Platform

TalentLoom is a feature-rich interview platform designed to streamline the technical interview process. It provides a seamless experience for both interviewers and candidates with real-time video, a collaborative code editor, and AI-powered mock interviews.

---

## Demo

**Live Demo:** [Check it out here!](https://interview-platform-code-sync.vercel.app)

---

## ✨ Key Features

* **Real-time Video and Audio:** Conduct face-to-face interviews with high-quality video and audio powered by **Stream**.
* **Collaborative Code Editor:** A shared code editor with support for multiple languages, allowing for real-time coding and problem-solving.
* **AI-Powered Mock Interviews:** Practice for technical interviews with an AI-powered mock interviewer that asks questions and provides feedback.
* **Interview Scheduling:** Easily schedule and manage upcoming interviews with candidates.
* **Recording and Playback:** Record interview sessions and play them back for review and feedback.
* **Authentication and User Management:** Secure user authentication and management handled by **Clerk**.
* **Real-time Database:** Powered by **Convex** for seamless data synchronization between clients.

---

## 💻 Tech Stack

* **Frontend:**
    * [Next.js](https://nextjs.org/) - React framework for building user interfaces.
    * [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
    * [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript.
    * [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
    * [shadcn/ui](https://ui.shadcn.com/) - A collection of re-usable components.
* **Backend:**
    * [Convex](https://www.convex.dev/) - A backend platform with a real-time database.
    * [Clerk](https://clerk.com/) - User authentication and management.
    * [Stream](https://getstream.io/) - For video and audio streaming.
* **AI:**
    * [OpenAI](https://openai.com/) - For generating AI-powered mock interview questions.

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/tushar591/interview-platform-codesync.git](https://github.com/tushar591/interview-platform-codesync.git)
    cd interview-platform-codesync
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following environment variables. You can get these keys from the respective platforms.
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

OPEN_ROUTER_API_KEY=
NEXT_PUBLIC_VAPI_TOKEN=

### Running the Development Server

Once you have set up your environment variables, you can run the development server:

```bash
npm run dev
```
This will start the development server on your Laptop/PC.

## Project Structure

The project follows a standard Next.js `app` directory structure.

* `src/app/(root)`: Contains the main pages of the application like the homepage, schedule page, and meeting rooms.
* `src/app/(admin)`: Contains the admin dashboard.
* `src/components`: Contains all the React components used in the application.
* `src/lib`: Contains utility functions.
* `src/hooks`: Contains custom React hooks.
* `convex`: Contains the Convex backend functions for database queries and mutations.

---

## 🤝 Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.
