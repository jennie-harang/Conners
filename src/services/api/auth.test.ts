import PROFILE_FIXTURE from '../../../fixtures/profile';
import db from '../firebase';

import { updateUserProfile } from './auth';

describe('auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserProfile', () => {
    const mockUpdate = jest.fn();

    (jest.spyOn(db, 'collection') as jest.Mock).mockImplementationOnce(() => ({
      doc: jest.fn().mockImplementationOnce(() => ({
        update: mockUpdate,
      })),
    }));

    it('update 함수가 호출되어야만 한다', async () => {
      await updateUserProfile(PROFILE_FIXTURE);

      const {
        name, image, portfolioUrl, position,
      } = PROFILE_FIXTURE;

      expect(mockUpdate).toBeCalledWith({
        name,
        image,
        portfolioUrl,
        position,
      });
    });
  });
});
