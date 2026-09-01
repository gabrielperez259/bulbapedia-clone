import { signal } from "@angular/core";
import { MoveDetails } from "../../app/features/pokemon/models/moves/move-details";

export const MOVE_DETAILS_MOCK = {
    search: {
      set: vi.fn(),
    },

    moveDetails: signal<MoveDetails | undefined>(undefined),
    moveDetailsLoading: signal(false),
    moveDetailsError: signal(false),
    moveAccuracy: signal(0),
    moveName: signal(''),
    movePower: signal(0),
    movePP: signal(0),
    moveType: signal({ name: '' }),
    moveDamageClass: signal(''),
    moveGenerationIntroduced: signal({ name: '' }),
    moveEffectEntry: signal({ effect: '' }),
    movePastValues: signal([
      { version_group: { name: '' }, accuracy: 0, effect_entries: [{ effect: '' }] },
    ]),
    moveContestType: signal({ name: '' }),
    moveContestEffect: signal(''),
  };