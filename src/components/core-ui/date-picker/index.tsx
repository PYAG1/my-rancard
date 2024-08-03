import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DatePickerTypes } from "./types";

export function DatePickerDemo({
  values,
  id,
  touched,
  label,
  errors,
  handleChange,
  placeholder
}: DatePickerTypes) {
  const handleDaySelect = (day: Date) => {
    // Ensure that you have some logic here if needed
    // For example, you might want to update the Formik field value
    // with the selected date
    //@ts-ignore
    handleChange({ target: { value: day, name: id } }); // This line might need adjustment based on your Formik implementation
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-manrope mb-3">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full flex items-center justify-between text-left font-normal border-zinc-500",
              !values[id] && "text-muted-foreground"
            )}
          >
            <span className="flex-1 text-left">
              {values[id] ? format(values[id], "PPP") : <span>{placeholder}</span>}
            </span>
            <CalendarIcon className="h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={values[id]}
            //@ts-ignore
            onSelect={handleDaySelect} // Pass the correct event handler
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errors[id] && touched[id] ? (
        <p className="text-sm text-red-600 mt-3" id={`${id}-error`}>
          {errors[id]}.
        </p>
      ) : null}
    </div>
  );
}
