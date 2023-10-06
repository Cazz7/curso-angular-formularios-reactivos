import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {
    // Se eliminan los espacios y se pone en minujscula
    const value: string = control.value.trim().toLowerCase();
    // Se retorna un objeto con el error
    if (value === 'strider'){

      return { noStrider: true };
    }

    return null;

  }

  public isValidField(form: FormGroup, field: string): boolean | null {

    return form.controls[field].errors
            && form.controls[field].touched;

  }

  isValidFieldInArray(formArray:FormArray, index:number): boolean | null{
    return formArray.controls[index].errors
            && formArray.controls[index].touched;
  }

  getFieldError(form: FormGroup, field: string):string | null{

    if(!form.controls[field]  ) return null; // Para ver si existe el campo

    // Si el errors viene nulo, entonces retorna un objeto vacío
    // tambien se pudo hacer poniendo la validacion && this.myForm.controls[field].errors
    const errors = form.controls[field].errors || {};
    // para recorrer los errores
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        }
    }

    return null;
  }

  public isFieldOneEqualFieldTwo(field1: string, field2: string){

    // Función que regresa una función y que nos permite tener el contro del FormGroup
    return (formGroup: AbstractControl ): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ){
        // le establezco el error al formulario
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }

  }

}
