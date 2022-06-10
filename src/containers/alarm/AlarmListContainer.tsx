import React, { ReactElement, useCallback } from 'react';

import Alarms from '@/components/alarm/Alarms';
// import Alarms from '@/components/alarm/Alarms';
import useFetchAlarms from '@/hooks/api/alarm/useFetchAlarms';
import useUpdateAlarmViewed from '@/hooks/api/alarm/useUpdateAlarmViewed';

// const Alarms = dynamic(() => import('@/components/alarm/Alarms'), {
//   suspense: true,
//   ssr: false,
// });

function AlarmListContainer(): ReactElement {
  const { data: alarms } = useFetchAlarms();
  const { mutate: updateAlarm } = useUpdateAlarmViewed();

  const onClickAlarm = useCallback((alarmUid: string) => updateAlarm(alarmUid), [updateAlarm]);

  // console.log(isLoading, isIdle);
  // console.log(alarms);

  return (
  // <Suspense fallback={<AlarmsSkeletonLoader />}>
    <Alarms
      alarms={alarms}
      onClickAlarm={onClickAlarm}
    />
  // </Suspense>
  );
}

export default AlarmListContainer;
