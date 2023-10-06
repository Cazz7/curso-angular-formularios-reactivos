import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  // FormControl, Validator errors es un objeto que describe el error
  // Este metodo se redefinio, se le borraron cosas
  // validate(control: AbstractControl): Observable<ValidationErrors | null> {

  //   const email = control.value;

  //   return of({ emailTaken: true})
  //   .pipe( delay( 2000 ) )
  // }

// Forma con backend

  // validatorBackend( email: string ){

  //   return history.http.get<any[]>(`http://localhost:3000/users?1=${ email}`)
  //   .pipe(
  //     map( resp => {
  //       return ( resp.length === 0 )
  //       ? null
  //       : { emailTaken: true }
  //     } )
  //   )

  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;

    // Creo un observable del que va a fluir un validation errors y un null
    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({ email });

      const emailFromBackend = 'cazz182@gmail.com';

      if( email === emailFromBackend ){
        subscriber.next({ emailTaken : true });
        subscriber.complete(); // Para completar el observable
        //return; // aunque no es necesario
      }

      subscriber.next(null); // No hay errores
      subscriber.complete();

    } ).pipe( delay(3000) );

    return httpCallObservable;
  }

}
