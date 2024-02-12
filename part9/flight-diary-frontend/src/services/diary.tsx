import axios from 'axios';
import { DiaryEntry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const createEntry = async (object: NewEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, object);
  return response.data;
};

export const getAllEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export default { createEntry, getAllEntries };