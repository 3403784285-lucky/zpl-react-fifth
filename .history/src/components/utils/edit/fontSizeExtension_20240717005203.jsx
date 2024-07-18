import { Extension } from '@tiptap/react';

export default class FontSizeExtension extends Extension {
  get name() {
    return 'fontSize';
  }

  commands({ type }) {
    return (fontSize) => (state, dispatch) => {
      const { from, to } = state.selection;
      state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.type.name === 'text') {
          dispatch(state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, fontSize }));
        }
      });
      return true;
    };
  }
}
