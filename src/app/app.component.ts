import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {ColorEvent} from 'ngx-color';

import carsData from '../data/cars';
import partsData from '../data/parts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor () { }

  @ViewChild('partInput') partInput!: ElementRef<HTMLInputElement>;

  title = 'netcore1';

  carMaxLength = 75;
  carMaxLengthText = `Max. ${this.carMaxLength} characters allowed`;
  car = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.carMaxLength),
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  carValidationMessage () {
    if (this.car.errors?.['required']) return 'Full name is required';
    if (this.car.errors?.['maxLength']) return this.carMaxLengthText;
    if (this.car.errors?.['pattern']) return 'Only english alphabets allowed';
    return '';
  }

  carsData = carsData;
  getFilteredCarsData () {
    return this.carsData.filter(({brand}) => brand.match(new RegExp(`^${this.car.value}`, 'i')))
  }

  part = new FormControl('');

  partsData = partsData;
  getFilteredPartsData () {
    return this.partsData.filter((part) => part['List of auto parts'].match(new RegExp(`^${this.part.value}`, 'i')))
  }

  selectedParts: typeof partsData = [];
  addSelectedPart ($event: MatAutocompleteSelectedEvent) {
    const partIndex = this.partsData
    .findIndex((part) => part['List of auto parts'].localeCompare($event.option.value) === 0)

    this.selectedParts.push(this.partsData[partIndex]);
    this.selectedParts = [...this.selectedParts];

    this.partsData.splice(partIndex, 1);
    this.partsData = [...this.partsData];

    this.partInput.nativeElement.value = '';
    this.part.setValue('')
  }
  removeSelectedPart (index: number) {
    this.partsData.push(this.selectedParts[index]);
    this.partsData = [...this.partsData];

    this.selectedParts.splice(index, 1);
    this.selectedParts = [...this.selectedParts];
  }

  colorMaxLength = 6;
  colorMaxLengthText = `Max. ${this.colorMaxLength} characters allowed`;
  colorHexText = 'Color in HEX format required';
  color = new FormControl('c4c4c4', [
    Validators.required,
    Validators.maxLength(this.colorMaxLength),
    Validators.pattern(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),

  ]);
  colorValidationMessage () {
    if (this.color.errors?.['required']) return 'Color required';
    if (this.color.errors?.['maxLength']) return this.colorMaxLengthText;
    if (this.color.errors?.['pattern']) return this.colorHexText;
    return '';
  }

  colorChange ($event: ColorEvent) {
    this.color.setValue($event.color.hex.substring(1));
  }
  
}
