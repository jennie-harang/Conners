import { useHelpers, useRemirrorContext } from '@remirror/react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

import useFetchUserProfile from '@/hooks/api/auth/useFetchUserProfile';
import useEditGroup from '@/hooks/api/group/useEditGroup';
import useFetchGroup from '@/hooks/api/group/useFetchGroup';
import usePublishNewGroup from '@/hooks/api/group/usePublishNewGroup';
import useUploadGroupThumbnail from '@/hooks/api/storage/useUploadGroupThumbnail';
import useGroupRecruitmentStatus from '@/hooks/useGroupRecruitmentStatus';
import { writeFieldsState } from '@/recoil/group/atom';
import InjectTestingRecoilState from '@/test/InjectTestingRecoilState';
import ReactQueryWrapper from '@/test/ReactQueryWrapper';
import RecoilObserver from '@/test/RecoilObserver';

import FIXTURE_GROUP from '../../../fixtures/group';
import WRITE_FIELDS_FIXTURE from '../../../fixtures/writeFields';

import PublishModalContainer from './PublishModalContainer';

jest.mock('@/hooks/api/group/usePublishNewGroup');
jest.mock('@/hooks/api/group/useFetchGroup');
jest.mock('@/hooks/api/group/useEditGroup');
jest.mock('@/hooks/useGroupRecruitmentStatus');
jest.mock('@/hooks/api/auth/useFetchUserProfile');
jest.mock('@/hooks/api/storage/useUploadGroupThumbnail');
jest.mock('@remirror/react', () => ({
  useRemirrorContext: jest.fn(),
  useHelpers: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('PublishModalContainer', () => {
  const mutate = jest.fn();
  const handleChangeWriteFields = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockImplementation(() => ({
      query: given.query,
    }));
    (useGroupRecruitmentStatus as jest.Mock).mockImplementation(() => given.recruitmentStatus);
    (useFetchGroup as jest.Mock).mockImplementation(() => ({
      data: FIXTURE_GROUP,
    }));
    (useEditGroup as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useFetchUserProfile as jest.Mock).mockImplementation(() => ({
      data: 'user',
    }));
    (usePublishNewGroup as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
    (useRemirrorContext as jest.Mock).mockImplementation(() => ({
      getState: jest.fn(),
    }));
    (useHelpers as jest.Mock).mockImplementation(() => ({
      getHTML: jest.fn().mockReturnValue(WRITE_FIELDS_FIXTURE.content),
    }));
    (useUploadGroupThumbnail as jest.Mock).mockImplementation(() => ({
      mutate,
    }));
  });

  const renderPublishModalContainer = () => render((
    <ReactQueryWrapper>
      <InjectTestingRecoilState
        publishModalVisible={given.isVisible}
        writeFields={given.writeFields}
      >
        <>
          <RecoilObserver node={writeFieldsState} onChange={handleChangeWriteFields} />
          <PublishModalContainer />
        </>
      </InjectTestingRecoilState>
    </ReactQueryWrapper>
  ));

  context('모달창이 보이는 경우', () => {
    const title = '제목입니다.';

    given('writeFields', () => ({
      ...WRITE_FIELDS_FIXTURE,
      title,
    }));
    given('isVisible', () => true);

    it('등록 모달에 대한 내용이 나타나야만 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toHaveTextContent(`${title} 등록`);
    });

    describe('닫기 버튼을 클릭한다', () => {
      it('아무것도 보이지 않아야만 한다', () => {
        const { container } = renderPublishModalContainer();

        fireEvent.click(screen.getByText('닫기'));

        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('submit 버튼을 클릭한다', () => {
      context('router.query가 존재하지 않는 경우', () => {
        given('query', () => ({
          id: null,
        }));

        it('등록 mutate 액션이 호출되어야만 한다', () => {
          renderPublishModalContainer();

          fireEvent.click(screen.getByText('등록하기'));

          expect(mutate).toBeCalledWith({
            writeFields: {
              ...WRITE_FIELDS_FIXTURE,
              title,
            },
            profile: 'user',
          });
        });
      });

      context('router.query가 존재하는 경우', () => {
        given('query', () => ({
          id: 'id',
        }));
        given('writeFields', () => ({
          ...WRITE_FIELDS_FIXTURE,
          title,
          tags: ['test'],
        }));
        given('recruitmentStatus', () => ('automaticBeforeCompletedRecruitment'));

        it('수정 mutate 액션이 호출되어야만 한다', () => {
          renderPublishModalContainer();

          fireEvent.click(screen.getByText('저장하기'));

          expect(mutate).toBeCalledWith({
            writeFields: {
              ...WRITE_FIELDS_FIXTURE,
              title,
              tags: ['test'],
            },
            deleteTags: ['test'],
            groupId: FIXTURE_GROUP.groupId,
          });
        });
      });
    });

    describe('소개글을 입력한다', () => {
      const shortDescription = '소개합니다.';

      it('change 이벤트가 호출되어야만 한다', () => {
        renderPublishModalContainer();

        fireEvent.change(screen.getByLabelText('소개글'), { target: { value: shortDescription } });

        expect(handleChangeWriteFields).toBeCalledWith({
          ...WRITE_FIELDS_FIXTURE,
          title,
          shortDescription,
        });
      });
    });
  });

  context('모달창이 보이지 않는 경우', () => {
    given('writeFields', () => WRITE_FIELDS_FIXTURE);
    given('isVisible', () => false);

    it('아무것도 렌더링 되지 말아야 한다', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
