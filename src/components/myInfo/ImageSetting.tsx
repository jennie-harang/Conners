import React, { ReactElement } from 'react';

import styled from '@emotion/styled';

import Button from '../common/Button';
import ProfileImage from '../common/ProfileImage';

interface Props {
  image?: string | null;
}

function ImageSetting({ image }: Props):ReactElement {
  return (
    <ImageSettingWrapper>
      <ProfileImage src={image} size="96px" alt="프로필 이미지" />
      <Button
        size="small"
        color="primary"
      >
        이미지 선택
      </Button>
      <Button
        size="small"
        color="ghost"
      >
        이미지 삭제
      </Button>
    </ImageSettingWrapper>
  );
}

export default ImageSetting;

const ImageSettingWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  & > img {
    margin-bottom: 16px;
  }

  & > button:first-of-type {
    margin-bottom: 4px;
  }
`;
