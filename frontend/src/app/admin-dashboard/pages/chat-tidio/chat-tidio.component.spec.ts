import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTidioComponent } from './chat-tidio.component';

describe('ChatTidioComponent', () => {
  let component: ChatTidioComponent;
  let fixture: ComponentFixture<ChatTidioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTidioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatTidioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
