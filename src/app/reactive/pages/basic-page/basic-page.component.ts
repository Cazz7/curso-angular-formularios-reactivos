import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx5090 = {
  name: 'RTX 5090',
  price: 2500,
  inStorage: 6
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  // Esta es una forma
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl('',[],[]),// Valor inicial, Validaciones sincronas, luego asincronas
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })


  // Form builder
  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0,[Validators.required, Validators.min(0)]],
    inStorage:[0,[Validators.required, Validators.min(0)]]
  })

  constructor( private fb: FormBuilder ){}
  ngOnInit(): void {
    // Si requiero por ejemplo algun valor que viene de afuera
    //this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched;

  }

  getFieldError(field: string):string | null{

    if(!this.myForm.controls[field]  ) return null; // Para ver si existe el campo

    // Si el errors viene nulo, entonces retorna un objeto vacío
    // tambien se pudo hacer poniendo la validacion && this.myForm.controls[field].errors
    const errors = this.myForm.controls[field].errors || {};
    // para recorrer los errores
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required': return 'Este campo es requerido';
        case 'minlength': return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        }
    }

    return null;
  }

  onSave():void{

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();//para disparar validaciones
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({price:0, inStorage:0})//Reinicializar el formulario

  }
}
