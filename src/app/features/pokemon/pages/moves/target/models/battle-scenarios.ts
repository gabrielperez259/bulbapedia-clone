export type BattleFormat = 'double' | 'triple';

export type UserPosition = 'left' | 'center' | 'right';

export interface BattleScenario {
  format: BattleFormat;
  userPosition: UserPosition;
}