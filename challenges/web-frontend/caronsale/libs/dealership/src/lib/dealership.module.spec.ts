import { async, TestBed } from '@angular/core/testing';
import { DealershipModule } from './dealership.module';

describe('DealershipModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DealershipModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DealershipModule).toBeDefined();
  });
});
