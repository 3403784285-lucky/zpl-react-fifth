import { Extension } from '@tiptap/react';
import { setBlockType } from '@tiptap/core';

export default class FontSizeExtension extends Extension {
  get name() {
    return 'fontSize';
  }

  commands({ type }) {
    return {
      setFontSize: (size) => setBlockType(type, { size }),
    };
  }

  get defaultOptions() {
    return {
      defaultSize: '16px', // Default font size
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          attributes: (state) => {
            const { size } = state.schema.nodes;
            const node = findSelectedNodeOfType(size)(state.selection);

            if (node) {
              return { style: `font-size: ${node.attrs.size}` };
            }

            return {};
          },
        },
      }),
    ];
  }
}
