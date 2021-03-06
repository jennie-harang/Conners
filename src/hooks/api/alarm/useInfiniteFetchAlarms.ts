import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { InfiniteResponse } from '@/models';
import { Alarm } from '@/models/alarm';
import { getUserAlarms } from '@/services/api/alarm';
import { checkEmpty } from '@/utils/utils';

import useFetchUserProfile from '../auth/useFetchUserProfile';
import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useInfiniteFetchAlarms() {
  const { data: user } = useFetchUserProfile();

  const query = useInfiniteQuery<InfiniteResponse<Alarm>, FirestoreError>(['alarms'], ({
    pageParam,
  }) => getUserAlarms(user?.uid as string, {
    perPage: 15,
    lastUid: pageParam,
  }), {
    getNextPageParam: ({ lastUid }) => lastUid,
    enabled: !!user,
  });

  const {
    isError, error, hasNextPage, fetchNextPage,
  } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '알람을 불러오는데 실패했어요!',
  });

  const refState = useIntersectionObserver<HTMLAnchorElement>({
    intersectionOptions: {
      rootMargin: '20px',
    },
    isRoot: true,
    fetchNextPage,
    hasNextPage,
  });

  return useMemo(() => ({
    query: {
      ...query,
      data: {
        ...query.data,
        pages: checkEmpty(query.data?.pages),
      },
    },
    refState,
  }), [query, refState]);
}

export default useInfiniteFetchAlarms;
