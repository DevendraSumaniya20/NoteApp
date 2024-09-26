import {RootState} from '../store';
import ApiService from '../../config/ApiService';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

interface NoteProps {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  startDate: string;
  endDate: string;
}

interface NoteState {
  notes: NoteProps[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchNotesAsync = createAsyncThunk<NoteProps[], string>(
  'notes/fetchNotes',
  async userId => {
    const response = await ApiService.getNotes(userId);
    const notes = response.data.map((note: any) => ({
      ...note,
      startDate: new Date(note.startDate).toISOString(),
      endDate: new Date(note.endDate).toISOString(),
    }));
    return notes;
  },
);

export const addNoteAsync = createAsyncThunk<NoteProps, NoteProps>(
  'notes/addNote',
  async note => {
    // Log the note object to the console
    console.log('Adding note:', note);

    const response = await ApiService.addNote({
      ...note,
      startDate: new Date(note.startDate).toISOString(),
      endDate: new Date(note.endDate).toISOString(),
    });

    return response.data;
  },
);

export const updateNoteAsync = createAsyncThunk<NoteProps, NoteProps>(
  'notes/updateNote',
  async note => {
    const response = await ApiService.updateNote(note.id, {
      ...note,
      startDate: new Date(note.startDate).toISOString(),
      endDate: new Date(note.endDate).toISOString(),
    });
    return response.data;
  },
);

export const deleteNoteAsync = createAsyncThunk<string, string>(
  'notes/deleteNote',
  async id => {
    await ApiService.deleteNote(id);
    return id;
  },
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchNotesAsync.fulfilled,
        (state, action: PayloadAction<NoteProps[]>) => {
          state.notes = action.payload;
        },
      )
      .addCase(
        addNoteAsync.fulfilled,
        (state, action: PayloadAction<NoteProps>) => {
          state.notes.push(action.payload);
        },
      )
      .addCase(
        deleteNoteAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.notes = state.notes.filter(note => note.id !== action.payload);
        },
      )
      .addCase(
        updateNoteAsync.fulfilled,
        (state, action: PayloadAction<NoteProps>) => {
          const updatedNote = action.payload;
          const existingNoteIndex = state.notes.findIndex(
            note => note.id === updatedNote.id,
          );
          if (existingNoteIndex !== -1) {
            state.notes[existingNoteIndex] = updatedNote;
          }
        },
      )
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.loading = false;
        },
      );
  },
});

export default noteSlice.reducer;

export const selectNotes = (state: RootState) => state.notes.notes;
