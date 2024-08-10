import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressbookPage } from './addressbook.page';

describe('AddressbookPage', () => {
  let component: AddressbookPage;
  let fixture: ComponentFixture<AddressbookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressbookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
