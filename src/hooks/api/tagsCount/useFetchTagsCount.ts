import { useQuery } from 'react-query';

import { FirestoreError } from 'firebase/firestore';

import { TagCount } from '@/models/group';
import { getTagsCount } from '@/services/api/tagsCount';

import useCatchErrorWithToast from '../useCatchErrorWithToast';

function useFetchTagsCount() {
  const query = useQuery<TagCount[], FirestoreError>('tagsCount', () => getTagsCount());

  const { isError, error, data } = query;

  useCatchErrorWithToast({
    isError,
    error,
    defaultErrorMessage: '태그를 불러올 수 없어요!',
  });

  return {
    ...query,
    data: data ?? [],
  };
}

export default useFetchTagsCount;