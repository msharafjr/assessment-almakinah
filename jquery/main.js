/*
	Project: Assessment - Almakinah
*/

jQuery( function( $ ) {
	'use strict';

	const $app = $( '#app' );

	// form schema URL
	const api = 'https://levelup-assessment-backend-ddmwdsdlta.now.sh/api';

	const submitAssessment = e => {
		e.preventDefault();

		const data = {};

		const inputs = $( 'form' ).find( '.form-control' ).get();

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
		const form = $( '<form>' ).on( 'submit', submitAssessment );

		// convert formSchema object into an array contains arrays of each input
		const inputs = Object.entries( formSchema );
		inputs.forEach( input => {
			form.append( createFormGroup( input ) );
		});

		$app.append( form );
		form.find( 'input' )[0].focus();
	};


	const createFormGroup = formInput => {
		const [ name, attributes ] = formInput;

		const formGroup = $( '<div>', { 'class': 'form-group' });
		const input = createInput( name, attributes );

		const label = $( '<label>', { 'for': name }).text( name );

		// control label position
		if ( attributes.type === 'checkbox'  ) {

			formGroup.append( input );
			formGroup.append( label );

		} else if ( attributes.type === 'hidden' || attributes.type === 'submit' ) {

			formGroup.append( input );

		} else {

			formGroup.append( label );
			formGroup.append( input );

		}

		return formGroup;
	};

	const createInput = ( name, { type, value } ) => {

		const isSubmit = type === 'submit';
		const input = $( '<input>', {
			'name': name,
			'type': type,
			'value': value,
			'id': name,
			'class': isSubmit ? '' : 'form-control'
		});

		return input;
	};

	const getFormSchema = apiURL => {
		return fetch( apiURL )
			.then( res => res.json() )
			.then( renderForm )
			.catch( err => console.log( err ) );
	};

	getFormSchema( api + '/getFormSchema' );

});
