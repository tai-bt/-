export default {
    methods: {
        rule(formName){
			let nextIs = false
			this.$refs[formName].validate((valid) => {
				if (valid) {
					
				} else {
					
				}
				nextIs = valid
			});
			return nextIs
		}
    },
}