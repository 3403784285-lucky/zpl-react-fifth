import { Extension } from '@tiptap/react';

export default class FontSizeExtension extends Extension {
  get name() {
    return 'fontSize';
  }

  commands({ type }) {
    return (fontSize) => (state, dispatch) => {
      const { from, to } = state.selection;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
          dispatch(state.tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            style: `font-size: ${fontSize};`,
          }));
        }
      });
      return true;
    };
  }
}
