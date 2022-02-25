import React, { ReactElement } from 'react';

import { useRouter } from 'next/router';

import EmptyStateArea from '@/components/common/EmptyStateArea';
import MyGroups from '@/components/myInfo/MyGroups';
import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserRecruitedGroups from '@/hooks/api/group/useFetchUserRecruitedGroups';
import { DetailLayout } from '@/styles/Layout';

function RecruitedGroupsContainer(): ReactElement {
  const router = useRouter();
  const { data: user } = useFetchUserProfile();
  const { data: groups, isLoading } = useFetchUserRecruitedGroups(user?.uid);

  const onClickGroup = (groupId: string) => router.push(`/detail/${groupId}`);

  if (isLoading) {
    return <DetailLayout>로딩중...</DetailLayout>;
  }

  return (
    <MyGroups
      onClickGroup={onClickGroup}
      groups={groups}
    >
      <EmptyStateArea
        emptyText="모집한 팀이 없어요."
        buttonText="팀 모집하기"
        href="/"
        marginTop="80px"
      />
    </MyGroups>
  );
}

export default RecruitedGroupsContainer;
