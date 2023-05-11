import { Component, OnInit } from '@angular/core';
import { Fridge } from '../../objects/fridge';
import { Item } from '../../objects/item';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],
})
export class FridgeComponent implements OnInit {
  newFridge: Fridge;
  fridge: Fridge;
  fridgeList: any[] = [];

  count = 0;
  selectedFridgeId: any;
  selectedFridge = false;

  itemList: Item[] = [];
  item: Item;
  postItem: Item;
  itemCount: number = 0;

  errorMessage: any;

  showListFridge = false;
  buttonName = 'Show your fridges';
  buttonShow = true;

  constructor(public restService: RestService) {}

  ngOnInit(): void {}

  //POST-Generate new fridge
  addFridge() {
    this.restService.generateFridgeService().subscribe(
      (data) => {
        this.newFridge = data;
        this.fridgeList.push(data.id);
      },
      (error) => {
        console.error('error caught in component');
        this.errorMessage = error;
        alert(this.errorMessage);
        throw error;
      }
    );
  }

  getFridge(form: { value: { id: any } }): void {
    this.changeFridgeStatus(form.value.id);
  }

  //POST-Add item to fridge
  addItem(form: {
    value: { id: any; name: any; actual: any; target: any; fridgeId: any };
    resetForm: () => void;
  }): void {
    const newFormData = {
      id: form.value.id,
      name: form.value.name,
      actual: form.value.actual,
      target: form.value.target,
    };

    const fridgeId = form.value.fridgeId;
    this.restService.addSingleItemService(fridgeId, newFormData).subscribe(
      (data) => {
        this.postItem = data;
        alert(`Item: ${newFormData.name} successfully added`);
        form.resetForm();
      },
      (error) => {
        console.error('error caught in component');
        this.errorMessage = error;
        alert(this.errorMessage);
        form.resetForm();
        throw error;
      }
    );
  }

  changeFridgeStatus(fridgeId: any) {
    this.selectedFridgeId = fridgeId;
    this.selectedFridge = true;
    this.restService.getFridgeService(this.selectedFridgeId).subscribe(
      (data) => {
        this.fridge = data;
        this.itemList = data.inventory;
        this.itemCount = this.itemList.length;
        this.count = this.itemList.length;
      },
      (error) => {
        console.error('error caught in component');
        this.errorMessage = error;
        alert(this.errorMessage);
        throw error;
      }
    );
  }

  toggle() {
    this.showListFridge = !this.showListFridge;
    this.buttonShow = !this.buttonShow;

    if (this.showListFridge) this.buttonName = 'Hide all';
    else this.buttonName = 'Show your fridges';
  }
}
