import React from 'react';

interface TextInputProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
  const { name, label, placeholder, value, type, onChange } = props;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="name">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border px-4 py-3 w-full border-disable rounded-lg placeholder:text-disable placeholder:font-light text-sm"
        required
      />
    </div>
  );
};

export default TextInput;
