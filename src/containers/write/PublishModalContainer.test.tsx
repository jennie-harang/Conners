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

  context('???????????? ????????? ??????', () => {
    const title = '???????????????.';

    given('writeFields', () => ({
      ...WRITE_FIELDS_FIXTURE,
      title,
    }));
    given('isVisible', () => true);

    it('?????? ????????? ?????? ????????? ??????????????? ??????', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toHaveTextContent(`${title} ??????`);
    });

    describe('?????? ????????? ????????????', () => {
      it('???????????? ????????? ???????????? ??????', () => {
        const { container } = renderPublishModalContainer();

        fireEvent.click(screen.getByText('??????'));

        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('submit ????????? ????????????', () => {
      context('router.query??? ???????????? ?????? ??????', () => {
        given('query', () => ({
          id: null,
        }));

        it('?????? mutate ????????? ?????????????????? ??????', () => {
          renderPublishModalContainer();

          fireEvent.click(screen.getByText('????????????'));

          expect(mutate).toBeCalledWith({
            writeFields: {
              ...WRITE_FIELDS_FIXTURE,
              title,
            },
            profile: 'user',
          });
        });
      });

      context('router.query??? ???????????? ??????', () => {
        given('query', () => ({
          id: 'id',
        }));
        given('writeFields', () => ({
          ...WRITE_FIELDS_FIXTURE,
          title,
          tags: ['test'],
        }));
        given('recruitmentStatus', () => ('automaticBeforeCompletedRecruitment'));

        it('?????? mutate ????????? ?????????????????? ??????', () => {
          renderPublishModalContainer();

          fireEvent.click(screen.getByText('????????????'));

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

    describe('???????????? ????????????', () => {
      const shortDescription = '???????????????.';

      it('change ???????????? ?????????????????? ??????', () => {
        renderPublishModalContainer();

        fireEvent.change(screen.getByLabelText('?????????'), { target: { value: shortDescription } });

        expect(handleChangeWriteFields).toBeCalledWith({
          ...WRITE_FIELDS_FIXTURE,
          title,
          shortDescription,
        });
      });
    });
  });

  context('???????????? ????????? ?????? ??????', () => {
    given('writeFields', () => WRITE_FIELDS_FIXTURE);
    given('isVisible', () => false);

    it('???????????? ????????? ?????? ????????? ??????', () => {
      const { container } = renderPublishModalContainer();

      expect(container).toBeEmptyDOMElement();
    });
  });
});
