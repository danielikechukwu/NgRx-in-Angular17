import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShellComponent } from './product-shell.component';

describe('ProductShellComponent', () => {
  let component: ProductShellComponent;
  let fixture: ComponentFixture<ProductShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductShellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
