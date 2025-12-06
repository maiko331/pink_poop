export enum PoopShape {
  SWIRL = 'SWIRL',
  HEART = 'HEART',
  STAR = 'STAR',
  GLITTER_BOMB = 'GLITTER_BOMB',
  RABBIT = 'RABBIT'
}

export enum Mood {
  HAPPY = 'HAPPY',
  MEH = 'MEH',
  SAD = 'SAD',
  DYING = 'DYING',
  ANGELIC = 'ANGELIC'
}

export interface PoopLog {
  id: string;
  timestamp: number;
  shape: PoopShape;
  mood: Mood;
  note: string;
  aiFortune?: string; // Kept optional for backward compatibility with old logs
}
