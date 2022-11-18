import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { forwardRef, useCallback, useEffect, useState } from "react";

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const Input = forwardRef(function Input(
  { className, type = "text", ...args },
  ref
) {
  return (
    <input
      type={type}
      className={classNames(
        "block w-full rounded-md border-gray-300 shadow-sm sm:text-sm",
        className
      )}
      ref={ref}
      {...args}
    />
  );
});

export const CurrencyInput = forwardRef(function CurrencyInput(
  { symbol, children, className, ...args },
  ref
) {
  return (
    <div className="relative rounded-md shadow-sm">
      <Input
        type="number"
        className={classNames("pr-12", className)}
        ref={ref}
        {...args}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <span className="text-gray-500 sm:text-sm">{symbol}</span>
      </div>
    </div>
  );
});

export const Label = ({ className, children, optional = false }) => (
  <div className="flex justify-between">
    <label
      className={classNames(
        "block pb-1 text-sm font-medium text-gray-700",
        className
      )}
    >
      {children}
    </label>
    {optional && <span className="text-sm text-gray-500">Optional</span>}
  </div>
);
