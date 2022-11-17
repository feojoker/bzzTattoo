import React from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Inputs } from './Inputs';

import { ErrorMessage } from '@hookform/error-message';

const inputStyling = "max-w-[60%] border-2 border-primary rounded-md p-2 w-full placeholder:italic focus-visible:outline-offset-0 focus-visible:border-black focus-visible:outline-0";

const errorValidationTooltipStyling = "absolute top-[5px] left-[62%] max-w-[60%] bg-white p-2 rounded-md text-center  z-10 text-base leading-5 text-red-600 after:content-[''] after:absolute after:top-1/2 after:right-full after:mt-[-5px] after:border-[5px] after:border-r-white after:border-l-black after:border-y-black";

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