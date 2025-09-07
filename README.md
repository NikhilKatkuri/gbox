# Gbox – Open-Source Email & Messaging Platform

<div style="align: center; item-align: center; flex-direction: column; text-align: center;">
  <img src="assets/icon-gbox.svg" alt="Gbox Icon" width="100"/>
  <br/>
  <img src="assets/Gbox-brand.svg" alt="Gbox Brand" width="300"/>
</div>

Gbox is an **open-source email platform** that provides secure, real-time email-like communication. It is designed for scalability, fast performance, and future expansion such as attachments and threading.

> **⚠️ Project Status**: This project is currently in early development. The frontend is being built with Next.js, and the backend implementation is planned for future releases.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Development Tools](#development-tools)
4. [System Architecture](#system-architecture)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [Database Design](#database-design)
9. [Storage Strategy](#storage-strategy)
10. [Scalability & Free Tier Plan](#scalability--free-tier-plan)
11. [Future Roadmap](#future-roadmap)
12. [Contributing](#contributing)
13. [License](#license)

---

## Features

**Planned Features:**

- Firebase Authentication for secure login/signup
- User profiles with basic information (name, email, avatar)
- Sending and receiving emails/messages
- Metadata tracking: read/unread status, labels, timestamps
- Optimized storage for free-tier scalability
- Easy attachment support planned for future versions

**Current Implementation:**

- Next.js 15 frontend with TypeScript
- Tailwind CSS v4 for styling
- Modern React 19 components

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express.js (planned)
- **Database:** MongoDB (planned for metadata storage)
- **Authentication:** Firebase Authentication (planned)
- **Deployment:** Vercel (frontend), Railway/Render (backend - planned)

---

## System Architecture

```
Frontend (Next.js) <--> Backend API (In Development) <--> MongoDB (metadata)
```

- **Frontend**: Next.js application handling UI, inbox, mail details, and API calls
- **Backend**: Node.js/Express API (planned) for auth validation, mail CRUD, and metadata management
- **MongoDB**: Will store all email metadata and content

---

## Installation

1. Clone the repository

```bash
git clone https://github.com/nikhilkatkuri/gbox.git
cd gbox
```

2. Install frontend dependencies

```bash
cd frontend
npm install
```

3. Install git-lite-cli for automated git operations (optional but recommended)

```bash
npm install -g git-lite-cli
```

4. Set up environment variables (see Configuration section below)

5. Run the development server

```bash
npm run dev
```

> **Note**: The backend is currently under development. The current setup focuses on the frontend implementation.

---

## Configuration

- **Firebase Auth**: Create a Firebase project, enable Email/Password Authentication, copy config to `frontend/src/lib/firebase.ts`
- **MongoDB**: Create Atlas free cluster, add connection string to backend environment (when implemented)

**Environment Variables**

Create a `.env.local` file in the `frontend` directory:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

For backend environment variables (when implemented):

```
MONGO_URI=your_mongodb_connection_string
FIREBASE_ADMIN_SDK_KEY=your_firebase_admin_key
```

---

## Usage

> **Current Status**: This is an early-stage project with frontend implementation in progress.

**Planned Features:**

- Sign up / Log in with email & password via Firebase Authentication
- Compose, send, and receive messages
- Emails include metadata: sender, recipients, timestamp, labels
- Backend will handle storing metadata and linking to email content in storage

---

## Database Design
 
### MongoDB Collection: `mails`

```json
{
  "_id": "mail001",
  "ownerId": "uid123",
  "from": "nikhil@gbox.com",
  "to": ["friend@gbox.com"],
  "subject": "Welcome to Gbox",
  "body": "Optional small body (<5 KB) or bodyUrl for larger content",
  "timestamp": "2025-09-07T12:00:00Z",
  "metadata": {
    "status": "received",
    "isRead": false,
    "labels": ["inbox"]
  }
}
```

- Body ≤ 4.5 KB for free tier storage
- Larger bodies stored in Firebase Storage / S3
- Metadata only in MongoDB → keeps DB fast & searchable

---

## Storage Strategy

- Metadata in MongoDB → fast querying, small size
- Bodies & attachments in Firebase Storage / S3 → scalable
- Fetch email content only when the user opens the mail → reduces DB reads

---

## Scalability & Free Tier Plan

| Users | Avg Mail Size | Mails per User | Total Storage | Status         |
| ----- | ------------- | -------------- | ------------- | -------------- |
| 1,000 | 2 KB          | 100            | \~217 MB      | Free           |
| 2,000 | 5 KB          | 52             | \~512 MB      | Free           |
| 5,000 | 5 KB          | 52             | \~1.28 GB     | Upgrade needed |

Firebase Auth free tier → 50,000 MAUs/month
MongoDB → start free, upgrade when storage exceeds 512 MB

---

## Future Roadmap

- Attachments support
- Threaded conversations / email chains
- Labels, filters, search
- Push notifications
- Mobile app using Flutter

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Create a Pull Request

---

## License

MIT License

Copyright (c) 2025 Nikhil Katkuri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
