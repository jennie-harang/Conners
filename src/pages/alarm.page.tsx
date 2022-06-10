import React, { lazy, ReactElement, Suspense } from 'react';

import { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';

import AlarmsSkeletonLoader from '@/components/alarm/AlarmsSkeletonLoader';
// import AlarmListContainer from '@/containers/alarm/AlarmListContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';
import authenticatedServerSideProps from '@/services/serverSideProps/authenticatedServerSideProps';
// import HeaderContainer from '@/containers/common/HeaderContainer';
// import HeaderContainer from '@/containers/common/HeaderContainer';
// import AlarmListContainer from '@/containers/alarm/AlarmListContainer';
// import HeaderContainer from '@/containers/common/HeaderContainer';
import { DetailLayout } from '@/styles/Layout';

const AlarmListContainer = lazy(() => import('@/containers/alarm/AlarmListContainer'));

// const HeaderContainer = dynamic(() => import('@/containers/common/HeaderContainer'), {
//   suspense: true,
//   ssr: false,
// });

export const getServerSideProps: GetServerSideProps = authenticatedServerSideProps;

function AlarmPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="Conners - 알람"
      />
      {/* <Suspense fallback="loading..."> */}
      <HeaderContainer />
      {/* </Suspense> */}
      <DetailLayout>
        <Suspense fallback={<AlarmsSkeletonLoader />}>
          <AlarmListContainer />
        </Suspense>
      </DetailLayout>
    </>
  );
}

export default AlarmPage;
