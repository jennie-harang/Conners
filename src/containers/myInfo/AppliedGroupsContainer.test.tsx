import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useFetchUserAppliedGroups from '@/hooks/api/group/useFetchUserAppliedGroups';

import FIXTURE_GROUP from '../../../fixtures/group';
import FIXTURE_PROFILE from '../../../fixtures/profile';

import AppliedGroupsContainer from './AppliedGroupsContainer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/group/useFetchUserAppliedGroups');
jest.mock('@/hooks/api/auth/useFetchUserProfile');

describe('AppliedGroupsContainer', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();

    (useFetchUserAppliedGroups as jest.Mock).mockImplementation(() => ({
      data: [FIXTURE_GROUP],
      isLoading: given.isLoading,
    }));
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: mockPush,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_PROFILE,
    }));
  });

  const renderAppliedGroupsContainer = () => render((
    <AppliedGroupsContainer />
  ));

  context('로딩중인 경우', () => {
    given('isLoading', () => true);

    it('"로딩중..." 문구가 나타나야만 한다', () => {
      const { container } = renderAppliedGroupsContainer();

      expect(container).toHaveTextContent('로딩중...');
    });
  });

  context('로딩중이 아닌 경우', () => {
    describe('group을 클릭한다', () => {
      it('router.push가 해당 글 url과 함께 호출되어야만 한다', () => {
        renderAppliedGroupsContainer();

        fireEvent.click(screen.getByText(FIXTURE_GROUP.title));

        expect(mockPush).toBeCalledWith(`/detail/${FIXTURE_GROUP.groupId}`);
      });
    });
  });
});
