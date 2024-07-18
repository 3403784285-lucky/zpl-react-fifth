import { Extension } from '@tiptap/react';

export default class FontSizeExtension extends Extension {
  get name() {
    return 'fontSize';
  }

  commands({ type }) {
    return (size) => (state, dispatch) => {
      const { from, to } = state.selection;
      const fontSize = size || this.options.defaultSize;
      const attrs = { ...type.create({ size: fontSize }).attrs };

      dispatch(state.tr.setNodeMarkup(from, undefined, attrs));
      return true;
    };
  }

  get defaultOptions() {
    return {
      defaultSize: '16px', // Default font size
    };
  }
}
