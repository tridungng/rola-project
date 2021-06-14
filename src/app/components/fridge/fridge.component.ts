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


  itemList: [] = [];
  item: Item;
  postItem: Item;
  itemCount: number = 0;

  errorMessage: any;

  showListFridge: boolean = false;
  buttonName = 'Show your fridges';

  constructor(public restService: RestService) { }

  ngOnInit(): void {
  }

  //POST-Generate new fridge
  addFridge() {

    this.restService.generateFridgeService().subscribe(
      (data) => {
        console.log("Fridge: " + this.fridge);
        console.log("Item list trong generate: " + this.itemList);
        console.log("return data from generating fridge method: " + data);
        this.newFridge = data;
        this.fridgeList.push(data.id),
        this.fridgeListString = JSON.stringify(this.fridgeList);
        this.count = this.fridgeList.length;
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

  //GET fridge and its items
  getFridge(form) {

    this.restService.getFridgeService(form.value.id).subscribe(
      (data) => {
        this.fridge = data;
        this.itemList = data.inventory;
        this.itemCount = this.itemList.length;

        console.log("Fridge in getFridge method: " + JSON.stringify(this.fridge));
        console.log("Id cua fridge tu getFridge :" + this.fridge.id);
        console.log("Fridge inventory in getFridge method: " + this.itemList);
      },
      (error) => {
        console.error("error caught in component")
        this.errorMessage = error;
        alert(this.errorMessage);
        throw error;
      }
    );
  }

  //POST-add item to fridge
  addItem(form){
    const newFormData = { id: form.value.id, name: form.value.name, actual: form.value.actual, target: form.value.target };
    const fridgeId = form.value.fridgeId;
    console.log("userInput for fridgeId: " + fridgeId);
    console.log("userInput for new item: " + newFormData);
    
    this.restService.addSingleItemService(fridgeId, newFormData).subscribe(
      (data) => { 
        this.postItem = data,
        console.log("postItem trong subsribe method: " + this.postItem),
        alert(`Item: ${newFormData.name} sucessfully added`)
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

    if(this.showListFridge) this.buttonName = "Hide all";
    else this.buttonName = "Show your fridges";
  }
}
