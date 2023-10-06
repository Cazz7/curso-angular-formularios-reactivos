import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit {

  // private initialSettings = {
  //   gender: ['M',Validators.required],
  //   wantNotifications: [true, Validators.required], // Debe tener un valor
  //   termAndConditions: [false, Validators.requiredTrue] // Debe ser verdadero
  // }

  public person = {
    gender: 'M',
    wantNotifications: false
  }

  public initial = {
    gender: 'M',
    wantNotifications: false
  }

  public myForm: FormGroup = this.fb.group({
    gender: ['M',Validators.required],
    wantNotifications: [true, Validators.required], // Debe tener un valor
    termsAndConditions: [false, Validators.requiredTrue] // Debe ser verdadero
  })

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.myForm.reset(this.initial)
  }

  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.myForm.reset(this.initial);
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

  isValidField(field: string): boolean | null {
    // console.log('Field', field)
    // console.log('Errors', this.myForm.controls[field].errors)
     //console.log('Touched',this.myForm.controls[field].touched)
    // console.log('Returno',this.myForm.controls[field].errors
    // && this.myForm.controls[field].touched)

    // Esto no me funciono de la forma tradicional
    // ya me funciono faltaba el parentesis en markAllAsTouched()
    const isValid = this.myForm.controls[field].errors && this.myForm.controls[field].touched;;
    //this.myForm.markAllAsTouched();
    return isValid;
  }

  getFieldError(field: string):string | null{

    //console.log(this.myForm.controls)

    if(!this.myForm.controls[field]  ) return null; // Para ver si existe el campo

    // Si el errors viene nulo, entonces retorna un objeto vacío
    // tambien se pudo hacer poniendo la validacion && this.myForm.controls[field].errors
    const errors = this.myForm.controls[field].errors || {};

    // para recorrer los errores
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'requiredTrue': return `Debes aceptar terminos y condiciones`;
        }
    }
    return null;
  }
}
