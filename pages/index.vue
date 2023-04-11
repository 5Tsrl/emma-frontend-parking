<template>
    <div>
		<!-- <b-button @click="showDismissibleAlert=true" variant="dark" class="btn m-1 btn btn-primary float-right" >
      Consigli
      </b-button> -->
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
	<div class="accordion" role="tablist">
        <b-button block  v-b-modal.modal-2 variant="light" :disabled="selected_office" >Aggiunge dati futuri</b-button>
		<b-modal id="modal-2" title="Dati futuri" hide-footer v-if="office_survey.survey!=null">
			
				<b-card bg-variant="secondary" text-variant="white">	
					<h5 class="mb-2">Consigli: </h5>
					<p class="my-1"> - Dedica almeno il 5% dei posti al car pooling</p>
					<p class="my-1">- Se il posteggio è esterno pensa ad alberare e depaving</p>
					<p class="my-1">- Quanto occupa un posto bici (un’auto → 10 bici *citare la fonte) </p>
					<p class="my-1">- Pensilina solare per i posteggi in esterno</p>
					<p class="my-1">- Inserisci un sistema di prenotazione</p>
					<p class="my-1">- Wallbox per auto elettriche</p>
				</b-card>	
				<b-tabs content-class="mt-3" align="center">
					<b-tab title="Machina" active>
						<b-form
						label="Posti Liberi"
						description="Inserti il numero di parcheggi liberi per auto tradizional">
						<b-label for="input-form-auto-liberi">Posti Liberi:</b-label>
							<b-form-input id="input-form-auto-liberi" type="number" v-model="office_survey.info_parking.az_sosta_auto_nr_liberi" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>
							<b-description class="font-weight-light"> Inserti il numero di parcheggi liberi per auto tradizional</b-description>
						</b-form>
							<br>
						<b-form
							label="Posti Prenotabili"
							description="Inserti il numero di parcheggi prenotabili per auto tradizional">
							<b-lable for="input-form-auto-prenotabili" class="mt-3">Posti Prenotabili:</b-lable>
							<b-form-input id="input-form-auto-prenotabili" type="number" v-model="office_survey.info_parking.az_sosta_auto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>
							<b-description class="font-weight-light"> Inserti il numero di parcheggi prenotabili per auto tradizional</b-description>
						</b-form>
							<br>
						<b-form
							label="Posti per Carpooling"
							description="Inserti il numero di parcheggi riservati al carpooling"></b-form>
							<b-label for="input-form-auto-carpooling" class="mt-3">Posti per Carpooling:</b-label>
							<b-form-input id="input-form-auto-carpooling" type="number" v-model="office_survey.info_parking.az_sosta_carpooling_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>	
							<b-description class="font-weight-light"> Inserti il numero di parcheggi riservati al carpooling</b-description>
							<br>
						</b-form>
							<br>
						<b-form
							label="Posti per Auto Elettriche"
							description="Inserti il numero di parcheggi riservati per auto elettriche (Wallbox)">
							<b-label for="input-form-auto-elettriche" class="mt-3">Posti per Auto Elettriche:</b-label>
							<b-form-input id="input-form-auto-elettriche" type="number" v-model="office_survey.info_parking.az_sosta_auto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>	
							<b-description class="font-weight-light"> Inserti il numero di parcheggi riservati per auto elettriche (Wallbox)</b-description>
						</b-form>
							<br>
						<b-form
							label="Posti per Visitatori/Fornitori"
							description="Inserti il numero di parcheggi per visitatori/fornitori">
							<b-label for="input-form-auto-visitatori" class="mt-3">Posti per Visitatori/Fornitori:</b-label>
							<b-form-input id="input-form-auto-visitatori" type="number" v-model="office_survey.info_parking.az_sosta_visitatori_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>
							<b-description class="font-weight-light"> Inserti il numero di parcheggi per visitatori/fornitori</b-description>
						</b-form>
					</b-tab>

					<b-tab title="Bicicleta">
					<b-form
						label="Posti Liberi"
						description="Inserti il numero di parcheggi per visitatori/fornitori">
						<b-label for="input-form-bici-liberi" class="mt-3">Posti Liberi:</b-label>
						<b-form-input id="input-form-bici-liberi" type="number" v-model="office_survey.info_parking.az_sosta_bici_nr_liberi" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<b-description class="font-weight-light"> Inserti il numero di parcheggi liberi per bici tradizional</b-description>
					</b-form>
					<br>
					<b-form
						label="Posti Prenotabili"
						description="Inserti il numero di parcheggi prenotabili per bici tradizional">
						<b-label for="input-form-bici-prenotabili" class="mt-3">Posti Prenotabili:</b-label>
						<b-form-input id="input-form-bici-prenotabili" type="number" v-model="office_survey.info_parking.az_sosta_bici_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>  
						<b-description class="font-weight-light"> Inserti il numero di parcheggi prenotabili per bici tradizional</b-description>
					</b-form>
					<br>
					<b-form
						label="Posti per Bici Elettriche"
						description="Inserti il numero di parcheggi prenotabili per bici elettriche">
						<b-label for="input-form-bici-elettriche" class="mt-3">Posti per Bici Elettriche:</b-label>
						<b-form-input id="input-form-bici-elettriche" type="number" v-model="office_survey.info_parking.az_sosta_bici_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<b-description class="font-weight-light"> Inserti il numero di parcheggi prenotabili per bici elettriche</b-description>
					</b-form>
					</b-tab>
					<b-tab title="Motocicli" >
					<b-form
						label="Posti per Motocicli liberi"
						description="Inserti il numero di parcheggi prenotabili per moto elettriche"></b-form>
						<b-label for="input-form-moto-liberi" class="mt-3">Posti Liberi:</b-label>
						<b-form-input id="input-form-moto-liberi" type="number" v-model="office_survey.info_parking.az_sosta_moto_nr_liberi" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<b-description class="font-weight-light"> Inserti il numero di parcheggi liberi per motocicli tradizional</b-description>
					<br>
					</b-form>
					<br>
					<b-form>
						<b-label for="input-form-moto-prenotabili" class="mt-3">Posti Prenotabili:</b-label>
						<b-form-input id="input-form-moto-prenotabili" type="number" v-model="office_survey.info_parking.az_sosta_moto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<b-description class="font-weight-light"> Inserti il numero di parcheggi prenotabili per motocicli tradizional</b-description>
					</b-form>
					<br>
					<b-form>
						<b-label for="input-form-moto-elettriche" class="mt-3">Posti per Motocili Elettriche:</b-label>
						<b-form-input id="input-form-moto-elettriche" type="number" v-model="office_survey.info_parking.az_sosta_moto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<b-description class="font-weight-light"> Inserti il numero di parcheggi prenotabili per motocicli elettriche</b-description>
					</b-form>
					</b-tab>
				</b-tabs>
				<b-button
				@click="submit"
				role="button" 
				variant="primary"
				class="mt-2">Salva</b-button>
			
		</b-modal>
	</div>
    <br>

	<div class="d-flex justify-content-center" v-if="office_survey.survey!=null">
		<b-button v-b-toggle.collapse-1 variant="primary" 
		class="mr-2"
		:disabled="selected_office"><i :class="`fa fa-car fa-1x`" :style="`position:relative; left: -6px `"></i>Machina</b-button>
		<b-button v-b-toggle.collapse-2 
		variant="primary" 
		class="mr-2"
		:disabled="selected_office"><b-icon class="mr-2" icon="bicycle"></b-icon>Bicicleta</b-button>
		<b-button v-b-toggle.collapse-3 
		variant="primary"
		:disabled="selected_office"><b-img                
						:src="icons.moto.png"
						:alt="icons.moto.name"
						class="mr-1">
						</b-img> Motocicli</b-button>
	</div>
	<div class="d-flex justify-content-center" v-if="office_survey.survey==null">
		<h4 class="card-text">Il questionario sede è vuoto</h4>
	</div>
