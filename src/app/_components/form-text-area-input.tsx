"use client";

import { Spinner, Textarea } from "@nextui-org/react";
import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import { FormControl, FormField, FormItem } from "./form";

interface FormTextAreaInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>;
  name: ControllerProps<TFieldValues, TName>["name"];
  label: string;
  placeholder: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  isLoading?: boolean;
  onInput?: (value: string) => void;
  onBlur?: (value: string) => void;
  maxLength?: number;
}

function FormTextAreaInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: FormTextAreaInputProps<TFieldValues, TName>) {
  return (
    <FormField
      name={props.name}
      control={props.form.control}
      render={({ field, fieldState }) => (
        <FormItem className={props.className}>
          <FormControl>
            <Textarea
              {...field}
              type="text"
              value={field.value}
              label={props.label}
              placeholder={props.placeholder}
              labelPlacement="outside"
              variant="underlined"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              startContent={props.startContent}
              endContent={
                props.isLoading ? (
                  <Spinner size="sm" color="default" />
                ) : (
                  props.endContent
                )
              }
              description={
                props.description ??
                (props.maxLength ? (
                  <div className="text-sm">
                    {((props.form.watch(props.name) ?? "") as string).length} of{" "}
                    {props.maxLength} characters used
                  </div>
                ) : null)
              }
              onInput={(e) => {
                if (props.onInput) props.onInput(e.currentTarget.value);
              }}
              onBlur={() => {
                field.onBlur();
                if (props.onBlur) props.onBlur(field.value);
              }}
              classNames={{
                input: "resize-y min-h-20",
                label: "text-base",
              }}
              maxLength={props.maxLength}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export { FormTextAreaInput, type FormTextAreaInputProps };
