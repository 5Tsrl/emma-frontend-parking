<template>
    <div>
		<h2>Gestione Posteggi</h2>
		<b-form>
		<b-form-row>
			 <b-col md="4" v-if="isAuthorized('admin, moma')">
        <b-form-group label="Azienda, Ente, Scuola">
          <v-select
            v-model="company_id"
            :options="companies"
            label="name"
            :reduce="(x) => x.id"
            @input="updateCompany($event)"
            placeholder="Scrivi alcune lettere">
          </v-select>
        </b-form-group>
      </b-col>

      <b-col md="4">
        <b-form-group label="Sede">
          <b-form-select
            v-model="office_id"
            :options="offices"
            value-field="id"
            text-field="name"
			@input="updateParking($event)"></b-form-select>
        </b-form-group>
      </b-col>

		</b-form-row>
    </b-form>
	<!-- <b-button v-b-modal.modal-1>Consigli</b-button> -->
	<b-alert show variant="secondary">
		<h3 class="alert-heading" id="consigli"> Consigli</h3>
		<p>
	     - Dedica almeno il 5% dei posti al car pooling
		</p>
		<p>- Se il posteggio è esterno pensa ad alberare e depaving
         </p>
		 <p>
			- Quanto occupa un posto bici (un’auto → 10 bici *citare la fonte)
		 </p>
		 <p>- Pensilina solare per i posteggi in esterno
         </p>
		 <p>- Inserisci un sistema di prenotazione
         </p>
		 <p>- Wallbox per auto elettriche</p>
	</b-alert>

        <table border="2" cellpadding="5" cellspacing="2" v-if="office_survey==null">
            <tr v-for="b in office_survey.survey.az_sosta_auto_nr">
                <td v-for="a in 10">Posto {{ a*b }}</td>
            </tr>
        </table>        
    </div>
</template>

<script>
import Util from "@/mixing/util";
import UserService from "@/services/user.service";
import vSelect from "vue-select";


export default {
	name: "Parking",
	components: {
		vSelect,
	},
	mixins: [Util],
	data() {
		return {
			company_id: null,
			office_id: null,
			offices: [],
			companies: [],
			offices_survey:[],
			office_survey:[],
			
		};
	},
	computed: {},
	methods: {
		nextTab(next) {
			this.$router.push(`/bilancio/${next}`);
		},
		async updateCompany() {
			this.offices = await this.createOfficeList();
		},
		async updateParking() {
			// office_survey=offices_survey.map((x) => x.id==office_id);
			this.office_survey=this.offices_survey.find(obj => obj.id === this.office_id);
		},
		async createOfficeList(){ 
			let self = this;
			let offices = {};
			try {
				let res = await UserService.getOffices(this.company_id);
				this.offices_survey = res.data.offices;
				offices = res.data.offices;
				offices.unshift({
					id: 0,
					name: "--- Filtra per Sede  --- ",
				});
			} catch (e) {
				self.$bvToast.toast(e.message, {
					title: "Errore",
					autoHideDelay: 2000,
					appendToast: true,
				});
			}
			return offices;
		},
	},
	async created() {
		
		if (this.$route.query.company_id){
			this.company_id = parseInt(this.$route.query.company_id);
			this.updateCompany();
		}
		if (this.$route.query.office_id){
			this.office_id = parseInt(this.$route.query.office_id);
		}
		this.office_survey.survey=null;
		this.loading = true;
		
		try {
			const res = await Promise.all([
				UserService.getCompanyList(),
			]);
			this.companies = [
				{
					id: null,
					name: "Tutte",
				},
				...res[0].data.companies,
			];
			
		} catch (e) {
			this.showError(e);
		}
		
	


	},

};
</script>

<style>
.alert-secondary {
  color: #383d41;
  background-color: #012e45;
  border-color: #d6d8db;
}
</style>
