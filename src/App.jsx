import React, { useState } from "react";
import {
  Menu,
  Search,
  User,
  Check,
  BarChart3,
  BookOpen,
  Sparkles,
} from "lucide-react";
import "./App.css";

const TOOL_KEYS = {
  SUMMARIZATION: "summarization",
  QUIZ: "quiz",
  FLASHCARD: "flashcard",
  ASSIGNMENT: "assignment",
  VISUAL: "visual",
  TEXTBOOK: "textbook",
};

function App() {
  const [mode, setMode] = useState("home"); // "home" | "tool"
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolClick = (toolKey) => {
    setSelectedTool(toolKey);
    setMode("tool");
  };

  const handleBackToHome = () => {
    setSelectedTool(null);
    setMode("home");
  };

  if (mode === "tool" && selectedTool) {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">AI Study Companion</h1>
          <p className="app-subtitle">Prototype – {toolTitle(selectedTool)}</p>
        </header>

        <ToolDetail toolKey={selectedTool} onBack={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">AI Study Companion</h1>
        <p className="app-subtitle">Choose a study tool to get started</p>
      </header>

      <main className="dashboard">
        <div className="dashboard-card">
          <div className="mock-screen gradient">
            {/* Top Bar */}
            <div className="top-bar">
              <button className="icon-button">
                <Menu size={20} />
              </button>
              <span className="top-bar-title">AI Study Companion</span>
              <div className="top-bar-right">
                <button className="icon-button">
                  <Search size={18} />
                </button>
                <button className="icon-button">
                  <User size={18} />
                </button>
              </div>
            </div>

            {/* Balanced content layout */}
            <div className="dashboard-content">

              {/* MAIN SECTION – TOOLS */}
              <div className="dashboard-main">
                <p className="dashboard-intro">What would you like help with today?</p>

                <div className="tool-grid">
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.SUMMARIZATION)}>Summarization</button>
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.QUIZ)}>Quiz Generator</button>
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.FLASHCARD)}>Flash Card</button>
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.ASSIGNMENT)}>Assignment Tracker</button>
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.VISUAL)}>Visual Generator</button>
                  <button className="tool-pill" onClick={() => handleToolClick(TOOL_KEYS.TEXTBOOK)}>Textbook Hub</button>
                </div>
              </div>

              {/* CHAT – smaller + spaced */}
              <div className="dashboard-chat">
                <ChatPanel />
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function toolTitle(key) {
  return {
    summarization: "Summarization",
    quiz: "Quiz Generator",
    flashcard: "Flash Cards",
    assignment: "Assignment Tracker",
    visual: "Visual Generator",
    textbook: "Textbook Hub",
  }[key];
}

