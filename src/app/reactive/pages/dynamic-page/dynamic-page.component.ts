import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  public newFavorite: FormControl = new FormControl('',Validators.required);

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  constructor(private fb: FormBuilder){

  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit():void{
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]) ;
    this.myForm.reset();
  }

  isValidField(field: string): boolean | null {

    return this.myForm.controls[field].errors
            && this.myForm.controls[field].touched;

  }

  isValidFieldInArray(formArray:FormArray, index:number): boolean | null{
    return formArray.controls[index].errors
            && formArray.controls[index].touched;
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

  onAddToFavorites():void{
    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    // Si no estuviera usando formbuilder se usa esto
    //this.favoriteGames.push( new FormControl( newGame, Validators.required ) )

    // para el form builder
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );
    this.newFavorite.reset();

  }

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index); // Recordar que esto es posible
    // porque se pasa como referencia
  }

}
