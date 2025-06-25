<script setup>
import { onMounted, ref } from 'vue'
import E from 'wangeditor'
const editorElem = ref(null) // 初始化为 null
const editor = ref(null)
const editorContent = ref('')
const emit = defineEmits(['contentChange'])

const contentChange = (html) => {
  editorContent.value = html
  emit('contentChange', editorContent.value)
}

onMounted(() => {
  editor.value = new E(editorElem.value)
  editor.value.config.onchange = contentChange
  editor.value.config.menus = [
    'head',
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'sforeColor',
    'backColor',
    'link',
    'list',
    'justify',
    'quote',
    'emoticon',
    'image', // 修正拼写
    'table',
    'code',
    'undo',
    'redo',
  ]
  editor.value.create()
})
</script>
<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>
