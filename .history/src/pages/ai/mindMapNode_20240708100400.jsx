// MindMapNode.js
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import remark from 'remark';
import remarkMindmap from 'remark-mindmap';

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
      const ast = remark().use(remarkMindmap).processSync(content).contents;
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(ast);
    }
  }, [content]);

  return <div ref={containerRef} className="mindmap"></div>;
};

export default MindMapNode;
