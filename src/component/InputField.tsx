import React, { useState } from 'react';
import Input from './Input'; // Adjust the path as necessary

interface FormData {
  username: string;
  password: string;
}

// Minor component
  const InputField = () => {
    const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
    const [errorUsername, setErrorUsername] = useState<string | null>(null);
    const [errorPassword, setErrorPassword] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const inputFields: {
      id: string;
      name: keyof FormData;
      type: string;
      placeholder: string;
      iconSrc: string;
    }[] = [
      {
        id: "username",
        name: "username",
        type: "text",
        placeholder: "Enter your username",
        iconSrc: "./src/assets/user.png",
      },
      {
        id: "password",
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        iconSrc: "./src/assets/padlock.png",
                  field.name === "username" ? errorUsername : errorPassword
                }
              
    ];

    return (
      <>
        {inputFields.map((field) => (
          <Input
            id={field.id}
            key={field.name}
            src={field.iconSrc}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name as keyof FormData]}
            handleChange={handleChange}
            errorMessage={
              field.name === "username" ? errorUsername : errorPassword
            }
          />
        ))}
      </>
    );
  };
