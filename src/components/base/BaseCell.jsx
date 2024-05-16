function BaseCell() {
  return <>
    <div>
    <slot />
  </div>
  </>;
}

export default BaseCell;
  

{/* <script setup>
const props = defineProps({
  labelWidth: {
    type: String,
    default: '200px'
  }
})
provide('baseCellLabelWidth', props.labelWidth)
</script>
<style lang="scss" scoped></style> */}
