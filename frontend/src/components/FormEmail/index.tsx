import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import FormEmailInput from './FormEmailInput';
import FormEmailTextArea from './FormEmailTextArea';
import { Inputs } from './Inputs';

function FormEmail() {

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
    mode: "onSubmit",
    shouldFocusError: false,
    criteriaMode: "all"
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch(`/api/contact`, {
      method: 'post',
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    reset({ Name: '', Email: '', Phone: '', Subject: '', Message: '' });
  }, [isSubmitSuccessful]);

  return (
    <div>
      <h1 className='w-full mb-4'>TEXT ME IN A FORM BELOW!</h1>
      <p className='mb-10'>Address: 53 Dimitri Uznadze St, Tbilisi 0163</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start w-full"
      >
        <div className='grid grid-cols-2 gap-10 mb-10 w-full'>
          <FormEmailInput name='Name' register={register} errors={errors} isRequired={true} />
          <FormEmailInput
            name='Email'
            register={register}
            errors={errors}
            isRequired={true}
            patternData={
              {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email'
              }
            }
          />
          <FormEmailInput
            name='Phone'
            register={register}
            errors={errors}
            isRequired={false}
            patternData={
              {
                value: /\d+/,
                message: 'Only digits acceptable'
              }
            }
          />
          <FormEmailInput name='Subject' register={register} errors={errors} isRequired={true} />
        </div>
        <FormEmailTextArea name="Message" register={register} errors={errors} isRequired={true} />
        <button type="submit" className="text-primary hover:text-white border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center font-regular">SEND MESSAGE</button>
      </form>
    </div>
  )
}

export default FormEmail



