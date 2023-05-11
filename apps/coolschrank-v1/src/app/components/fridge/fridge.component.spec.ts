import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FridgeComponent } from './fridge.component';
import { RestService } from '../../services/rest.service';

describe('FridgeComponent', () => {
  let component: FridgeComponent;
  let fixture: ComponentFixture<FridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FridgeComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [RestService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
