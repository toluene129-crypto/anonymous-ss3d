# SS3D — Anonymous Messages 🤫

A simple, modern anonymous messaging website built with **HTML, CSS, and Vanilla JavaScript**.

SS3D allows people to write and post messages without entering their name. The project is designed around a secondary-school community vibe, with anonymous confessions, crushes, funny classroom moments, school drama, secrets, and more.

## ✨ Features

* 🤫 **100% Anonymous Messages**
* 💬 Post messages without entering your name
* ❤️ Like messages
* 📋 Copy messages to your clipboard
* 🔎 Search messages
* 🏷️ Filter messages by mood
* 😶 Confessions
* 😂 Funny school moments
* 💔 Heartbreak
* 🤫 Secrets
* 💡 Ideas
* 😡 Rants
* 😍 Crushes
* 📚 School-related messages
* ⏱️ Relative message timestamps
* 👤 Random anonymous IDs
* 🎨 Random message gradients
* 📱 Responsive interface
* 💾 Messages stored using `localStorage`
* 🌐 GitHub Pages ready
* ⚡ No frameworks required

## 🛠️ Technologies

This project uses:

* HTML5
* CSS3
* Vanilla JavaScript
* LocalStorage
* Google Fonts

No React, Vue, Angular, Bootstrap, Tailwind, or other frameworks are required.

## 📁 Project Structure

```text
ss3d-anonymous/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ss3d-anonymous.git
```

### 2. Open the project

Open the project folder and launch:

```text
index.html
```

You can also use **Live Server** in VS Code for easier development.

## 💬 How It Works

A visitor can:

1. Open the message box.
2. Select a mood.
3. Write an anonymous message.
4. Click **Post Anonymously**.
5. The message appears in the live feed.
6. Other visitors can like or copy the message.

No name is required when posting.

## 💾 Storage

The current version uses browser `localStorage`.

Messages are stored using:

```javascript
ss3d_messages_v1
```

Liked messages are stored using:

```javascript
ss3d_liked_v1
```

This means messages are currently stored **only in the browser where they were posted**.

For example:

```text
User A's computer
        ↓
    localStorage
        ↓
   User A's messages
```

Another person using another device will not automatically see those messages.

## 🌐 GitHub Pages

The website can be hosted for free using GitHub Pages.

### Steps

1. Create a GitHub repository.
2. Upload:

   * `index.html`
   * `style.css`
   * `script.js`
3. Go to:

```text
Settings → Pages
```

4. Select:

```text
Deploy from a branch
```

5. Select:

```text
main → /root
```

6. Save.

Your website will be available at:

```text
https://yourusername.github.io/ss3d-anonymous/
```

## 🔮 Future Improvements

The current project is intentionally frontend-only. A future version could include:

* 🌍 Global messages shared between devices
* ☁️ Supabase or Firebase database
* 👥 Personal anonymous profile links
* 🔗 Shareable anonymous message pages
* 🔔 Notifications
* 🛡️ Message reporting
* 🚫 Spam protection
* 🧹 Admin moderation
* ❤️ Persistent global likes
* 🔐 Better privacy and security
* 📊 Admin dashboard

For a true global anonymous messaging system, the `localStorage` implementation can be replaced with a backend database such as Supabase or Firebase.

## ⚠️ Privacy Note

The current version does not require users to enter their names.

However, `localStorage` is **browser-specific storage**, not a secure anonymous backend.

If this project is later connected to a database, privacy protections should be implemented carefully. Avoid collecting unnecessary identifying information.

## 🎨 Design

SS3D uses a dark, modern interface with:

* Gradient accents
* Anonymous user identities
* Animated UI elements
* Mood tags
* Card-based message feed
* Responsive layouts

The goal is to create a fun and comfortable environment where students can express thoughts without attaching their names.

## 👨‍💻 Author

**Toluene**

Built for the SS3D community.

## 📜 License

This project is available for educational and personal use.

---

### ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.
