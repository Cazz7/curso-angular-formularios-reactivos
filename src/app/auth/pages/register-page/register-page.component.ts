import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
//import { cantBeStrider } from 'src/app/shared/validators/validators.functions';
// Esta es otra forma para no poner tantos.
//import * as customValidators from 'src/app/shared/validators/validators.functions';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({ // sale deprecated si se usa formgroup en vez de abstractcontrol
    name:['',[Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ]],
    // Primero se ejecutan los validadores sincronos y luego los asincronos
    // Tambien se puede hacer inyectando, el new instance afecta en el performance cuando son muchas instancias, aqui como es una es indiferente
    //email:['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern) ],[ this.emailValidator ]], // Esto es porque esta proveido en el root
    email:['',[Validators.required, Validators.pattern(this.validatorsService.emailPattern) ],[ new EmailValidator() ]], // Esto es porque esta proveido en el root
    username: ['',[Validators.required,this.validatorsService.cantBeStrider]], //Solo la referencia a la funcion, no se llama ()
    password1: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required, Validators.minLength(6)]]
  }, {
    // Pasan como argumento implicito a todo el formulario
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'password1', 'password2' )
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService){}

  isValidField(field: string){
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSave(){
    this.myForm.markAllAsTouched();
  }
}
