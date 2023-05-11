import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { FridgeComponent } from './fridge.component';

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
