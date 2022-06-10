import { firebaseAuth } from '@/services/firebase';

import useAuthUser from './useAuthUser';

function useGetUser(suspense?: boolean) {
  const user = useAuthUser(['user'], firebaseAuth, {
    suspense,
  });

  return {
    ...user,
    data: user.data || null,
  };
}

export default useGetUser;
