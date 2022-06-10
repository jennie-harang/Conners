import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { Alarm } from '@/models/alarm';
import { getUserAlarm } from '@/services/api/alarm';
import { checkEmpty } from '@/utils/utils';

import useFetchUserProfile from '../auth/useFetchUserProfile';
import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchAlarms() {
  const { data: user } = useFetchUserProfile(true);

  const query = useQuery<Alarm[], FirestoreError>(['alarms'], () => getUserAlarm(user?.uid as string), {
    enabled: !!user,
    suspense: true,
  });

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '알람을 불러오는데 실패했어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchAlarms;
