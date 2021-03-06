import { useInView } from 'react-intersection-observer';

import { renderHook } from '@testing-library/react-hooks';

import { getUserRecruitedGroups } from '@/services/api/group';
import wrapper from '@/test/ReactQueryWrapper';

import FIXTURE_GROUP from '../../../../fixtures/group';

import useInfiniteFetchUserRecruitedGroups from './useInfiniteFetchUserRecruitedGroups';

jest.mock('@/services/api/group');

describe('useInfiniteFetchUserRecruitedGroups', () => {
  const responseGroups = {
    items: [FIXTURE_GROUP],
    lastUid: '1',
  };

  const useInfiniteFetchUserRecruitedGroupsHook = () => renderHook(
    () => useInfiniteFetchUserRecruitedGroups({ perPage: 10, userUid: 'userUid' }),
    { wrapper },
  );

  beforeEach(() => {
    jest.clearAllMocks();

    (useInView as jest.Mock).mockImplementation(() => ({
      ref: jest.fn(),
      inView: given.inView,
    }));

    (getUserRecruitedGroups as jest.Mock).mockImplementation(() => (responseGroups));
  });

  context('inView가 true인 경우', () => {
    given('inView', () => true);

    it('getUserRecruitedGroups가 두 번 호출 후 반환해야만 한다', async () => {
      const { result, waitFor } = useInfiniteFetchUserRecruitedGroupsHook();

      await waitFor(() => result.current.query.isSuccess);

      expect(getUserRecruitedGroups).toBeCalledTimes(2);
      expect(result.current.query.data?.pages).toEqual([
        responseGroups, responseGroups,
      ]);
    });
  });

  context('inView가 false인 경우', () => {
    given('inView', () => false);

    it('getUserRecruitedGroups를 한 번 호출 후 반환해야만 한다', async () => {
      const { result, waitFor } = useInfiniteFetchUserRecruitedGroupsHook();

      await waitFor(() => result.current.query.isSuccess);

      expect(getUserRecruitedGroups).toBeCalledTimes(1);
      expect(result.current.query.data?.pages).toEqual([responseGroups]);
    });
  });
});
