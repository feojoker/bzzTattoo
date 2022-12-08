import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import FormEmailInput from './FormEmailInput';
import FormEmailTextArea from './FormEmailTextArea';
import { Inputs } from './Inputs';
import { FormEmail } from '../../types'
import DefaultButton from '../Buttons';

type Props = {
  data: FormEmail,
}
function FormEmail({ data }: Props) {

  const {
    title,
    subTitle,
    namePlaceholder,
    emailPlaceholder,
    subjectPlaceholder,
    phonePlaceholder,
    messagePlaceholder,
    buttonText,
    requiredError,
    phoneError,
    emailError,
  } = data;

  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<Inputs>({
    mode: "onBlur",
    shouldFocusError: false,
    criteriaMode: "all"
  });

  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === 'Enter' && e.target instanceof HTMLInputElement) e.preventDefault();
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch(`/api/contact`, {
      method: 'post',
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    reset({ name: '', email: '', phone: '', subject: '', message: '' });
  }, [isSubmitSuccessful]);

  return (
    <div>
      <h1 className='w-full mb-4 uppercase'>{title}</h1>
      <p className='mb-4'>{subTitle}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => checkKeyDown(e)}
        className="flex flex-col items-start w-full"
      >
        <div className='grid grid-cols-1 gap-4 mb-4 w-full'>
          <FormEmailInput
            name='name'
            placeholder={namePlaceholder}
            register={register}
            errors={errors}
            isRequired={true}
            requiredMessage={requiredError}
          />
          <FormEmailInput
            name='email'
            placeholder={emailPlaceholder}
            register={register}
            errors={errors}
            isRequired={true}
            requiredMessage={requiredError}
            patternData={
              {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: emailError || "Invalid email"
              }
            }
          />
          <FormEmailInput
            name='phone'
            placeholder={phonePlaceholder}
            register={register}
            errors={errors}
            isRequired={false}
            requiredMessage={requiredError}
            patternData={
              {
                value: /\d+/,
                message: phoneError || "Only digits acceptable"
              }
            }
          />
          <FormEmailInput
            name='subject'
            placeholder={subjectPlaceholder}
            register={register}
            errors={errors}
            isRequired={true}
            requiredMessage={requiredError}
          />
        </div>
        <FormEmailTextArea
          name="message"
          placeholder={messagePlaceholder}
          register={register}
          errors={errors}
          isRequired={true}
          requiredMessage={requiredError} />
        <DefaultButton tag="button" linkTitle={buttonText} type="submit" />
      </form>
    </div>
  )
}

export default FormEmail



