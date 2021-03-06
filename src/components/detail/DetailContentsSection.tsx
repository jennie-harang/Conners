import React, { memo, ReactElement } from 'react';

import styled from '@emotion/styled';
import { extensionEmojiStyledCss } from '@remirror/styles/emotion';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

import { Group } from '@/models/group';
import { groupsConditionState } from '@/recoil/group/atom';
import { body1Font, body2Font } from '@/styles/fontStyles';
import palette from '@/styles/palette';
import styledAnchor from '@/styles/styledAnchor';
import { filteredWithSanitizeHtml } from '@/utils/filter';
import rehypePrism from '@/utils/rehypePrism';

import AlertIcon from '../../assets/icons/alert.svg';
import Tag from '../common/Tag';

interface Props {
  group: Group;
  isGroupMember: boolean;
}

function DetailContentsSection({ group, isGroupMember }: Props): ReactElement {
  const { push } = useRouter();
  const setGroupsCondition = useSetRecoilState(groupsConditionState);
  const { content, tags } = group;

  const handleClickTag = (name: string) => {
    push('/');
    setGroupsCondition((prev) => ({
      ...prev,
      tag: name,
    }));
  };

  const convertedCleanHtml = filteredWithSanitizeHtml(unified()
    .use(rehypeParse)
    .use(rehypePrism)
    .use(rehypeStringify)
    .processSync(content)
    .toString());

  return (
    <DetailContentsWrapper>
      {isGroupMember && (
        <MemberMessageBlock>
          <AlertIcon />
            {group.message ? (
              <div>
                <MemberMessageTitle>
                  멤버들에게 보내는 메시지
                </MemberMessageTitle>
                <p>{group.message}</p>
              </div>
            ) : (
              <div>
                <MemberMessageTitle className="empty-message">
                  멤버들에게 보내는 메시지가 없어요.
                </MemberMessageTitle>
              </div>
            )}
        </MemberMessageBlock>
      )}
      <DetailContentWrapper dangerouslySetInnerHTML={{ __html: convertedCleanHtml }} />
      <TagsWrapper>
        {tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            onClick={() => handleClickTag(tag)}
          />
        ))}
      </TagsWrapper>
    </DetailContentsWrapper>
  );
}

export default memo(DetailContentsSection);

const TagsWrapper = styled.div`
  div {
    margin-right: 8px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const DetailContentWrapper = styled.div`
  ${extensionEmojiStyledCss}
  margin-bottom: 36px;

  p {
    ${body1Font()}
    ${styledAnchor}
    margin: 0;

    & > code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: ${palette.accent2};
      border-radius: 6px;
    }
  }

  hr {
    border: .5px solid ${palette.accent4}
  }

  blockquote {
    border-left: 4px solid ${palette.accent3};
    margin-left: 0;
    margin-right: 0;
    padding-left: 15px;

    & p {
      color: ${palette.accent5}
    }
  }
`;

const DetailContentsWrapper = styled.div`
  border-bottom: 0.5px solid ${palette.accent2};
  padding-bottom: 40px;
  margin-bottom: 24px;
`;

const MemberMessageBlock = styled.div`
  background: ${palette.accent1};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;

  & > div {
    margin-left: 12px;
  }

  & > div > p {
    ${body2Font()}
    margin: 0px;
    color: ${palette.accent6};
  }
`;

const MemberMessageTitle = styled.h6`
  ${body2Font(true)}
  color: ${palette.foreground};
  margin: 0px 0px 4px 0px;

  &.empty-message {
    color: ${palette.accent5};
    margin: 0px;
  }
`;
