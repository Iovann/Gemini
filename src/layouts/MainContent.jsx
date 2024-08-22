// MainContent.js
import { useState } from "preact/hooks";
import ChatInput from "../components/ChatInput";
import Welcome from "../components/Welcome";

export default function MainContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showContent, setShowContent] = useState(true);

  const API_KEY = "AIzaSyC3lbInIqt6aKIUg938nbBIn-cfq4oyR6o"; // Remplacez par votre clé API Gemini

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, fromUser: true }];
      setMessages(newMessages);
      setMessage("");
      setShowContent(false); // Masquer le contenu principal

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: message }],
                },
              ],
            }),
          }
        );

        const data = await response.json();

        if (
          response.ok &&
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].content.parts[0]
        ) {
          const reply =
            data.candidates[0].content.parts[0].text || "No reply received";
          setMessages([...newMessages, { text: reply, fromUser: false }]);
        } else {
          console.error(
            "Error:",
            data.error || "Unexpected response structure"
          );
          setMessages([
            ...newMessages,
            { text: "Sorry, I didn't get a response.", fromUser: false },
          ]);
        }
      } catch (error) {
        console.error("Request failed:", error);
        setMessages([
          ...newMessages,
          { text: "Sorry, something went wrong.", fromUser: false },
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900 items-center justify-center">
      <header className="shadow-md p-4 w-full flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            src="/assets/icons/gemini.svg"
            alt="gemini icon"
            width={40}
            height={40}
          />
          <h1 className="text-2xl text-neutral-500 dark:text-neutral-300 font-bold">
            Gemini AI
          </h1>
        </div>

        <div className="flex gap-4">
          <button
            className="ml-4 text-gray-800 focus:outline-none dark:text-white"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <p className="rounded-xl border border-tokena_gray p-2 dark:border-tokena_gray">
                <img
                  src="/assets/icons/sun.svg"
                  alt="sun icon"
                  className="h-auto max-w-full"
                  width={20}
                  height={20}
                />
              </p>
            ) : (
              <p className="rounded-xl border border-tokena_gray p-2 dark:border-tokena_gray">
                <img
                  src="/assets/icons/moon.svg"
                  alt="moon icon"
                  className="h-auto max-w-full"
                  width={20}
                  height={20}
                />
              </p>
            )}
          </button>
          <div className="flex items-center rounded-full bg-slate-300 dark:bg-slate-300">
            <img
              src="/assets/icons/account.svg"
              alt="Account avatar"
              width={40}
              height={40}
            />
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 text-black dark:text-neutral-300">
        {showContent ? (
          <Welcome messages={messages} />
        ) : (
          <div className="max-w-5xl flex flex-col justify-between">
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${msg.fromUser ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          msg.fromUser
                            ? "/assets/icons/pwa-192.png"
                            : "/assets/icons/gemini.svg"
                        }
                        alt="avatar"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {msg.fromUser ? "You" : "Assistant"}
                    <time className="text-xs opacity-50">12:45</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <ChatInput
        message={message}
        onMessageChange={handleMessageChange}
        onSend={handleSend}
      />

      <footer className="bg-gray-100 dark:bg-neutral-800 py-2 text-center w-full text-neutral-700 dark:text-white">
        <p>© 2024 Gemini AI</p>
      </footer>
    </div>
  );
}
