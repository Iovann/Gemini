// Welcome.js
import { h } from "preact";
import FAQCard from "../components/FAQCard";

const Welcome = ({ messages = [] }) => {
  const faqs = [
    { icon: "/assets/icons/question.svg", title: "How to use the app?" },
    { icon: "/assets/icons/help.svg", title: "What is the cost?" },
    { icon: "/assets/icons/feedback.svg", title: "Give feedback" },
    { icon: "/assets/icons/support.svg", title: "Contact support" },
  ];

  return (
    <div className="max-w-5xl">
      {" "}
      {/* Ajoutez "max-w-5xl" pour élargir */}
      {messages.length === 0 ? (
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/assets/icons/gemini.svg"
            alt="gemini icon"
            width={64}
            height={54}
            className="animate-rotate"
          />
          <p className="text-4xl text-gray-600 text-center dark:text-white/70">
            Hi, Dear user
          </p>
          <p className="text-center text-5xl font-semibold">
            Can I help you with anything?
          </p>
          <p className="text-center text-gray-500 dark:text-white/70">
            Ready to assist you with anything you need, from answering questions
            to providing recommendations. Let's get started!
          </p>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 px-4 py-4">
            {faqs.map((faq, index) => (
              <FAQCard
                key={index}
                iconSrc={faq.icon}
                title={faq.title}
                onClick={() => console.log(faq.title)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between  mx-auto overflow-hidden">
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
    </div>
  );
};

export default Welcome;
