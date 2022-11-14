import React from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Inputs';
import { ErrorMessage } from '@hookform/error-message';

const textAreaStyling = "border-2 border-primary rounded-md p-2 placeholder:italic focus-visible:outline-offset-0 focus-visible:border-black focus-visible:outline-0 w-full h-[100px]";

const errorValidationTooltipStyling = "absolute bottom-[110px] left-1 bg-white px-2 rounded-md text-center z-10 text-base text-red-600 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-t-white after:border-b-black after:border-x-black";

type Props = {
  name: keyof Inputs,
  register: UseFormRegister<Inputs>,
  errors: Partial<FieldErrorsImpl<Inputs>>,
  isRequired: boolean,
}

type registerOptionsType = {
  required: {
    value: boolean,
    message: string
  },
}

function FormEmailTextArea({ name, register, errors, isRequired }: Props) {

  const registerOptions: registerOptionsType = {
    required: {
      value: isRequired,
      message: 'This field is required'
    },
  }
  return (
    <div className='relative w-full h-[100px] mb-8'>
      <textarea
        className={textAreaStyling}
        placeholder={name}
        {...register(name, registerOptions)}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p className={errorValidationTooltipStyling}>{message}</p>}
      />
    </div>

  )
}

export default FormEmailTextArea