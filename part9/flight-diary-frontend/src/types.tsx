export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

interface DiaryEntryComment extends DiaryEntry {
  comment: string;
}

export type NewEntry = Omit<DiaryEntryComment, 'id'>