/* SS3D Anonymous Messages - Pure JS, localStorage forever */

const MOODS = [
  { id: "confession", emoji: "😶", label: "Confession" },
  { id: "funny", emoji: "😂", label: "Funny" },
  { id: "heartbreak", emoji: "💔", label: "Heartbreak" },
  { id: "secret", emoji: "🤫", label: "Secret" },
  { id: "idea", emoji: "💡", label: "Idea" },
  { id: "rant", emoji: "😡", label: "Rant" },
  { id: "crush", emoji: "😍", label: "Crush" },
  { id: "school", emoji: "📚", label: "School" }
];

const GRADIENTS = [
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#06b6d4,#6366f1)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#f59e0b,#ec4899)",
  "linear-gradient(135deg,#84cc16,#10b981)",
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  "linear-gradient(135deg,#f43f5e,#8b5cf6)",
  "linear-gradient(135deg,#fbbf24,#f97316)"
];

const STORAGE_KEY = "ss3d_messages_v1";
const LIKED_KEY = "ss3d_liked_v1";

const SEED = [
  {
    id: "m1",
    text: "I have liked you since SS1 and you still don't know 😭. Every time you enter the classroom I suddenly forget how to behave normally.",
    mood: "crush",
    timestamp: Date.now() - 12 * 60 * 1000,
    likes: 42,
    anonId: "anon#4821",
    gradient: 0
  },

  {
    id: "m2",
    text: "That one friend who says 'I didn't read anything' before an exam and then comes out with 87%. Please explain yourself.",
    mood: "funny",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    likes: 58,
    anonId: "anon#7392",
    gradient: 1
  },

  {
    id: "m3",
    text: "I still remember when we used to sit together during break time. School ended but honestly, I miss those random conversations.",
    mood: "heartbreak",
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    likes: 35,
    anonId: "anon#1044",
    gradient: 2
  },

  {
    id: "m4",
    text: "Our mathematics teacher said 'this question is very easy' and proceeded to write something that looked like a NASA equation on the board 😭.",
    mood: "rant",
    timestamp: Date.now() - 9 * 60 * 60 * 1000,
    likes: 71,
    anonId: "anon#5519",
    gradient: 3
  },

  {
    id: "m5",
    text: "Confession: I have pretended to understand the lesson at least 20 times this term. When the teacher asks 'Are you following?' I just nod.",
    mood: "confession",
    timestamp: Date.now() - 14 * 60 * 60 * 1000,
    likes: 49,
    anonId: "anon#2231",
    gradient: 4
  },

  {
    id: "m6",
    text: "Whoever keeps taking my seat before I arrive in the morning, this is your final warning. That chair has been mine since SS1 😭.",
    mood: "rant",
    timestamp: Date.now() - 22 * 60 * 60 * 1000,
    likes: 26,
    anonId: "anon#9920",
    gradient: 5
  },

  {
    id: "m7",
    text: "I studied for the exam all night and the first question was from the ONE topic I skipped. Education is actually personal sometimes.",
    mood: "school",
    timestamp: Date.now() - 26 * 60 * 60 * 1000,
    likes: 64,
    anonId: "anon#3174",
    gradient: 0
  },

  {
    id: "m8",
    text: "There is a girl in my class who smiles every time I walk past her. I don't know if she likes me or if I'm just imagining things 😭.",
    mood: "crush",
    timestamp: Date.now() - 30 * 60 * 60 * 1000,
    likes: 82,
    anonId: "anon#6081",
    gradient: 1
  },

  {
    id: "m9",
    text: "Our class group chat becomes completely active the night before an assignment is due. Suddenly everybody is asking for answers 😂.",
    mood: "funny",
    timestamp: Date.now() - 34 * 60 * 60 * 1000,
    likes: 55,
    anonId: "anon#4417",
    gradient: 2
  },

  {
    id: "m10",
    text: "I miss my old classmates. We used to complain about school every single day, but now that we're leaving, I actually don't want it to end.",
    mood: "heartbreak",
    timestamp: Date.now() - 40 * 60 * 60 * 1000,
    likes: 91,
    anonId: "anon#8250",
    gradient: 3
  },

  {
    id: "m11",
    text: "POV: The teacher says 'submit your assignment' and you suddenly remember you were supposed to do an assignment 😭.",
    mood: "funny",
    timestamp: Date.now() - 44 * 60 * 60 * 1000,
    likes: 73,
    anonId: "anon#1936",
    gradient: 4
  },

  {
    id: "m12",
    text: "I secretly think our class prefect is actually nice. Everyone complains about them but they helped me when I was having a bad day.",
    mood: "secret",
    timestamp: Date.now() - 50 * 60 * 60 * 1000,
    likes: 38,
    anonId: "anon#7542",
    gradient: 5
  }
];

