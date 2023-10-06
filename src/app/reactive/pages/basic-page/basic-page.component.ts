import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

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

  constructor( private fb: FormBuilder, private validatorsService: ValidatorsService ){}

  ngOnInit(): void {
    // Si requiero por ejemplo algun valor que viene de afuera
    //this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null {

    return this.validatorsService.isValidField( this.myForm, field );

  }

  getFieldError(field: string):string | null{

    return this.validatorsService.getFieldError( this.myForm, field );

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
