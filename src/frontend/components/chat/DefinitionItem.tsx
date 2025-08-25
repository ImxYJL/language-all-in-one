'use client';

import { sanitizeDefinitionHtml } from '@/libs/htmlParse/sanitize';
import parse, { Element, Text } from 'html-react-parser';

type Def = { text: string; partOfSpeech?: string };

const DefinitionItem = ({ def }: { def: Def }) => {
  const clean = sanitizeDefinitionHtml(def.text);

  const node = parse(clean, {
    replace: (domNode) => {
      // html-react-parser v5 기준: tag 노드는 Element 타입이고 name으로 태그명 접근
      if (domNode.type === 'tag') {
        const el = domNode as Element;

        if (el.name === 'xref') {
          // xref 내부 텍스트만 링크로 교체 (필요하면 자식 전체를 domToReact로 변환)
          const term = ((el.children?.[0] as Text)?.data ?? '').trim();

          return (
            <a
              href={`https://wordnik.com/words/${encodeURIComponent(term)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              {term}
            </a>
          );
        }
      }
      return undefined; // 교체하지 않음
    },
  });

  return (
    <li className="leading-relaxed">
      {def.partOfSpeech && <span className="mr-2 text-gray-500">[{def.partOfSpeech}]</span>}
      {node}
    </li>
  );
};

export default DefinitionItem;
