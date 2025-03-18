import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  standalone: true, // Agregado para evitar errores en Angular Standalone
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]], // Corregido
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // isValidField(fieldName: string): boolean {
  //   const field = this.myForm.controls[fieldName];
  //   return !!(field.errors && field.touched);
  // }

  // getFieldError(fieldName: string): string | null {
  //   const control = this.myForm.controls[fieldName];

  //   if (!control || !control.errors) return null;

  //   const errors = control.errors;

  //   for (const key of Object.keys(errors)) {
  //     switch (key) {
  //       case 'required':
  //         return 'Este campo es requerido';

  //       case 'minlength':
  //         return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;

  //       case 'min':
  //         return `Valor mínimo de ${errors['min'].min}`;

  //       case 'max':
  //         return `Valor máximo de ${errors['max'].max}`;
  //     }
  //   }

  //   return null;
  // }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado:', this.myForm.value);

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
