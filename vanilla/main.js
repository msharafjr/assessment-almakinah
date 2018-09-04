/*
	Project: Assessment - Almakinah
*/

!(function() {
	'use strict';

	// form schema URL
	const api = 'https://levelup-assessment-backend-ddmwdsdlta.now.sh/api';

	const app = document.getElementById( 'app' );

	const submitAssessment = e => {
		e.preventDefault();

		// const form = document.forms[ 0 ];
		const data = {};

		const inputs = document.forms[ 0 ].querySelectorAll( '.form-control' );

		inputs.forEach( input => {
			if ( input.type === 'checkbox' )
				data[ input.name ] = !!input.checked;
			else
				data[ input.name ] = input.value;
		});

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( data )
		};

		fetch( api + '/submission', options )
		.then( res => res.json() )
		.then( resp => alert( resp.msg ) )
		.catch( err => alert( err.msg ) );

	};

	const renderForm = formSchema => {
		const form = document.createElement( 'form' );

		form.addEventListener( 'submit', submitAssessment );

		// convert formSchema object into an array contains arrays of each input
		const inputs = Object.entries( formSchema );
		inputs.forEach( input => {
			form.appendChild( createFormGroup( input ) );
		});

		app.appendChild( form );
		form.querySelector( 'input' ).focus();
	};

	const createFormGroup = formInput => {
		const [ name, attributes ] = formInput;

		const formGroup = document.createElement( 'div' );
		formGroup.setAttribute( 'class', 'form-group' );

		const input = createInput( name, attributes );

		const label = document.createElement( 'label' );
		label.setAttribute( 'for', name );
		label.innerHTML = name;


		// control label position
		if ( attributes.type === 'checkbox'  ) {

			formGroup.appendChild( input );
			formGroup.appendChild( label );

		} else if ( attributes.type === 'hidden' || attributes.type === 'submit' ) {

			formGroup.appendChild( input );

		} else {

			formGroup.appendChild( label );
			formGroup.appendChild( input );

		}

		return formGroup;
	};

	const createInput = ( name, { type, value } ) => {

		const input = document.createElement( 'input' );
		const isSubmit = type === 'submit';

		input.setAttribute( 'name', name );
		input.setAttribute( 'type', type );
		input.setAttribute( 'value', value );
		input.setAttribute( 'id', name );
		input.setAttribute( 'class', isSubmit ? '' : 'form-control' );

		return input;
	};

	const getFormSchema = apiURL => {
		return fetch( apiURL )
			.then( res => res.json() )
			.then( renderForm )
			.catch( err => console.log( err ) );
	};

	getFormSchema( api + '/getFormSchema' );

})();
