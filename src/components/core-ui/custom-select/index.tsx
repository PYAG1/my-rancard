import { CustomSelectTypes } from "./types";
import { ChevronDownIcon } from "lucide-react"; // Import the down arrow icon

export default function CustomSelect({
  options,
  handleBlur,
  handleChange,
  id,
  errors,
  values,
  touched,
  label,
}: CustomSelectTypes) {
  return (
    <div className="relative flex flex-col gap-y-2">
      <label htmlFor={id} className="block text-sm font-manrope">
        {label}
      </label>
      <div className="relative">
        <select
          name={id}
          value={values[id]}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full py-2 px-4 border rounded-md text-black font-light border-zinc-500 ring-primary focus:ring-primary focus:border-primary appearance-none pr-10"
        >
          <option value="" className="text-gray-400">
            Select Status
          </option>
          {options?.map((opt) => (
            <option key={opt?.id} value={opt?.id}>{opt?.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
          aria-hidden="true"
        />
        {errors[id] && touched[id] ? (
          <p className="mt-1 text-sm text-red-600" id={`${id}-error`}>
            {errors[id]}.
          </p>
        ) : null}
      </div>
    </div>
  );
}
