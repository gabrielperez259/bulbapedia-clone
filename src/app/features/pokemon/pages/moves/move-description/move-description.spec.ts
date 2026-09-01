import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MovesDataClient } from "../../../services/moves-data-client";
import { MoveDescription } from "./move-description";
import { MOVE_DETAILS_MOCK } from "../../../../../../testing/factories/move-factory";
import { provideRouter } from "@angular/router";

describe('MoveDetailsComponent', () => {
  let component: MoveDescription;
  let fixture: ComponentFixture<MoveDescription>;
  let moveDetailsDataClient: MovesDataClient;
  let compiled: HTMLElement;

  const moveDetailsMock = MOVE_DETAILS_MOCK;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoveDescription],
      providers: [
      //  provideRouter([]),
        {
          provide: MovesDataClient,
          useValue: moveDetailsMock,
        }          
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoveDescription);

    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    moveDetailsDataClient = TestBed.inject(MovesDataClient);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the complete move description', async () => {
    moveDetailsMock.moveName.set('astral-barrage');
    moveDetailsMock.moveType.set({ name: 'ghost' });
    moveDetailsMock.moveGenerationIntroduced.set({ name: 'generation-viii' });
    moveDetailsMock.moveEffectEntry.set({ effect: 'Inflicts regular damage.' });
    await fixture.whenStable();
    const text = compiled.textContent?.replace(/\s+/g, ' ').trim();
    expect(text).toContain(
      'Astral Barrage is a ghost type move introduced in GENERATION-VIII that inflicts regular damage.',
    );
  });

});