import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import remarkMindmap from './remarkMindmap'; // Assuming this is a custom remark plugin for mind maps

const MindMapNode = Node.create({
  name: 'mindMap',
  group: 'block',
  content: 'text*',

  parseHTML() {
    return [{ tag: 'mind-map' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mind-map', mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      content: {
        default: '',
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(MindMapComponent);
  },
});

const MindMapComponent = ({ node }) => {
  const { content } = node.attrs;
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      unified()
        .use(remarkParse)
        .use(remarkMindmap) // Assuming this is correctly set up to handle mind map parsing
        .use(remarkHtml)
        .process(content)
        .then((file) => {
          containerRef.current.innerHTML = String(file);
        });
    }
  }, [content]);

  return <div ref={containerRef} className="mindmap"></div>;
};

export default MindMapNode;