<div v-if="office_survey.survey!=null">
	<b-collapse id="collapse-1" class="mt-2">
    <b-card v-if="office_survey.survey.az_sosta=='sì'">
		<b-button v-b-modal.modal-1 variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Machina Parking Managment</h4>
	  <p> Prenotabili: {{ office_survey.survey.az_sosta_auto_nr }}</p>
	  <p>Liberi: 0</p>
	  <p v-if="office_survey.survey.az_sosta_visitatori=='sì'"> Prenotabili (visitatori/fornitori): {{ office_survey.survey.az_sosta_visitatori_nr }}</p>
	  <p v-if="office_survey.survey.az_sosta_visitatori=='sì'">Liberi (visitatori/fornitori): 0</p>
	  <h4>Carpool Parking Managment</h4>
	  	<p v-if="office_survey.survey.az_sosta_carpooling=='sì'"> Prenotabili:  {{ office_survey.survey.az_sosta_carpooling_nr }}</p>
		<p v-if="office_survey.survey.az_sosta_carpooling=='sì'"> Liberi: 0</p>
		<p v-if="office_survey.survey.az_sosta_carpooling=='no'" class="card-text">Non ci sono Carpool Parking</p>

      <b-button v-b-toggle.collapse-1-inner size="sm">Futuro</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>
			<h4 class="card-text">Machina Parking Managment</h4>
	  		<p> Prenotabili: {{ office_survey.info_parking.az_sosta_auto_nr }}</p>
	 		<p>Liberi: {{ office_survey.info_parking.az_sosta_auto_nr_liberi }}</p>
		</b-card>
      </b-collapse>
    </b-card>
	<b-card v-if="office_survey.survey.az_sosta=='no'">
		<h4 class="card-text">Non ci sono Machina Parking</h4>
	</b-card>
  </b-collapse>
 <b-collapse id="collapse-2" class="mt-2">
    <b-card v-if="office_survey.survey.az_sosta_bici=='sì'">
		<b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Bicicleta Parking Managment</h4>
	  	<p> Prenotabili:  {{ office_survey.survey.az_sosta_bici_nr }}</p>
		<p> Liberi: 0</p>
		<p> Prenotabili (eletriche):  {{ office_survey.survey.az_sosta_bici_el_nr }}</p>
		<p> Liberi: 0</p>
	  <b-button v-b-toggle.collapse-2-inner size="sm">Futuro</b-button>
      <b-collapse id="collapse-2-inner" class="mt-2">
        <b-card>
			<p> Liberi: 0</p>
			<p> Prenotabili: 0</p>
		</b-card>
      </b-collapse>
    </b-card>
	<b-card v-if="office_survey.survey.az_sosta_bici=='no'">
		<h4 class="card-text">Non ci sono Bicicleta Parking</h4>
	</b-card>
  </b-collapse>
  <b-collapse id="collapse-3" class="mt-2">
    <b-card v-if="office_survey.survey.az_sosta_carpooling=='sì'">
		<b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>
      <h4 class="card-text">Motocicli Parking Managment</h4>
		<p> Prenotabili:  {{ office_survey.survey.az_sosta_moto_nr }}</p>
		<p> Liberi: 0</p>
      <b-button v-b-toggle.collapse-3-inner size="sm">Futuro</b-button>
      <b-collapse id="collapse-3-inner" class="mt-2">
        <b-card>
		<p> Liberi: 0</p>
		<p> Prenotabili: 0</p>
		</b-card>
      </b-collapse>
    </b-card>
	<b-card v-if="office_survey.survey.az_sosta_moto=='no'">
		<h4 class="card-text">Non ci sono Motocicli Parking</h4>
	</b-card>
  </b-collapse>

