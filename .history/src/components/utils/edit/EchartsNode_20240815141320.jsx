import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer, mergeAttributes } from '@tiptap/react';
import EChartsNodeView from './EchartsNodeView'; // 替换为你的 EChartsNodeView 文件路径

export default Node.create({
  name: 'echartsNode',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      data: {
        default: {},
        parseHTML: (element) => {
          const dataAttribute = element.getAttribute('data');
          if (!dataAttribute) return {};

          try {
            // 将 HTML 实体解码为 JSON 字符串
            const decodedData = decodeURIComponent(dataAttribute);
            return JSON.parse(decodedData);
          } catch (error) {
            console.error('Error parsing JSON from HTML attribute:', error);
            return {};
          }
        },
        renderHTML: (attributes) => {
          return { 'data': JSON.stringify(attributes.data) };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.chart-container',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'chart-container' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EChartsNodeView);
  },
});
  