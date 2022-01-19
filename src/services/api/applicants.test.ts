import {
  addDoc, deleteDoc, getDocs, serverTimestamp, updateDoc,
} from 'firebase/firestore';

import { ApplicantFields } from '@/models/group';

import APPLICANT_FIXTURE from '../../../fixtures/applicant';
import PROFILE_FIXTURE from '../../../fixtures/profile';
import { collectionRef } from '../firebase';

import {
  deleteApplicant, getApplicants, postAddApplicant, putApplicant,
} from './applicants';

jest.mock('../firebase');

describe('applicants API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('postAddApplicant', () => {
    const collection = 'collectionRef';
    const createdAt = '2021-11-11';

    const applicant: ApplicantFields = {
      groupId: '1',
      introduce: 'introduce',
      portfolioUrl: 'https://test.test',
      applicant: PROFILE_FIXTURE,
    };

    beforeEach(() => {
      (collectionRef as jest.Mock).mockReturnValueOnce(collection);
      (addDoc as jest.Mock).mockImplementation(() => ({
        id: '1',
      }));

      (serverTimestamp as jest.Mock).mockReturnValueOnce(createdAt);
    });

    it('addDoc 함수가 호출되어야만 한다', async () => {
      const id = await postAddApplicant(applicant);

      expect(addDoc).toBeCalledWith(collection, {
        ...applicant,
        isConfirm: false,
        createdAt,
      });

      expect(id).toBe('1');
    });
  });

  describe('getApplicants', () => {
    beforeEach(() => {
      (getDocs as jest.Mock).mockImplementationOnce(() => ({
        docs: [APPLICANT_FIXTURE],
      }));
    });

    it('신청자 리스트가 반환되어야만 한다', async () => {
      const response = await getApplicants('groupId');

      expect(response).toEqual([APPLICANT_FIXTURE]);
      expect(getDocs).toBeCalledTimes(1);
    });
  });

  describe('putApplicant', () => {
    it('"updateDoc"이 호출되어야만 한다', async () => {
      await putApplicant(APPLICANT_FIXTURE);

      expect(updateDoc).toBeCalledTimes(1);
    });
  });

  describe('deleteApplicant', () => {
    it('"deleteDoc"이 호출되어야만 한다', async () => {
      await deleteApplicant('applicantId');

      expect(deleteDoc).toBeCalledTimes(1);
    });
  });
});