</div>
<div v-if="office_survey.survey!=null">
	<b-modal id="modal-1" title="Posti liberi">
			<b-row  >
				<b-col md="4"><b-icon class="mr-2" icon="circle-fill" variant="success"></b-icon>Posti disponibili</b-col>
				<b-col xl="5"><b-icon class="mr-2" icon="circle-fill" variant="danger"></b-icon>Posti non-disponibili</b-col>
				<b-col xl="3"><b-icon class="mr-2" icon="circle-fill" variant="info"></b-icon>Carpool</b-col>
			</b-row>
			<br>
			<table cellpadding="5" cellspacing="2" v-if="office_survey.survey.az_sosta_auto_nr!=null">
				<tr v-for="b in Math.round(parseInt(office_survey.survey.az_sosta_auto_nr)/13)">
						<td v-for="a in 13"> <b-img                
						:src="icons.car.png"
						:alt="icons.car.name" v-b-tooltip.hover :title="a*b ">
						</b-img> </td>
						
					</tr>
				</table>  
			<br>
				<b-form-checkbox
      				id="checkbox-1"
     				v-model="carpooling_check"
      				name="checkbox-1"
      				value="accepted"
      				unchecked-value="not_accepted">
					La tua macchina è un carpool?
    			</b-form-checkbox>
		</b-modal>
