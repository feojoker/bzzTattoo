import React from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Inputs';

import { ErrorMessage } from '@hookform/error-message';

const inputStyling = "border-2 border-primary rounded-md p-2 w-full placeholder:italic focus-visible:outline-offset-0 focus-visible:border-black focus-visible:outline-0";

const errorValidationTooltipStyling = "absolute bottom-[58px] left-1 bg-white px-2 rounded-md text-center z-10 text-base text-red-600 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-t-white after:border-b-black after:border-x-black";

type Props = {
  name: keyof Inputs,
  register: UseFormRegister<Inputs>,
  errors: Partial<FieldErrorsImpl<Inputs>>,
  patternData?: {
    value: RegExp,
    message: string,
  },
  isRequired: boolean,
}

type registerOptionsType = {
  required: {
    value: boolean,
    message: string
  },
  pattern?: {
    value: RegExp,
    message: string,
  }
}

function FormEmailInput({ name, register, errors, patternData, isRequired }: Props) {
  const registerOptions: registerOptionsType = {
    required: {
      value: isRequired,
      message: 'This field is required'
    },
  }

  if (patternData) registerOptions.pattern = {
    value: patternData?.value,
    message: patternData?.message,
  }

  return (
    <div className='relative'>
      <input
        className={inputStyling}
        placeholder={name}
        {...register(name, registerOptions)}
      />

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <span className={errorValidationTooltipStyling}>{message}</span>}
      />
    </div>
  )
}

export default FormEmailInput