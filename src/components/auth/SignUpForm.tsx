import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffectOnce, useLocalStorage } from 'react-use';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from 'firebase/auth';
import * as yup from 'yup';

import type { SignUpAdditionalForm } from '@/models/auth';
import { Position, positionOption } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';
import CreatableSelectBox from '../common/CreatableSelectBox';
import Input from '../common/Input';

interface Props {
  onSubmit: (formData: SignUpAdditionalForm) => void;
  fields: User;
}

const validationSchema = yup.object({
  name: yup.string().trim().required('닉네임을 입력해주세요.'),
  portfolioUrl: yup.string().trim().notRequired().nullable(),
}).required();

function SignUpForm({ onSubmit, fields }: Props): ReactElement {
  const { displayName, email } = fields;
  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm<SignUpAdditionalForm>({ resolver: yupResolver(validationSchema) });
  const [, setIsSignUp] = useLocalStorage('isSignUp', false, {
    raw: true,
  });
  const [position, setPosition] = useState<Position>();

  useEffectOnce(() => setIsSignUp(false));

  const handleSubmitAction = (formData: SignUpAdditionalForm) => {
    if (!position) {
      return;
    }

    onSubmit({ ...formData, position });
  };

  return (
    <SignUpFormWrapper onSubmit={handleSubmit(handleSubmitAction)}>
      <Input
        id="name"
        labelText="닉네임"
        placeholder="닉네임을 입력해주세요"
        register={register('name')}
        onClear={() => setValue('name', '')}
        defaultValue={stringToExcludeNull(displayName)}
        isError={!!errors.name}
        message={errors.name?.message}
        type="text"
      />
      <Input
        id="email"
        labelText="이메일"
        placeholder="이메일을 입력해주세요"
        defaultValue={stringToExcludeNull(email)}
        type="email"
        disabled
      />
      <CreatableSelectBox
        id="position"
        options={positionOption}
        labelText="포지션"
        onChange={setPosition}
        placeholder="포지션을 입력 또는 선택해주세요."
        errorMessage="포지션을 입력 또는 선택해주세요."
      />
      <Input
        id="portfolioUrl"
        labelText="포트폴리오 URL"
        labelOptionText="선택"
        placeholder="URL을 입력하세요"
        register={register('portfolioUrl')}
        onClear={() => setValue('portfolioUrl', '')}
        type="url"
      />
      <Button type="submit" color="success" size="large">확인</Button>
    </SignUpFormWrapper>
  );
}

export default SignUpForm;

const SignUpFormWrapper = styled.form`
  width: 100%;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;
