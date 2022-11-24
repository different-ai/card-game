import { classNames } from "./Input";

export const PrimaryButton = ({
  children, className = "", onClick = () => null, ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        "inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:max-w-max",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
