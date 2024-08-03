import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useState } from 'react';
import { TextFieldTypes } from './types';

export default function TextField({
  values,
  id,
  touched,
  errors,
  handleBlur,
  handleChange,
  label,
  type,
  placeholder,
  readonly
}: TextFieldTypes) {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-y-1">
      <label htmlFor={id} className="block text-sm font-manrope">
        {label}
      </label>
      <div className="relative mt-1.5">
        <input
          className="border w-full border-zinc-500 text-base font-normal placeholder:text-gray-400 rounded-md ring-primary focus:ring-primary focus:border-primary pl-3 py-3 pr-10"
          type={showPassword ? 'text' : type}
          id={id}
          name={id}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values[id]}
          placeholder={placeholder}
          readOnly={readonly}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
          >
            {showPassword ? (
            <p>hide</p>
            ) : (
            <p>show</p>
            )}
          </button>
        )}
        {errors[id] && touched[id] && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors[id] && touched[id] ? (
        <p className="text-sm text-red-600" id={`${id}-error`}>
          {errors[id]}.
        </p>
      ) : null}
    </div>
  );
}
