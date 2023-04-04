<template>
    <div>
        <h2>Gestione Posteggi</h2>
        <table border="2" cellpadding="5" cellspacing="2">
            <tr v-for="b in 10">
                <td v-for="a in 10">Posto {{ a*b }}</td>
            </tr>
        </table>        
    </div>
</template>

<script>
import Util from "@/mixing/util";


export default {
	name: "Parking",
	mixins: [Util],
	data() {
		return {
			
		};
	},
	computed: {},
	methods: {
		nextTab(next) {
			this.$router.push(`/bilancio/${next}`);
		},
	},
};
</script>

<style>
</style>
