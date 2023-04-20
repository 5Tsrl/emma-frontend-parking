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
			
	<b-card bg-variant="secondary" text-variant="white">	
		<h5 class="mb-2">Consigli: </h5>
		<p class="my-1"> - Dedica almeno il 5% dei posti al car pooling</p>
		<p class="my-1">- Se il posteggio è esterno pensa ad alberare e depaving</p>
		<p class="my-1">- Quanto occupa un posto bici (un’auto → 10 bici *citare la fonte) </p>
		<p class="my-1">- Pensilina solare per i posteggi in esterno</p>
		<p class="my-1">- Inserisci un sistema di prenotazione</p>
		<p class="my-1">- Wallbox per auto elettriche</p>
	</b-card>	
				

	<div class="d-flex justify-content-center" v-if="office_survey.survey!=null">
		<b-button v-b-toggle.collapse-1 variant="primary" 
		class="mr-2"
		:disabled="selected_office"><i :class="`fa fa-car fa-1x`" :style="`position:relative; left: -6px `"></i>Auto</b-button>
		<b-button v-b-toggle.collapse-2 
		variant="primary" 
		class="mr-2"
		:disabled="selected_office"><b-icon class="mr-2" icon="bicycle"></b-icon>Bicicletta</b-button>
		<b-button v-b-toggle.collapse-3 
		variant="primary"
		:disabled="selected_office"><b-img                
						:src="icons.moto.png"
						:alt="icons.moto.name"
						class="mr-1">
						</b-img> Moto</b-button>
	</div>
	<div class="d-flex justify-content-center" v-if="office_survey.survey==null">
		<h4 class="card-text">Il questionario sede è vuoto</h4>
	</div>
