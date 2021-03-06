import { ComponentProps } from 'react';

import { render, screen } from '@testing-library/react';

import palette from '@/styles/palette';

import Button from './Button';

describe('Button', () => {
  const renderButton = ({ color, size, href }: ComponentProps<typeof Button>) => render((
    <Button
      color={color}
      size={size}
      href={href}
    >
      버튼
    </Button>
  ));

  describe('버튼 사이즈에 따라서 스타일 속성이 다르다', () => {
    context('사이즈가 "large"인 경우', () => {
      it('폰트 사이즈가 "1.125rem"이어야만 한다', () => {
        renderButton({ size: 'large' });

        expect(screen.getByText('버튼')).toHaveStyle({
          'font-size': '1.125rem',
        });
      });
    });

    context('사이즈가 "medium"인 경우', () => {
      it('폰트 사이즈가 "1rem"이어야만 한다', () => {
        renderButton({ size: 'medium' });

        expect(screen.getByText('버튼')).toHaveStyle({
          'font-size': '1rem',
        });
      });
    });

    context('사이즈가 "small"인 경우', () => {
      it('폰트 사이즈가 "0.875rem"이어야만 한다', () => {
        renderButton({ size: 'small' });

        expect(screen.getByText('버튼')).toHaveStyle({
          'font-size': '0.875rem',
        });
      });
    });
  });

  describe('버튼 색상 속성에 따라서 스타일 속성이 다르다', () => {
    context('색상 속성이 "outlined"인 경우', () => {
      it(`색상이 ${palette.foreground} 이어야만 한다`, () => {
        renderButton({ color: 'outlined' });

        expect(screen.getByText('버튼')).toHaveStyle({
          color: palette.foreground,
        });
      });
    });

    context('색상 속성이 "primary"인 경우', () => {
      it(`배경 색상이 ${palette.accent7} 이어야만 한다`, () => {
        renderButton({ color: 'primary' });

        expect(screen.getByText('버튼')).toHaveStyle({
          background: palette.accent7,
        });
      });
    });

    context('색상 속성이 "success"인 경우', () => {
      it(`배경 색상이 ${palette.success} 이어야만 한다`, () => {
        renderButton({ color: 'success' });

        expect(screen.getByText('버튼')).toHaveStyle({
          background: palette.success,
        });
      });
    });

    context('색상 속성이 "warning"인 경우', () => {
      it(`배경 색상이 ${palette.warning} 이어야만 한다`, () => {
        renderButton({ color: 'warning' });

        expect(screen.getByText('버튼')).toHaveStyle({
          background: palette.warning,
        });
      });
    });

    context('색상 속성이 "ghost"인 경우', () => {
      it(`폰트 색상이 ${palette.foreground} 이어야만 한다`, () => {
        renderButton({ color: 'ghost' });

        expect(screen.getByText('버튼')).toHaveStyle({
          color: palette.accent7,
        });
      });
    });
  });

  describe('"href" 속성 유무에 따라 버튼 또는 링크가 나타난다', () => {
    context('버튼인 경우', () => {
      it('"href" 속성이 없어야만 한다', () => {
        renderButton({});

        expect(screen.getByText('버튼')).not.toHaveAttribute('href', '/test');
      });
    });

    context('링크인 경우', () => {
      it('링크 정보가 나타나야만 한다', () => {
        renderButton({ href: '/test' });

        expect(screen.getByText('버튼')).toHaveAttribute('href', '/test');
      });
    });
  });
});
