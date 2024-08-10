import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CateringPage } from './catering.page';

describe('CateringPage', () => {
  let component: CateringPage;
  let fixture: ComponentFixture<CateringPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CateringPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CateringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