<div v-if="office_survey.survey!=null" >
	<b-form ref="office_survey">
		<b-collapse id="collapse-1" class="mt-2">
		<b-card>
			<b-container class="bv-example-row" v-if="office_survey.survey.az_sosta=='sì'">
				<!-- <b-button v-b-modal.modal-1 variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button>  -->
				<b-row>
					<b-col>
						<h4 class="card-text">Auto Parking Managment</h4>
						<b-form-group
						label="Posti Liberi"
						description="Inserisci il numero di parcheggi liberi per auto tradizionali">
						<!-- <b-label for="input-form-auto-liberi-p">Posti Liberi</b-label> -->
						<b-form-input id="input-form-auto-liberi-p" type="number" v-model=" office_survey.survey.az_sosta_auto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
						</b-form-input>
						<!-- <b-description class="font-weight-light"> Inserisci il numero di parcheggi liberi per auto tradizionali</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4 class="card-text">Auto Parking Managment Futuro</h4>
						<b-form-group
							label="Posti Liberi futuro"
							description="Inserisci il numero di parcheggi liberi per auto tradizionali">
							<!-- <b-label for="input-form-auto-liberi-f">Posti Liberi Futuro</b-label> -->
							<b-form-input id="input-form-auto-liberi-f" type="number" v-model=" office_survey.info_parking.az_sosta_auto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0">
							</b-form-input>
							<!-- <b-description class="font-weight-light"> Inserisci il numero di parcheggi liberi per auto tradizionali</b-description> -->
						</b-form-group>
					</b-col>
				</b-row> 
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per auto tradizionali">
							<!-- <b-label for="input-form-auto-prenotabili-p" > Posti Prenotabili</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_auto_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per auto tradizionali</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Futuro"
							description="Inserisci il numero di parcheggi prenotabili per auto tradizionali">
							<!-- <b-label for="input-form-auto-prenotabili-f" > Posti Prenotabili Futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_auto_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per auto tradizionali</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Liberi (Visitatori/Fornitori)"
							description="Inserisci il numero di parcheggi liberi per visitatori/Fornitori">
							<!-- <b-label for="input-form-auto-visitatori-p"> Posti liberi per visitatori o fornitiri</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_visitatori_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per visitatori o fornitori</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Liberi Futuro (Visitatori/Fornitori)"
							description="Inserisci il numero di parcheggi prenotabili per auto tradizionali">
							<!-- <b-label for="input-form-auto-visitatori-prenotabili-f" > Posti liberi per visitatori o fornitiri in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_visitatori_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per visitatori e fornitori in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili (Visitatori/Fornitori)"
							description="Inserisci il numero di parcheggi prenotabili per visitatori/Fornitori">
							<!-- <b-label for="input-form-auto-visitatori-prenotabili-p"> Posti prenotabili per visitatori o fornitiri</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_visitatori_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per visitatori o fornitori</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabilo Futuro (Visitatori/Fornitori)"
							description="Inserisci il numero di parcheggi prenotabili per auto tradizionali">
							<!-- <b-label for="input-form-auto-visitatori-prenotabili-f" > Posti prenotabili per visitatori o fornitiri in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_visitatori_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per visitatori e fornitori in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<h4>Carpool Parking Managment</h4>
						<b-form-group
							label="Posti Liberi"
							description="Inserisci il numero di parcheggi liberi per Carpooling">
							<!-- <b-label for="input-form-auto-carpooling-liberi-p"> Posti liberi per carpooling</b-label> -->
							<b-form-input type="number" v-model=" office_survey.survey.az_sosta_carpooling_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per carpooling</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4>Carpool Parking Managment Futuro</h4>
						<b-form-group
							label="Posti Liberi Futuro"
							description="Inserisci il numero di parcheggi liberi per Carpooling">
							<!-- <b-label for="input-form-auto-carpooling-liberi-f"> Posti liberi per carpooling in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_carpooling_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per carpooling</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per carpooling">
							<!-- <b-label for="input-form-auto-carpooling-prenotabili-p"> Posti prenotabili per carpooling</b-label> -->
							<b-form-input type="number" v-model=" office_survey.survey.az_sosta_carpooling_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per carpooling</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Futuro"
							description="Inserisci il numero di parcheggi prenotabili per Carpooling">
							<!-- <b-label for="input-form-auto-carpooling-prenotabili-f"> Posti prenotabili per carpooling in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_carpooling_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per carpooling</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<h4>Auto-Elettriche Parking Managment</h4>
						<b-form-group
							label="Posti Liberi"
							description="Inserisci il numero di parcheggi liberi per Auto-Elettriche">
							<!-- <b-label for="input-form-auto-elettriche-liberi-p"> Posti liberi per Auto-Elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_auto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per auto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4>Auto-Elettriche Parking Managment Futuro</h4>
						<b-form-group
							label="Posti Liberi Futuro"
							description="Inserisci il numero di parcheggi liberi per Auto-Elettriche">
							<!-- <b-label for="input-form-auto-elettriche-liberi-f"> Posti liberi per auto-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_auto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per auto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per auto-elettriche">
							<!-- <b-label for="input-form-auto-elettiche-prenotabili-p"> Posti prenotabili per auto-elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_auto_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per auto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Futuro"
							description="Inserisci il numero di parcheggi prenotabili per auto-elettriche">
							<!-- <b-label for="input-form-auto-elettriche-prenotabili-f"> Posti prenotabili per auto-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_auto_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per auto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
			</b-container>
			<br>
			<b-button
				@click="submit"
				type="button"
				variant="primary"
				class="float-right">Salva
			</b-button>
		</b-card>
		</b-collapse>

		<b-collapse id="collapse-2" class="mt-2">
    	<b-card>
		<!-- <b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button> -->
			<b-container>
				<b-row>
					<b-col>
						<h4 class="card-text">Bicicletta Parking Managment</h4>
						<b-form-group
							label="Posti Liberi Bici"
							description="Inserisci il numero di parcheggi liberi per Bici">
							<!-- <b-label for="input-form-bici-liberi-p"> Posti liberi per Bicicletta</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_bici_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per bicicletta</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4 class="card-text">Bicicletta Parking Managment Futuro</h4>
						<b-form-group
							label="Posti Liberi Bici Futuro"
							description="Inserisci il numero di parcheggi liberi per Bici in futuro">
							<!-- <b-label for="input-form-bici-liberi-f"> Posti liberi per Bicicletta in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_bici_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per bicicletta in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Bici"
							description="Inserisci il numero di parcheggi prenotabili per Bici">
							<!-- <b-label for="input-form-bici-prenotabili-p"> Posti Prenotabili per Bicicletta </b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_bici_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per bicicletta</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Bici Futuro"
							description="Inserisci il numero di parcheggi prenotabili per Bici in Futuro">
							<!-- <b-label for="input-form-bici-prenotabili-f"> Posti Prenotabili per Bicicletta in Futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_bici_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per bicicletta in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<h4>Bici-Elettriche Parking Managment</h4>
						<b-form-group
							label="Posti Liberi"
							description="Inserisci il numero di parcheggi liberi per Bici-Elettriche">
							<!-- <b-label for="input-form-bici-elettriche-liberi-p"> Posti liberi per bici-elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_bici_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per bici-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4>Bici-Elettriche Parking Managment Futuro</h4>
						<b-form-group
							label="Posti Liberi Futuro"
							description="Inserisci il numero di parcheggi liberi per Bici-Elettriche">
							<!-- <b-label for="input-form-bici-elettriche-liberi-f"> Posti liberi per bici-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_bici_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per bici-elettriche</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per bici-elettriche">
							<!-- <b-label for="input-form-bici-elettiche-prenotabili-p"> Posti prenotabili per bici-elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_bici_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per bici-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili Futuro"
							description="Inserisci il numero di parcheggi prenotabili per bici-elettriche">
							<!-- <b-label for="input-form-bici-elettriche-prenotabili-f"> Posti prenotabili per bici-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_bici_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per bici-elettriche</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-button
				@click="submit"
				type="button"
				variant="primary"
				class="float-right">Salva</b-button>
			</b-container>
		</b-card>
		</b-collapse>

		<b-collapse id="collapse-3" class="mt-2">
		<b-card>
		<!-- <b-button variant="outline-primary" class="btn btn-primary float-right">Prenotazione</b-button> -->
			<b-container>
				<b-row>
					<b-col>
						<h4>Parking Managment Moto</h4>
						<b-form-group
							label="Posti Liberi"
							description="Inserisci il numero di parcheggi liberi per Moto">
							<!-- <b-label for="input-form-moto-liberi-p"> Posti liberi per moto</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_moto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per moto</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4>Parking Managment Moto Futuro</h4>
						<b-form-group
							label="Posti Liberi futuro"
							description="Inserisci il numero di parcheggi liberi per Moto in futuro">
							<!-- <b-label for="input-form-moto-liberi-f"> Posti liberi per moto in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_moto_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per moto in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per Moto">
							<!-- <b-label for="input-form-moto-prentabili-p"> Posti prenotabili per moto</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_moto_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per moto</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili in Futuro"
							description="Inserisci il numero di parcheggi prenotabili per Moto in futuro">
							<!-- <b-label for="input-form-moto-prenotabili-f"> Posti prenotabili per moto in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_moto_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per moto in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<b-row>
					<b-col>
						<h4>Parking Managment Moto-Elettriche</h4>
						<b-form-group
							label="Posti Liberi Moto-Elettriche"
							description="Inserisci il numero di parcheggi liberi per Moto-Elettriche">
							<!-- <b-label for="input-form-moto-el-liberi-p"> Posti liberi per moto-elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_moto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per moto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<h4>Parking Managment Moto-Elettriche Futuro</h4>
						<b-form-group
							label="Posti Liberi futuro"
							description="Inserisci il numero di parcheggi liberi per Moto-Elettriche in futuro">
							<!-- <b-label for="input-form-moto-el-liberi-f"> Posti liberi per moto-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_moto_el_nr" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi liberi per moto-elettriche in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-row>
					<b-col>
						<b-form-group
							label="Posti Prenotabili"
							description="Inserisci il numero di parcheggi prenotabili per Moto-Elettriche">
							<!-- <b-label for="input-form-moto-el-prenotabili-p"> Posti prenotabili per moto-elettriche</b-label> -->
							<b-form-input type="number" v-model="office_survey.survey.az_sosta_moto_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per moto-elettriche</b-description> -->
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							label="Posti Prenotabili in Futuro"
							description="Inserisci il numero di parcheggi prenotabili per Moto-Elettriche in futuro">
							<!-- <b-label for="input-form-moto-el-prenotabili-f"> Posti prenotabili per moto-elettriche in futuro</b-label> -->
							<b-form-input type="number" v-model="office_survey.info_parking.az_sosta_moto_el_nr_prenotabili" :min="min" :max="max" :step="step" class="mb-2 mt-0"></b-form-input>
							<!-- <b-description class="font-weight-light">Inserisci il numero di parcheggi prenotabili per moto-elettriche in futuro</b-description> -->
						</b-form-group>
					</b-col>
				</b-row>
				<br>
				<b-button
				@click="submit"
				type="button"
				variant="primary"
				class="float-right">Salva</b-button>
			</b-container>
		
   		</b-card>
		</b-collapse>
	</b-form>
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
					az_sosta_auto_nr_prenotabili:0,
					az_sosta_carpooling:0, 
					az_sosta_auto_el_nr:0, 
					az_sosta_visitatori:0, 
					az_sosta_bici_nr:0, 
					az_sosta_bici_nr_prenotabili:0, 
					az_sosta_bici_el_nr:0, 
					az_sosta_moto_nr:0, 
					az_sosta_moto_el_nr:0,
					az_sosta_moto_nr_prenotabili:0,
					
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
					name: "Moto",
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
					az_sosta_auto_nr_prenotabili:0,
					az_sosta_carpooling:0, 
					az_sosta_auto_el_nr:0, 
					az_sosta_visitatori:0, 
					az_sosta_bici_nr:0, 
					az_sosta_bici_nr_prenotabili:0, 
					az_sosta_bici_el_nr:0, 
					az_sosta_moto_nr:0, 
					az_sosta_moto_el_nr:0,
					az_sosta_moto_nr_prenotabili:0,
					
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
			if (this.$refs["office_survey"].checkValidity()) {
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
			} else {
				this.$refs["office_survey"].reportValidity();
			}
		},
		
	},
	async created() {
		this.carpooling_check=false;
		
		if (this.$route.query.company_id){
			this.company_id = parseInt(this.$route.query.company_id);
			this.updateCompany();
		}
		if (this.$route.query.office_id){
			this.office_id = parseInt(this.$route.query.office_id);
		}
		//this.office_survey.survey=null;
		if(this.office_survey.info_parking == null){
				this.office_survey.info_parking={
					az_sosta_auto_nr:0,
					az_sosta_auto_nr_prenotabili:0,
					az_sosta_carpooling:0, 
					az_sosta_auto_el_nr:0, 
					az_sosta_visitatori:0, 
					az_sosta_bici_nr:0, 
					az_sosta_bici_nr_prenotabili:0, 
					az_sosta_bici_el_nr:0, 
					az_sosta_moto_nr:0, 
					az_sosta_moto_el_nr:0,
					az_sosta_moto_nr_prenotabili:0,
					
				};}
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
