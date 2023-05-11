import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../../objects/item';
import { Fridge } from '../../objects/fridge';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() itemChild: Item;
  @Input() fridgeChild: Fridge;
  errorMessage: any;
  item: Item;
  actual: number;
  target: number;

  constructor(private restService: RestService) {}

  ngOnInit() {}

  changeSingleItem(form: NgForm) {
    const fridgeId = this.fridgeChild.id;
    const itemId = this.itemChild.id;

    const newFormData = {
      id: itemId,
      actual: this.actual,
      target: this.target,
    };

    console.log(newFormData);

    this.restService
      .changeSingleItemService(fridgeId, itemId, newFormData)
      .subscribe(
        (data) => {
          this.item = data;
          alert('Change item success');
          form.resetForm();
        },
        (error) => {
          console.error('error caught in component');
          this.errorMessage = error;
          alert(this.errorMessage);
          throw error;
        }
      );
  }
}
