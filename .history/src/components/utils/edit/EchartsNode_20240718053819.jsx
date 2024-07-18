 
// import EchartsExtension from "./echartsExtension"
// import { mergeAttributes, Node } from '@tiptap/core'
// import { ReactNodeViewRenderer } from '@tiptap/react'
// export default Node.create({
//   name: 'reactComponent',
//   group: 'block',
//   atom: true,
//   parseHTML() {
//     return [
//       {
//         tag: 'react-component',
//       },
//     ]
//   },
//   renderHTML({ HTMLAttributes }) {
//     return ['react-component', mergeAttributes(HTMLAttributes)]
//   },
//   addNodeView() {
//     return ReactNodeViewRenderer(EchartsExtension)
//   },
// })