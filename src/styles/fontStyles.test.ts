import {
  body1Font, body2Font, h1Font, h2Font, h3Font, h4Font, subtitle1Font, subtitle2Font,
} from './fontStyles';

describe('h1Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 bold여야만 한다', () => {
      const result = h1Font(true);

      expect(result.styles).toContain('font-weight:bold;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h1Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('h2Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 bold여야만 한다', () => {
      const result = h2Font(true);

      expect(result.styles).toContain('font-weight:bold;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h2Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('h3Font', () => {
  context('true인 경우', () => {
    it('"font-weight" 속성은 600여야만 한다', () => {
      const result = h3Font(true);

      expect(result.styles).toContain('font-weight:600;');
    });
  });

  context('false인 경우', () => {
    it('"font-weight" 속성은 normal여야만 한다', () => {
      const result = h3Font();

      expect(result.styles).toContain('font-weight:normal;');
    });
  });
});

describe('h4Font', () => {
  it('font-size는 1.125rem이어야만 한다', () => {
    const result = h4Font();

    expect(result.styles).toContain('font-size:1.125rem;');
  });
});

describe('body1Font', () => {
  it('font-size는 1rem이어야만 한다', () => {
    const result = body1Font();

    expect(result.styles).toContain('font-size:1rem;');
  });
});

describe('body2Font', () => {
  it('font-size는 0.875rem이어야만 한다', () => {
    const result = body2Font();

    expect(result.styles).toContain('font-size:0.875rem;');
  });
});

describe('subtitle1Font', () => {
  it('font-size는 0.825rem이어야만 한다', () => {
    const result = subtitle1Font();

    expect(result.styles).toContain('font-size:0.825rem;');
  });
});

describe('subtitle2Font', () => {
  it('font-size는 0.7rem이어야만 한다', () => {
    const result = subtitle2Font();

    expect(result.styles).toContain('font-size:0.7rem;');
  });
});
