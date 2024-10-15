"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type BaseSyntheticEvent,
  type HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useId,
  isValidElement,
  cloneElement,
} from "react";
import {
  Controller,
  type ControllerProps,
  type DefaultValues,
  type FieldPath,
  type FieldValues,
  FormProvider,
  type UseFormReturn,
  useFormContext,
  useForm as useFormCore,
} from "react-hook-form";
import { type ZodSchema } from "zod";

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  className?: string;
  form: UseFormReturn<TFieldValues>;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

function Form<TFieldValues extends FieldValues = FieldValues>({
  ...props
}: FormProps<TFieldValues>) {
  return (
    <FormProvider {...props.form}>
      <form
        onSubmit={(e) => {
          if (props.onSubmit) {
            return props.onSubmit(e);
          }

          e.preventDefault();
        }}
        className={props.className}
        autoComplete="off"
      >
        {props.children}
      </form>
    </FormProvider>
  );
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormItemContextValue = {
  id: string;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const FormItemContext = createContext<FormItemContextValue | null>(null);

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);

  const itemContext = useContext(FormItemContext);

  if (!fieldContext) throw new Error("Your forgot to wrap FormFieldContext");

  if (!itemContext) throw new Error("Your forgot to wrap FormItemContext");

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormControl = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>((_, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <ForwardProps
      ref={ref}
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
    >
      {_.children}
    </ForwardProps>
  );
});

FormControl.displayName = "FormControl";

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  },
);

FormItem.displayName = "FormItem";

interface UseFormOptions<TFieldValues extends FieldValues> {
  schema: ZodSchema<TFieldValues>;
  onSubmit?: (data: ZodSchema<TFieldValues>["_output"]) => void;
  defaultValues?: Partial<TFieldValues>;
  logger?: boolean;
}

function useForm<TFieldValues extends FieldValues>(
  options: UseFormOptions<TFieldValues>,
) {
  const form = useFormCore<ZodSchema<TFieldValues>["_input"]>({
    resolver: zodResolver(options.schema),
    defaultValues: options.defaultValues as DefaultValues<TFieldValues>,
  });

  const handleSubmit = () => {
    return form.handleSubmit((input) => {
      if (options.logger) console.table(input);

      return options.onSubmit?.(input);
    })();
  };

  const hasUnSavedChanges = !!Object.keys(form.formState.dirtyFields).length;

  const discardChanges = () => {
    form.reset(form.formState.defaultValues as TFieldValues);
  };

  const handleFormDefaults = (e?: BaseSyntheticEvent) => e?.preventDefault();

  const handleOnSave = (input: TFieldValues) => form.reset(input);

  const handleReset = () => form.reset({} as TFieldValues);

  if (options.logger) {
    const errors = form.formState.errors;

    if (Object.keys(errors).length) {
      console.log(
        "Errors: ############################################################",
      );
      console.table(errors, ["name", "message", "type"]);
      console.log(
        "Errors: ############################################################",
      );
    }
  }

  return {
    form,
    handleSubmit,
    hasUnSavedChanges,
    discardChanges,
    handleFormDefaults,
    handleOnSave,
    handleReset,
  };
}

interface ForwardPropsProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const ForwardProps = forwardRef<HTMLElement, ForwardPropsProps>(
  ({ children, ...props }, ref) => {
    if (isValidElement(children)) {
      const combinedProps = { ...props, ref };

      return cloneElement(children, combinedProps);
    }

    return <>{children}</>;
  },
);

ForwardProps.displayName = "ForwardProps";

export { Form, FormField, FormItem, FormControl, useForm, type UseFormOptions };
