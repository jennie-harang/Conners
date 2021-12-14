import { Profile } from '@/models/auth';

import { collection } from '../firebase';

export const updateUserProfile = async ({
  uid, portfolioUrl, name, image, position,
}: Profile) => {
  const user = collection('users').doc(uid);

  await user.update({
    name,
    image,
    portfolioUrl,
    position,
  });
};

export const getUserProfile = async (id:string): Promise<Profile> => {
  const user = await collection('users')
    .doc(id)
    .get();

  return user.data() as Profile;
};
