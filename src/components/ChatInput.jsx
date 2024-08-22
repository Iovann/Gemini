// ChatInput.js
import { h } from "preact";

const ChatInput = ({ message, onMessageChange, onSend }) => {
  return (
    <div className="w-full max-w-4xl mx-auto border-gray-300 dark:border-gray-700 p-4 flex items-center">
      <input
        type="text"
        value={message}
        onChange={onMessageChange}
        placeholder="Type your message..."
        className="flex-grow p-2 border bg-white text-black dark:bg-gray-800 dark:border-gray-600 rounded-lg"
      />
      <button
        onClick={onSend}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
