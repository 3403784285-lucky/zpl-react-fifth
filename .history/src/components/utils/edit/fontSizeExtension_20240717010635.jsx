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
          const attrs = { ...node.attrs, fontSize };
          dispatch(state.tr.setNodeMarkup(pos, undefined, attrs));
        }
      });
      return true;
    };
  }
}