</div>

               
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
            min: 0,
     	    max: 100,
            step: 1,
			company_id: null,
			office_id: null,
			offices: [],
			companies: [],
			offices_survey:null,
			office_survey:{
				survey:{
					az_sosta_auto_nr:0,
				},
				info_parking:{
					az_sosta_auto_nr:0,
					az_sosta_auto_nr_liberi:0,
					az_sosta_carpooling:0, 
					az_sosta_auto_el_nr:0, 
					az_sosta_visitatori:0, 
					az_sosta_bici_nr:0, 
					az_sosta_bici_nr_liberi:0, 
					az_sosta_bici_el_nr:0, 
					az_sosta_moto_nr:0, 
					az_sosta_moto_el_nr:0,
					az_sosta_moto_nr_liberi:0,
					
				},
				carpooling_check:false,

			},
			showDismissibleAlert: false,
			showDismissibleCard: false,
			icons:{
				car:{
					name: "Car up view",
					png: require("@/assets/img/carupview2.png"),
				},
				moto:{
					name: "Motocicli",
					png: require("@/assets/img/motocicleta.png"),
				},
			}, 
			activeConsigli: true,
			selected_office:true,	
			

				

			
			
		};
	},
	computed: {
		// selected_office(){
		// 	if(this.office_survey.survey!=null){
		// 		return false
		// 	}else{
		// 		return true
		// 	}
			
		// },
		
		
	},
	methods: {
		
		
		nextTab(next) {
			this.$router.push(`/bilancio/${next}`);
		},
		onTabChange(){
			this.activeConsigli=false
			//this.activeConsigli=!this.activeConsigli
		},
		async updateCompany() {
			this.offices = await this.createOfficeList();
		},
		async updateParking() {
			// office_survey=offices_survey.map((x) => x.id==office_id);
			this.office_survey=this.offices_survey.find(obj => obj.id === this.office_id);
			if(this.office_survey.survey!=null){
				this.selected_office=false;
			}else{
				this.selected_office=true;
			}
			if(this.office_survey.info_parking == null){
				this.office_survey.info_parking={
					az_sosta_auto_nr:0,
					az_sosta_auto_nr_liberi:0,
					az_sosta_carpooling:0, 
					az_sosta_auto_el_nr:0, 
					az_sosta_visitatori:0, 
					az_sosta_bici_nr:0, 
					az_sosta_bici_nr_liberi:0, 
					az_sosta_bici_el_nr:0, 
					az_sosta_moto_nr:0, 
					az_sosta_moto_el_nr:0,
					az_sosta_moto_nr_liberi:0,
					
				};
			}
			
		},
		async createOfficeList(){ 
			let self = this;
			let offices = {};
			try {
				let res = await UserService.getOffices(this.company_id);
				this.offices_survey = res.data.offices;
				// this.offices_survey.parking={
				// 	az_sosta_auto_nr:0,
				// 	az_sosta_auto_nr_liberi:0,
				// 	az_sosta_carpooling:0, 
					
				// };

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
		async submit() {
			// if (this.$refs["office_survey"].checkValidity()) {
			try {
				await UserService.editOffice(this.office_survey, this.office_id);
				this.$bvToast.toast("Salvataggio avvenuto correttamente", {
					title: "Invio ok",
					autoHideDelay: 2000,
					appendToast: true,
				});
				if (this.redirect_to) {
					this.$router.push(this.redirect_to);
				}
			} catch (e) {
				console.log(e);
				this.$bvToast.toast(e.message, {
					title: "Errore",
					autoHideDelay: 2000,
					appendToast: true,
					variant: "danger",
				});
			}
			// } else {
			// 	this.$refs["office_survey"].reportValidity();
			// }
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
		// this.offices_survey.parking={
		// 			az_sosta_auto_nr:0,
		// 			az_sosta_auto_nr_liberi:0,
		// 			az_sosta_carpooling:0, 
					
		// 		};
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
