import React, {
  ReactElement, useCallback, useMemo,
} from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';

import ApplicationStatusHeader from '@/components/applicants/ApplicationStatusHeader';
import useFetchApplicants from '@/hooks/api/applicant/useFetchApplicants';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import useUpdateCompletedApply from '@/hooks/api/group/useUpdateCompletedApply';
import useCurrentTime from '@/hooks/useCurrentTime';
import { AlarmType } from '@/models/alarm';
import { CompletedGroupForm } from '@/models/group';
import { isCurrentTimeBeforeEndDate } from '@/utils/utils';

import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

function ApplicationStatusHeaderContainer(): ReactElement {
  const { back } = useRouter();
  const { data: applicants } = useFetchApplicants();
  const { data: group } = useFetchGroup();
  const { mutate } = useUpdateCompletedApply();
  const currentTime = useCurrentTime(group);

  const onSubmit = useCallback((completedGroupForm: CompletedGroupForm) => {
    const alarmForms = applicants.map(({ applicant, isConfirm }) => ({
      applicantUid: null,
      userUid: applicant.uid,
      type: isConfirm ? 'confirmed' : 'rejected' as AlarmType,
      group,
    }));

    mutate({
      groupId: group.groupId,
      completedGroupForm,
      alarmForms,
    });
  }, [mutate, group, applicants]);

  const timeRemaining = useMemo(() => {
    if (!isCurrentTimeBeforeEndDate(group.recruitmentEndDate, currentTime)) {
      return null;
    }

    return dayjs(currentTime).to(dayjs(group.recruitmentEndDate), true);
  }, [currentTime, group.recruitmentEndDate]);

  return (
    <ApplicationStatusHeader
      goBack={back}
      onSubmit={onSubmit}
      applicants={applicants}
      timeRemaining={timeRemaining}
    />
  );
}

export default ApplicationStatusHeaderContainer;
