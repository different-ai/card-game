import { classNames } from "./Input";
import { LangameIcon } from "./LangameIcon";

export const QuestionCard = ({ className, children, header }) => {
  return (
    <div
      className={classNames(
        "rounded-lg bg-white shadow-lg h-[330px] w-[232px] border-4 border-indigo-600 flex flex-col p-4 font-bold",
        className
      )}
    >
      <div className="flex justify-between">
        <LangameIcon /> <div className="text-gray-700 text-xs">{header}</div>
      </div>
      <div className="m-auto text-center">{children}</div>

      <LangameIcon className="ml-auto" />
    </div>
  );
};
