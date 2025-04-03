import React from "react";

type FormRowProps = {
  label?: string;
  error?: string;
  children: React.ReactNode;
};

function FormRow({ label, error, children }: FormRowProps) {
  // Check if the children is a React element before accessing its props same as (children?.props.id)
  const childElement = React.Children.only(
    Array.isArray(children) ? children[0] : children,
  );
  const id = childElement.props.id;

  return (
    <div className="relative flex flex-col gap-0.5 pt-[1.5rem] lg:pt-[1.2rem]">
      {label && (
        <label className="text-xl text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-xl text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