let messages = [];
let liked = new Set();
let filterMood = "all";
let searchQ = "";
let currentMood = "secret";

const $ = (s) => document.querySelector(s);

const feedEl = $("#feed");
const moodSel = $("#moodSelector");
const filterRow = $("#filterRow");
const msgInput = $("#messageInput");
const charCount = $("#charCount");
const postBtn = $("#postBtn");
const searchInput = $("#searchInput");

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);

  if (s < 60) {
    return `${s}s ago`;
  }

  const m = Math.floor(s / 60);

  if (m < 60) {
    return `${m}m ago`;
  }

  const h = Math.floor(m / 60);

  if (h < 24) {
    return `${h}h ago`;
  }

  const d = Math.floor(h / 24);

  return `${d}d ago`;
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const p = JSON.parse(raw);

      if (Array.isArray(p) && p.length > 0) {
        messages = p;
      } else {
        messages = [...SEED];
      }
    } else {
      messages = [...SEED];
    }

    const likedRaw = localStorage.getItem(LIKED_KEY);

    if (likedRaw) {
      const parsedLiked = JSON.parse(likedRaw);

      if (Array.isArray(parsedLiked)) {
        liked = new Set(parsedLiked);
      }
    }
  } catch (error) {
    console.error("Could not load saved messages:", error);

    messages = [...SEED];
    liked = new Set();
  }
}

function save() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages)
    );

    localStorage.setItem(
      LIKED_KEY,
      JSON.stringify([...liked])
    );
  } catch (error) {
    console.error("Could not save messages:", error);
  }
}

function renderMoods() {
  moodSel.innerHTML = MOODS.map((m) => `
    <button
      data-m="${m.id}"
      class="mood-btn ${m.id === currentMood ? "active" : ""}"
    >
      <span>${m.emoji}</span>
      ${m.label}
    </button>
  `).join("");

  moodSel.querySelectorAll(".mood-btn").forEach((b) => {
    b.addEventListener("click", () => {
      currentMood = b.dataset.m;

      renderMoods();
    });
  });
}

function renderFilters() {
  const all = [
    {
      id: "all",
      label: "All",
      emoji: "✦"
    },
    ...MOODS
  ];

  filterRow.innerHTML = all.map((m) => `
    <button
      data-mood="${m.id}"
      class="filter ${filterMood === m.id ? "active" : ""}"
    >
      ${m.emoji ? m.emoji + " " : ""}
      ${m.label}
    </button>
  `).join("");

  filterRow.querySelectorAll(".filter").forEach((b) => {
    b.addEventListener("click", () => {
      filterMood = b.dataset.mood;

      renderFilters();
      renderFeed();
    });
  });
}

function filtered() {
  let list = [...messages].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  if (filterMood !== "all") {
    list = list.filter(
      (m) => m.mood === filterMood
    );
  }

  if (searchQ.trim()) {
    const q = searchQ.toLowerCase();

    list = list.filter(
      (m) =>
        m.text.toLowerCase().includes(q) ||
        m.anonId.toLowerCase().includes(q) ||
        m.mood.toLowerCase().includes(q)
    );
  }

  return list;
}

