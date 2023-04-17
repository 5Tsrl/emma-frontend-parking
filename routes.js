import DashboardLayout from "~theme/DashboardLayout.vue";

const routes = [
    {
		path: "/",
		component: DashboardLayout,
		redirect: "/dashboard",
		children: [
			{
				path: "/parking",
				name: "Gestione Posteggi",
				meta: { 
					authorize: ["admin", "moma","moma_area"] 
				},
				// lazy-loaded
				component: pageComponent("index"),
			},						
		]
	}
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 * **/
function pageComponent(name) {	
	var res;	
		try {
			res = require("@/extra/Parking/pages/" + name + ".vue").default;
		} catch (e) {
			console.log("Errore route");
			res = require("./pages/" + name + ".vue").default;
		}	
	return res;
}

export default routes;