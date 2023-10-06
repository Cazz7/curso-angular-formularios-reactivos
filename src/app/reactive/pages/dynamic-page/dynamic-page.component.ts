import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

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

  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService){

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

    return this.validatorsService.isValidField( this.myForm, field );

  }

  isValidFieldInArray(formArray:FormArray, index:number): boolean | null{

    return this.validatorsService.isValidFieldInArray( formArray, index );

  }

  getFieldError(field: string):string | null{

    return this.validatorsService.getFieldError( this.myForm, field );

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
