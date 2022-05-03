import { renderHook, waitFor } from '@testing-library/react';

import { getUserAlarm } from '@/services/api/alarm';
import wrapper from '@/test/ReactQueryWrapper';

import ALARM_FIXTURE from '../../../../fixtures/alarm';
import PROFILE_FIXTURE from '../../../../fixtures/profile';
import useFetchUserProfile from '../auth/useFetchUserProfile';

import useFetchAlarms from './useFetchAlarms';

jest.mock('@/services/api/alarm');
jest.mock('../auth/useFetchUserProfile');

describe('useFetchAlarms', () => {
  const useFetchAlarmsHook = () => renderHook(() => useFetchAlarms(), { wrapper });

  beforeEach(() => {
    jest.clearAllMocks();

    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: PROFILE_FIXTURE,
    }));
    (getUserAlarm as jest.Mock).mockImplementation(() => (given.alarms));
  });

  context('useQuery반환값이 존재하지 않는 경우', () => {
    given('alarms', () => null);

    it('빈 배열을 반환해야만 한다', async () => {
      const { result } = useFetchAlarmsHook();

      await waitFor(() => expect(result.current.data).toEqual([]));
    });
  });

  context('useQuery반환값이 존재하는 경우', () => {
    given('alarms', () => [ALARM_FIXTURE]);

    it('alarms에 대한 정보를 반환해야만 한다', async () => {
      const { result } = useFetchAlarmsHook();

      await waitFor(() => expect(result.current.data).toEqual([ALARM_FIXTURE]));
    });
  });
});
