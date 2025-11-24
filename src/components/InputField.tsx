import React from 'react';
import { Field, Label, ErrorMessage } from '../catalyst/fieldset';
import { Input } from '../catalyst/input';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  return (
    <Field>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        data-invalid={error ? '' : undefined}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  );
};
