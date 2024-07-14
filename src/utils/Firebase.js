const firebase = require('firebase');
require('firebase/firestore');

export class Firebase
{
	constructor()
	{
		window._initializedFirebase = false;

		this._config = {
		    apiKey: "AIzaSyD2sFcC0z0EL2irPJyq9haMPlj-68rlol0",
			authDomain: "whatsapp-clone-67bd9.firebaseapp.com",
			projectId: "whatsapp-clone-67bd9",
			storageBucket: "gs://whatsapp-clone-67bd9.appspot.com",
			messagingSenderId: "394960780053",
			appId: "1:394960780053:web:0be527e61d83dd0c25471c",
			measurementId: "G-YRDB56H5XX"
	  	};

		this.init();
	}

	init()
	{
		if(!window._initializedFirebase)
		{
			firebase.initializeApp(this._config);
			window._initializedFirebase = true;
		}
	  	
	}

	static db()
	{
		return firebase.firestore();
	}

	static hd()
	{
		return firebase.storage();
	}

	/**
	* Autentifica o usuário usando a sua conta de email do Google
	* @returns {Promise} No caso de sucesso, retorna um Object contendo os dados do usuário e o token gerado. 
	* Caso contrário, retorna um Object com os dados do erro
	*/
	initAuth()
	{
		return new Promise((s, f)=>{

			var provider = new firebase.auth.GoogleAuthProvider();

			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Google Access Token. You can use it to access the Google API.
			  var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;
			  
			  s({
			  	user, 
			  	token
			  });

			}).catch(function(error) {
			  // Handle Errors here.
			  f(error);
			});
		});
	}
}