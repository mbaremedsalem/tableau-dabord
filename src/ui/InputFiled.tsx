import { Controller } from "react-hook-form";
import { baseStyles, FormField } from "./FormField";
import { Input, InputProps, TimePicker } from "antd";
import { ControlledFieldProps, InputFieldProps } from "./types";
import dayjs from "dayjs";

export const InputField = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  required,
  disabled,
  disabledTime,
  readOnly,
  value,
  rules,
  className,
  wrapperClassName,
  prefix,
  suffix,
  min,
  max,
  ...props
}: InputFieldProps & ControlledFieldProps & InputProps) => (
  <Controller
    name={name}
    control={control}
    rules={{ required: required && "This field is required", ...rules }}
    render={({ field, fieldState: { error } }) => (
      <FormField
        label={label}
        error={error?.message}
        // className={wrapperClassName}
        className={`w-full ${wrapperClassName}`}
      >
        {type==="Time" ? (
          <TimePicker
          {...field}
          onChange={(timeString) => {
            const formattedTime = dayjs(timeString).format("HH:mm:ss");
            field.onChange(formattedTime);
          }}
          format="h:mm A"  
          use12Hours
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          disabledTime ={disabledTime}
          status={error ? "error" : ""}
          className={`${baseStyles.input} ${readOnly && baseStyles.readonly} ${className}`}
      
          // value={field.value}
          value={field.value ? dayjs(field.value, "HH:mm:ss") : null}
          
          
        />
        ) : (<Input
          {...field}
          prefix={prefix}
          suffix={suffix}
          min={min}
          max={max}
          value={value ?? field.value}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          status={error ? "error" : ""}
          className={`${baseStyles.input} ${
            readOnly && baseStyles.readonly
          } ${className}`}
          {...props}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!props.maxLength || inputValue.length <= props.maxLength) {
              field.onChange(inputValue); // Update react-hook-form state
            } else {
              field.onChange(inputValue.slice(0, props.maxLength));
            }
          }}
        />)}
        
      </FormField>
    )}
  />
);