function ToolDetail({ toolKey, onBack }) {
  const detail = TOOL_DETAILS[toolKey];
  if (!detail) return null;

  return (
    <div className="tool-page">
      <button className="back-button" onClick={onBack}>← Previous Page</button>

      <div className="tool-layout">
        <div className="tool-text">
          <span className="tool-pill-label">{detail.label}</span>
          <h2 className="tool-title">{detail.label}</h2>
          <p className="tool-tagline">{detail.tagline}</p>

          <ul className="tool-bullets">
            {detail.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        <div className="tool-mock">
          <div className="mock-screen gradient tool-mock-inner">
            {detail.main}
          </div>
        </div>
      </div>
    </div>
  );
}

const TOOL_DETAILS = {
  summarization: {
    label: "Summarization",
    tagline: "Turn long readings into structured study notes.",
    bullets: [
      "Paste textbook chapters or lecture notes.",
      "AI identifies key points and definitions.",
      "Helps you study faster and more efficiently.",
    ],
    main: (
      <>
        <div className="tool-tag">Input</div>
        <div className="tool-textarea">Paste your notes here…</div>
        <div className="tool-tag secondary">Output</div>
        <div className="tool-output">
          Summary<br />Key concepts<br />Important terms
        </div>
      </>
    ),
  },
  quiz: {
    label: "Quiz Generator",
    tagline: "Generate practice questions instantly.",
    bullets: [
      "Produce quizzes from your notes.",
      "Multiple-choice or short-answer.",
      "Check your understanding quickly.",
    ],
    main: (
      <>
        <div className="tool-tag">From Notes</div>
        <div className="tool-textarea small">
          The mitochondria is the powerhouse of the cell…
        </div>
        <div className="tool-output quiz">
          <p>Q1. What is the primary role of mitochondria?</p>
          <ul>
            <li>A. Energy production</li>
            <li>B. Photosynthesis</li>
            <li>C. Cell division</li>
          </ul>
        </div>
      </>
    ),
  },
  flashcard: {
    label: "Flash Cards",
    tagline: "AI-powered flashcards for memorization.",
    bullets: [
      "Automatically generated from notes.",
      "Great for studying vocabulary & concepts.",
      "Spaced repetition support.",
    ],
    main: (
      <>
        <div className="tool-flashcard">
          <div className="tool-flashcard-label">Question</div>
          <div className="tool-flashcard-body">What is ATP?</div>
        </div>

        <div className="tool-flashcard secondary-card">
          <div className="tool-flashcard-label">Answer</div>
          <div className="tool-flashcard-body">
            ATP is the molecule used for cellular energy.
          </div>
        </div>
      </>
    ),
  },
  assignment: {
    label: "Assignment Tracker",
    tagline: "Stay ahead of deadlines.",
    bullets: [
      "Organize tasks by class.",
      "Highlight urgent items.",
      "Track completion progress.",
    ],
    main: (
      <div className="tool-list">
        <div className="tool-list-item">
          <span><span className="dot green" />CS 201 – Problem Set 3</span>
          <span className="tool-list-meta">Due Thu</span>
        </div>
        <div className="tool-list-item">
          <span><span className="dot yellow" />Biology – Lab Report</span>
          <span className="tool-list-meta">Due Sun</span>
        </div>
      </div>
    ),
  },
  visual: {
    label: "Visual Generator",
    tagline: "Transform concepts into diagrams.",
    bullets: [
      "Explain complex topics visually.",
      "Helps with memory and comprehension.",
      "Great for presentations.",
    ],
    main: (
      <>
        <div className="tool-textarea small">
          “Explain the water cycle.”
        </div>
        <div className="tool-diagram">
          <div className="diagram-node">Evaporation</div>
          <div className="diagram-node">Condensation</div>
          <div className="diagram-node">Precipitation</div>
        </div>
      </>
    ),
  },
  textbook: {
    label: "Textbook Hub",
    tagline: "All your books in one place.",
    bullets: ["Upload PDFs", "Search chapters", "Bookmark pages"],
    main: (
      <>
        <div className="tool-shelf">
          <div className="book-spine">Biology 101</div>
          <div className="book-spine">Psychology</div>
          <div className="book-spine">Calculus</div>
        </div>
      </>
    ),
  },
};

function ChatPanel() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hi! I’m your AI Study Companion. How can I help today?" },
    { id: 2, sender: "user", text: "I have a biology exam on photosynthesis." },
    { id: 3, sender: "ai", text: "I can summarize chapters, make quizzes, or create flashcards!" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: messages.length + 1, sender: "user", text: input };
    const aiMsg = {
      id: messages.length + 2,
      sender: "ai",
      text:
        "This is a demo AI response. In a real app, this would be dynamically generated!",
    };

    setMessages([...messages, userMsg, aiMsg]);
    setInput("");
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-title-left">
          <div className="chat-icon">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="chat-title">AI Study Assistant</div>
            <div className="chat-subtitle">Ask questions about your courses</div>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`chat-message ${m.sender === "user" ? "user" : "ai"}`}
          >
            <div className="chat-message-text">{m.text}</div>
          </div>
        ))}
      </div>

      <form className="chat-input-row" onSubmit={sendMessage}>
        <input
          className="chat-input"
          placeholder="Ask a question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chat-send-button">Send</button>
      </form>
    </div>
  );
}

export default App;
