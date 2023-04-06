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
	  <b-col>
		<br>
	  <b-button @click="showDismissibleAlert=true" variant="dark" class="btn m-1 " >
      Consigli
      </b-button>
     </b-col>
      </b-form-row>
		
    </b-form>

	<b-alert show variant="info" v-model="showDismissibleAlert" dismissible >
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
    <br/>

		<div class="d-flex justify-content-center">
  <b-button v-b-toggle.collapse-1 variant="primary" class="mr-2"><i
                :class="`fa fa-car fa-1x`"
                :style="`position:relative; left: -6px `">
				</i>Machina</b-button>
  <b-button v-b-toggle.collapse-2 variant="primary" class="mr-2"><b-icon class="mr-2" icon="bicycle"></b-icon>Bicicleta</b-button>
  <b-button v-b-toggle.collapse-3 variant="primary"><b-icon class="mr-2" icon="people-fill"></b-icon>Carpool</b-button>
</div>
<div>
	<b-collapse id="collapse-1" class="mt-2">
    <b-card>
		<b-button v-b-modal.modal-1 variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Machina Parking Managment</h4>
	  <p>Liberi: 0</p>
	  <p> Prenotabili: {{ office_survey.survey.az_sosta_auto_nr }}</p>
      <b-button v-b-toggle.collapse-1-inner size="sm">Fututo</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>
			<p> Liberi: 0</p>
			<p> Prenotabili: 0</p>
		</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
 <b-collapse id="collapse-2" class="mt-2">
    <b-card>
		<b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Bicicleta Parking Managment</h4>
		<p> Liberi: 0</p>
		<p> Prenotabili: 0</p>
	  <b-button v-b-toggle.collapse-2-inner size="sm">Futuro</b-button>
      <b-collapse id="collapse-2-inner" class="mt-2">
        <b-card>
			<p> Liberi: 0</p>
			<p> Prenotabili: 0</p>
		</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
  <b-collapse id="collapse-3" class="mt-2">
    <b-card>
		<b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Carpool Parking Managment</h4>
		<p> Liberi: 0</p>
		<p> Prenotabili: 0</p>
      <b-button v-b-toggle.collapse-3-inner size="sm">Futuro</b-button>
      <b-collapse id="collapse-3-inner" class="mt-2">
        <b-card>
		<p> Liberi: 0</p>
		<p> Prenotabili: 0</p>
		</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>

</div>
<b-modal id="modal-1" title="Posti liberi">
	<b-row  >
		<b-col md="4"><b-icon class="mr-2" icon="circle-fill" variant="success"></b-icon>Posti disponibili</b-col>
    	<b-col xl="5"><b-icon class="mr-2" icon="circle-fill" variant="danger"></b-icon>Posti non-disponibili</b-col>
    	<b-col xl="3"><b-icon class="mr-2" icon="circle-fill" variant="info"></b-icon>Carpool</b-col>
 	 </b-row>
	</br>
	<table cellpadding="5" cellspacing="2" v-if="office_survey!=null">
		<tr v-for="b in office_survey.survey.az_sosta_auto_nr">
                <td v-for="a in 5"> <b-img                
                :src="icons.png"
                :alt="icons.name">
				</b-img> </td>
				
            </tr>
	
            <!-- <tr v-for="b in office_survey.survey.az_sosta_auto_nr">
                <td v-for="a in 5"> {{ a*b }}</td>
            </tr> -->
        </table>  
  </b-modal>
	
               
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
			offices_survey:null,
			office_survey:{
				survey:{
					az_sosta_auto_nr:0,
				}
			},
			showDismissibleAlert: false,
			showDismissibleCard: false,
			icons: 	
				{
					name: "Car up view",
					png: require("@/assets/img/carupview.png"),
				},

			
			
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
		//this.office_survey.survey=null;
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
  background-color: #012e45;
},
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
}
</style>
