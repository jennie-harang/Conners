import { fireEvent, render, screen } from '@testing-library/react';
import { signOut } from 'next-auth/client';

import palette from '@/styles/palette';

import Header from './Header';

describe('Header', () => {
  const handleClick = jest.fn();

  const renderHeader = () => render((
    <Header
      isScrollTop={given.isScrollTop}
      session={given.session}
      onClick={handleClick}
    />
  ));

  describe('스크롤 위치에 따라서 스타일이 변경된다', () => {
    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => true);

      it('box-shadow 속성이 "transparent"이어야 한다', () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': 'inset 0 -1px 0 0 transparent',
        });
      });
    });

    context('scroll 위치가 최상단일 때', () => {
      given('isScrollTop', () => false);

      it(`box-shadow 속성이 ${palette.accent4} 이어야 한다`, () => {
        renderHeader();

        expect(screen.getByTestId('header-block')).toHaveStyle({
          'box-shadow': `inset 0 -1px 0 0 ${palette.accent4}`,
        });
      });
    });
  });

  context('세션이 존재한 경우', () => {
    given('session', () => ({
      user: {
        uid: '1',
        name: 'test',
        email: 'test@test.com',
        image: 'http://image.com',
      },
    }));

    it('"로그아웃" 버튼과 "팀 모집하기" 링크가 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('로그아웃');
      expect(screen.getByText('팀 모집하기')).toHaveAttribute('href', '/write');
    });

    describe('"로그아웃" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('로그아웃'));

        expect(signOut).toBeCalledTimes(1);
      });
    });
  });

  context('세션 정보가 존재하지 않는 경우', () => {
    given('session', () => (null));

    it('"시작하기" 버튼이 나타나야만 한다', () => {
      const { container } = renderHeader();

      expect(container).toHaveTextContent('시작하기');
    });

    describe('"시작하기" 버튼을 클릭한다', () => {
      it('클릭 이벤트가 호출되어야만 한다', () => {
        renderHeader();

        fireEvent.click(screen.getByText('시작하기'));

        expect(handleClick).toBeCalledTimes(1);
      });
    });
  });
});
