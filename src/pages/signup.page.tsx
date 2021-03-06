import { ReactElement } from 'react';

import { NextSeo } from 'next-seo';

import SignUpContainer from '@/containers/auth/SignUpContainer';
import HeaderContainer from '@/containers/common/HeaderContainer';

function SignUpPage(): ReactElement {
  return (
    <>
      <NextSeo
        title="Conners - μμνκΈ°"
      />
      <HeaderContainer />
      <SignUpContainer />
    </>
  );
}

export default SignUpPage;
