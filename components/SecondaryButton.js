import { classNames } from "../components/Input";

export const SecondaryButton = ({
  children,
  className = "",
  onClick = () => null,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={classNames(
        "inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