function renderFeed() {
  const list = filtered();

  $("#totalMessages").textContent = messages.length;

  $("#totalLikes").textContent = messages.reduce(
    (a, b) => a + b.likes,
    0
  );

  if (list.length === 0) {
    feedEl.innerHTML = `
      <div
        class="card"
        style="grid-column:1/-1;text-align:center;padding:32px;color:#777"
      >
        No whispers found. Try another mood or search.
      </div>
    `;

    return;
  }

  feedEl.innerHTML = list.map((m) => {
    const moodObj =
      MOODS.find((x) => x.id === m.mood) ||
      MOODS[0];

    const grad =
      GRADIENTS[
        m.gradient % GRADIENTS.length
      ];

    const isLiked = liked.has(m.id);

    return `
      <div class="card" id="${m.id}">

        <div class="card-top">

          <div class="card-identity">

            <div
              class="card-avatar"
              style="background:${grad}"
            ></div>

            <span class="card-anon">
              ${escapeHtml(m.anonId)}
            </span>

          </div>

          <span class="card-time">
            ${timeAgo(m.timestamp)}
          </span>

        </div>

        <div class="mood-tag">
          <span>${moodObj.emoji}</span>
          ${moodObj.label}
        </div>

        <div class="card-text">
          ${escapeHtml(m.text)}
        </div>

        <div class="card-actions">

          <button
            class="action ${isLiked ? "liked" : ""}"
            onclick="toggleLike('${m.id}')"
          >
            ${isLiked ? "♥" : "♡"} ${m.likes}
          </button>

          <button
            class="action"
            onclick="copyMsg('${m.id}')"
          >
            ⎙ Copy
          </button>

        </div>

      </div>
    `;
  }).join("");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

window.toggleLike = (id) => {
  const msg = messages.find(
    (m) => m.id === id
  );

  if (!msg) {
    return;
  }

  if (liked.has(id)) {
    liked.delete(id);

    msg.likes = Math.max(
      0,
      msg.likes - 1
    );
  } else {
    liked.add(id);

    msg.likes++;
  }

  save();
  renderFeed();
};

window.copyMsg = async (id) => {
  const msg = messages.find(
    (m) => m.id === id
  );

  if (!msg) {
    return;
  }

  try {
    await navigator.clipboard.writeText(
      msg.text
    );

    toast("Copied to clipboard");
  } catch {
    toast(
      "Copy: " +
      msg.text.slice(0, 40)
    );
  }
};

function toast(t) {
  const el = $("#toast");

  el.textContent = t;

  el.classList.add("show");

  setTimeout(() => {
    el.classList.remove("show");
  }, 2400);
}


// WRITE LOGIC

function updateChar() {
  const len = msgInput.value.length;

  charCount.textContent =
    `${len} / 500`;

  postBtn.disabled =
    len === 0 || len > 500;
}

msgInput.addEventListener(
  "input",
  updateChar
);

msgInput.addEventListener(
  "focus",
  () => {
    $("#writeCard").style.transform =
      "translateY(-2px)";
  }
);

msgInput.addEventListener(
  "blur",
  () => {
    $("#writeCard").style.transform =
      "";
  }
);

postBtn.addEventListener(
  "click",
  () => {
    const text =
      msgInput.value.trim();

    if (!text || text.length > 500) {
      return;
    }

    const newMsg = {
      id: Math.random()
        .toString(36)
        .slice(2, 9),

      text,

      mood: currentMood,

      timestamp: Date.now(),

      likes: 0,

      anonId:
        `anon#${Math.floor(
          1000 + Math.random() * 9000
        )}`,

      gradient:
        Math.floor(
          Math.random() *
          GRADIENTS.length
        )
    };

    messages.unshift(newMsg);

    save();

    msgInput.value = "";

    updateChar();

    renderFeed();

    toast(
      "Message stored forever — anonymously."
    );

    $("#previewId").textContent =
      newMsg.anonId;
  }
);


searchInput.addEventListener(
  "input",
  (e) => {
    searchQ = e.target.value;

    renderFeed();
  }
);


// RANDOM ANON PREVIEW ON LOAD

function initPreview() {
  $("#previewAvatar").style.background =
    GRADIENTS[
      Math.floor(
        Math.random() *
        GRADIENTS.length
      )
    ];

  $("#previewId").textContent =
    `anon#${Math.floor(
      1000 + Math.random() * 9000
    )}`;

  $("#onlineCount").textContent =
    120 +
    Math.floor(Math.random() * 80);
}


// MODAL

$("#infoBtn").addEventListener(
  "click",
  () => {
    $("#infoModal").classList.remove(
      "hidden"
    );
  }
);

$("#closeModal").addEventListener(
  "click",
  () => {
    $("#infoModal").classList.add(
      "hidden"
    );
  }
);

$("#modalBg").addEventListener(
  "click",
  () => {
    $("#infoModal").classList.add(
      "hidden"
    );
  }
);

$("#gotIt").addEventListener(
  "click",
  () => {
    $("#infoModal").classList.add(
      "hidden"
    );
  }
);


// INIT

load();

initPreview();

renderMoods();

renderFilters();

updateChar();

renderFeed();


// REFRESH TIME AGO EVERY 30 SECONDS

setInterval(
  renderFeed,
  30000
);