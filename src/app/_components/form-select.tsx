'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { type Key } from 'react'
import { type ControllerProps, type FieldPath, type FieldValues, type UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem } from './form'

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  form: UseFormReturn<TFieldValues>
  name: ControllerProps<TFieldValues, TName>['name']
  label?: string
  placeholder?: string
  options: { label: string; value: string }[]
  selectionMode: 'single' | 'multiple'
  onSelectionChange?: (values: Key[]) => void
  className?: string
  description?: React.ReactNode
  defaultValue?: ControllerProps<TFieldValues, TName>['defaultValue']
}

function FormSelect<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  ...props
}: FormSelectProps<TFieldValues, TName>) {
  return (
    <FormField
      name={props.name}
      control={props.form.control}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <FormItem className={props.className}>
          <FormControl>
            <Select
              ref={field.ref}
              name={field.name}
              value={field.value}
              isDisabled={field.disabled}
              onBlur={field.onBlur}
              label={props.label}
              placeholder={props.placeholder}
              labelPlacement='outside'
              variant='underlined'
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              onSelectionChange={(keys) => {
                if (props.onSelectionChange) {
                  props.onSelectionChange(Array.from(keys))
                }

                if (props.selectionMode === 'single') {
                  return field.onChange(Array.from(keys)[0])
                }

                field.onChange(Array.from(keys))
              }}
              selectionMode={props.selectionMode}
              description={props.description}
              selectedKeys={[field.value]}
              renderValue={(items) =>
                items.map((a) => (
                  <span key={a.key} className='capitalize text-default-800'>
                    {a.textValue}
                  </span>
                ))
              }
              disallowEmptySelection={props.selectionMode === 'single'}
              classNames={{ label: 'text-base', popoverContent: '!font-sans glass text-white' }}
            >
              {props.options.map((option) => (
                <SelectItem key={option.value} className='capitalize'>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export { FormSelect, type FormSelectProps }
