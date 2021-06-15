import { Component, OnInit } from '@angular/core';
import { Fridge } from 'src/app/objects/fridge';
import { Item } from 'src/app/objects/item';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  newFridge: Fridge;
  fridge: Fridge;
  fridgeList: any[] = [];
  
  count: number = 0;
  fridgeListString: string;
  selectedFridgeId: any;
  selectedFridge: boolean = false;

  itemList: [] = [];
  item: Item;
  postItem: Item;
  itemCount: number = 0;

  errorMessage: any;

  showListFridge: boolean = false;
  buttonName = 'Show your fridges';
  buttonShow: boolean = true;

  constructor(public restService: RestService) { }

  ngOnInit(): void {
  }

  //POST-Generate new fridge
  addFridge() {

    this.restService.generateFridgeService().subscribe(
      (data) => {
        console.log("Fridge: " + this.fridge);
        console.log("Item list in addFridge(): " + this.itemList);

        this.newFridge = data;
        this.fridgeList.push(data.id),
        this.fridgeListString = JSON.stringify(this.fridgeList);
        console.log("fridge list (JSON) " + this.fridgeList);
      },
      (error) => {
        console.error("error caught in component")
        this.errorMessage = error;
        alert(this.errorMessage);
        throw error;
      }
    );
  }

  //GET-Get fridge and its items
  getFridge(form) {
    this.changeFridgeStatus(form.value.id);
    
  }

  //POST-Add item to fridge
  addItem(form){
    const newFormData = { id: form.value.id, name: form.value.name, actual: form.value.actual, target: form.value.target };
    const fridgeId = form.value.fridgeId;
    console.log("userInput for fridgeId: " + fridgeId);
    console.log("userInput for new item: " + newFormData);
    
    this.restService.addSingleItemService(fridgeId, newFormData).subscribe(
      (data) => { 
        this.postItem = data,
        console.log("postItem in addItem: " + this.postItem),
        alert(`Item: ${newFormData.name} sucessfully added`),
        form.resetForm();
      },
      (error) => {
        console.error("error caught in component")
        this.errorMessage = error;
        alert(this.errorMessage);
        throw error;
      }
    );
  }

  changeFridgeStatus(fridgeId) {
    this.selectedFridgeId = fridgeId;
    this.selectedFridge = true;
    this.restService.getFridgeService(this.selectedFridgeId).subscribe(
          (data) => {
            this.fridge = data;
            this.itemList = data.inventory;
            this.itemCount = this.itemList.length;
            this.count = this.itemList.length;
    
            console.log("fridge in getFridge method: " + JSON.stringify(this.fridge));
            console.log("fridgeId from getFridge :" + this.fridge.id);
            console.log("fridge inventory in getFridge method: " + this.itemList);
          },
          (error) => {
            console.error("error caught in component")
            this.errorMessage = error;
            alert(this.errorMessage);
            throw error;
          }
        );
  }

  toggle() {
    this.showListFridge = !this.showListFridge;
    this.buttonShow = !this.buttonShow;

    if(this.showListFridge) this.buttonName = "Hide all";
    else this.buttonName = "Show your fridges";
  }
}
