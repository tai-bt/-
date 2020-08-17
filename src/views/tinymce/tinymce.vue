<template>
	<div>
		<editor v-model='value' :init="init"></editor>
	</div>
</template>

<script>
// 引入tinymce-vue组件
import Editor from '@tinymce/tinymce-vue'
export default {
	components: {
		'editor': Editor
	},
	data(){
		return{
			init: {
				// 引入汉化组件
				language_url: '../../../static/tinymce/langs/zh_CN.js',
				// 设定语言为中文
				language: 'zh_CN',
				// 组件
				plugins:
				'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount',
				// 工具栏
				toolbar:
				'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen',
				branding: false,
				min_height: 300
			},
			value:''
		}
	},
	mounted(){
	}
}
</script>

<style>

</style>