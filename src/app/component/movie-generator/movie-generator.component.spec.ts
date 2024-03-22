import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGeneratorComponent } from './movie-generator.component';

describe('MovieGeneratorComponent', () => {
  let component: MovieGeneratorComponent;
  let fixture: ComponentFixture<MovieGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
