'use client'

import { Input, Spinner, cn } from '@nextui-org/react'
import { type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem } from './form'

interface FormTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  form: UseFormReturn<TFieldValues>
  name: ControllerProps<TFieldValues, TName>['name']
  label?: string
  placeholder: string
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  className?: string
  description?: React.ReactNode
  isLoading?: boolean
  onInput?: (value: string) => void
  onBlur?: (value: string) => void
  forceFocus?: boolean
  transformInput?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'
  maxLength?: number
  minLength?: number
  autoComplete?: boolean
}

function FormTextInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: FormTextInputProps<TFieldValues, TName>) {
  return (
    <FormField
      name={props.name}
      control={props.form.control}
      render={({ field, fieldState }) => (
        <FormItem className={cn('flex-1', props.className)}>
          <FormControl>
            <Input
              {...field}
              type='text'
              value={field.value}
              label={props.label}
              placeholder={props.placeholder}
              labelPlacement='outside'
              variant='underlined'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              startContent={props.startContent}
              endContent={props.isLoading ? <Spinner size='sm' color='default' /> : props.endContent}
              description={props.description}
              onInput={(e) => {
                if (props.onInput) props.onInput(e.currentTarget.value)
              }}
              autoComplete={props.autoComplete ? 'on' : 'off'}
              onBlur={() => {
                field.onBlur()
                if (props.onBlur) props.onBlur(field.value)
              }}
              onClick={(e) => {
                field.onChange(e)

                if (props.forceFocus) e.currentTarget.focus()
              }}
              classNames={{
                input: cn(
                  props.transformInput === 'uppercase'
                    ? 'uppercase'
                    : props.transformInput === 'lowercase'
                    ? 'lowercase'
                    : props.transformInput === 'capitalize'
                    ? 'capitalize'
                    : ''
                ),
                label: 'text-base',
              }}
              maxLength={props.maxLength}
              minLength={props.minLength}
            />
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { FormTextInput, type FormTextInputProps }
