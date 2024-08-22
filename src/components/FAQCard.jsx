import { h } from "preact";

const FAQCard = ({ iconSrc, title, onClick }) => {
  return (
    <div className="w-48 max-sm:w-32 h-24 bg-gray-400 rounded-xl p-2 flex flex-col items-center cursor-pointer dark:bg-neutral-500">
      <img src={iconSrc} alt="icon" className="w-8 h-8 mb-2 " />
      <div className="text-white font-mono font-semibold text-sm dark:text-gray-100 text-center">
        {title}
      </div>
    </div>
  );
};

export default FAQCard;
