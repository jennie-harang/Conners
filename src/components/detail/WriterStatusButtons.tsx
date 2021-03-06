import React, { ReactElement, useCallback, useState } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import useRemoveGroup from '@/hooks/api/group/useRemoveGroup';
import useRemoveGroupThumbnail from '@/hooks/api/storage/useRemoveGroupThumbnail';
import { Group } from '@/models/group';
import { writeFieldsState } from '@/recoil/group/atom';
import { stringToExcludeNull } from '@/utils/utils';

import Button from '../common/Button';

import AskRemoveGroupModal from './modal/AskRemoveGroupModal';
import MembersViewModal from './modal/MembersViewModal';

interface Props {
  isCompleted: boolean;
  group: Group;
}

function WriterStatusButtons({ group, isCompleted }: Props): ReactElement {
  const router = useRouter();
  const { mutate: removeGroupMutate } = useRemoveGroup();
  const { mutate: removeGroupThumbnailMutate } = useRemoveGroupThumbnail();

  const setWriteFields = useSetRecoilState(writeFieldsState);

  const [isVisibleApplicantsModal, setIsVisibleApplicantsModal] = useState<boolean>(false);
  const [isVisibleAskRemoveGroupModal, setIsVisibleAskRemoveGroupModal] = useState<boolean>(false);

  const handleRemove = useCallback(() => {
    removeGroupMutate(group);

    if (group.thumbnail) {
      removeGroupThumbnailMutate(group.thumbnail);
    }
  }, [group, removeGroupMutate, removeGroupThumbnailMutate]);

  const onClickEdit = (initialWriteFields: Group) => {
    const {
      category, content, tags, title, recruitmentEndDate, recruitmentEndSetting, groupId,
    } = initialWriteFields;

    setWriteFields({
      category,
      content,
      tags,
      title,
      recruitmentEndDate,
      recruitmentEndSetting,
      thumbnail: stringToExcludeNull(initialWriteFields.thumbnail),
      shortDescription: stringToExcludeNull(initialWriteFields.shortDescription),
    });
    router.push(`/write?id=${groupId}`);
  };

  return (
    <WriterButtonWrapper>
      <Button
        type="button"
        onClick={() => onClickEdit(group)}
      >
        ??????
      </Button>
      <Button
        type="button"
        onClick={() => setIsVisibleAskRemoveGroupModal(true)}
      >
        ??????
      </Button>
      <AskRemoveGroupModal
        isVisible={isVisibleAskRemoveGroupModal}
        onClose={() => setIsVisibleAskRemoveGroupModal(false)}
        onConfirm={handleRemove}
      />
      {isCompleted ? (
        <>
          <Button
            color="primary"
            onClick={() => setIsVisibleApplicantsModal(true)}
          >
            ?????? ??????
          </Button>
          <MembersViewModal
            isVisible={isVisibleApplicantsModal}
            onClose={() => setIsVisibleApplicantsModal(false)}
          />
        </>
      ) : (
        <Button href={`/detail/${group.groupId}/applicants`} color="primary">???????????? ??????</Button>
      )}
    </WriterButtonWrapper>
  );
}

export default WriterStatusButtons;

const WriterButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  & button {
    margin-right: 8px;
  }

  &:last-of-type {
    margin-right: 0px;
  }
`;
