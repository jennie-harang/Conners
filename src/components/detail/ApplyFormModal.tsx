import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FormModal from '@/components/common/FormModal';
import Textarea from '@/components/common/Textarea';
import { ApplicantForm } from '@/models/group';
import { stringToExcludeNull } from '@/utils/utils';

import Input from '../common/Input';

interface Props {
  isVisible: boolean;
  initPortfolioUrl?: string | null;
  onClose: () => void;
  onSubmit: (applyFields: ApplicantForm) => void;
}

const validationSchema = yup.object({
  introduce: yup.string().trim().required('소개글을 입력해주세요.'),
  portfolioUrl: yup.string().notRequired().nullable(),
}).required();

function ApplyFormModal({
  isVisible, onClose, onSubmit, initPortfolioUrl,
}: Props): ReactElement {
  const {
    register, handleSubmit, formState: { errors }, clearErrors, reset, setValue,
  } = useForm<ApplicantForm>({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = () => {
    onClose();
    clearErrors('introduce');
    reset();
  };

  return (
    <FormModal
      isVisible={isVisible}
      title="신청"
      confirmText="신청하기"
      confirmButtonColor="success"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContentsFormWrapper>
        <Input
          labelText="포트폴리오"
          id="portfolioUrl"
          defaultValue={stringToExcludeNull(initPortfolioUrl)}
          type="text"
          placeholder="URL을 입력하세요"
          labelOptionText="선택"
          register={register('portfolioUrl')}
          onClear={() => setValue('portfolioUrl', '')}
        />

        <Textarea
          id="introduce"
          labelText="소개글"
          isError={!!errors.introduce}
          placeholder="간단한 소개글을 입력하세요"
          height="128px"
          message={errors.introduce?.message}
          {...register('introduce')}
        />
      </ContentsFormWrapper>
    </FormModal>
  );
}

export default ApplyFormModal;

const ContentsFormWrapper = styled.div`
  margin: 0 24px 32px 24px;

  & > :not(div:first-of-type) {
    margin-top: 20px;
  }
`;
