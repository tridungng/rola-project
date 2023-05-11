import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/objects/item';
import { RestService } from 'src/app/services/rest.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  item: Item;
  errorMessage: any;

  constructor(public restService: RestService) {}

  ngOnInit(): void {}

  getSingleItem(form: NgForm) {
    const fridgeId = form.value.fridgeId;
    const itemId = form.value.itemId;
    this.restService.getSingleItemService(fridgeId, itemId).subscribe(
      (data) => {
        this.item = data;
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
}
