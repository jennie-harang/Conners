import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { TagCount } from '@/models/group';
import { getTagsCount } from '@/services/api/tagsCount';
import { checkEmpty } from '@/utils/utils';

import useCatchFirestoreErrorWithToast from '../useCatchFirestoreErrorWithToast';

function useFetchTagsCount() {
  const query = useQuery<TagCount[], FirestoreError>('tagsCount', getTagsCount);

  const { isError, error, data } = query;

  useCatchFirestoreErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '태그를 불러올 수 없어요!',
  });

  return {
    ...query,
    data: checkEmpty(data),
  };
}

export default useFetchTagsCount;
