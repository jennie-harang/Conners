import React from 'react';

import styled from '@emotion/styled';

import { body1Font, body2Font, subtitle1Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';

import FormModal from '../common/FormModal';
import Textarea from '../common/Textarea';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  numberApplicant: number;
}

function CompleteApplyFormModal({
  numberApplicant, isVisible, onClose, onSubmit,
}: Props) {
  return (
    <FormModal
      isVisible={isVisible}
      title="모집 완료"
      confirmButtonColor="success"
      confirmText="완료하기"
      onClose={onClose}
      onSubmit={onSubmit}
      size="540px"
    >
      <FormContentsWrapper>
        <DescribeMessage>
          {`모집을 완료하고 선택한 ${numberApplicant}명과 함께 팀을 만드시겠습니까?`}
          <br />
          모집을 완료하시면 다시 되돌릴 수 없습니다.
        </DescribeMessage>
        <MessageInputWrapper>
          <label htmlFor="message">
            메시지
            <span>(선택)</span>
          </label>
          <Textarea
            id="message"
            placeholder="팀 멤버들에게 보낼 메시지를 입력하세요"
            height="100px"
          />
          <small>
            팀 멤버들과 함께 대화할 오픈 채팅방 URL을 메시지로 보내보세요.
            <br />
            메시지는 멤버들에게만 공개됩니다.
          </small>
        </MessageInputWrapper>
      </FormContentsWrapper>
    </FormModal>
  );
}

export default CompleteApplyFormModal;

const FormContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 24px;
`;

const DescribeMessage = styled.div`
  ${body1Font()}
  margin-top: 20px;
`;

const MessageInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;

  & > label {
    ${body2Font(true)}
    color: ${palette.accent6};
    margin-left: 2px;
    margin-bottom: 6px;

    & > span {
      ${body2Font()}
      color: ${palette.accent4};
    }
  }

  & > small {
    ${subtitle1Font()}
    color: ${palette.accent5};
    margin-left: 2px;
    margin-top: 6px;
  }
`;
