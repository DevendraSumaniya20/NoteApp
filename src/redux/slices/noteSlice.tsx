import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import config from '../../config/config';

// Define the NoteProps interface to describe the structure of a note
interface NoteProps {
  id: number; // Unique identifier for each note
  title: string; // Title of the note
  description: string; // Description of the note
  status: string; // Status of the note (e.g., 'completed', 'in-progress')
  startDate: string; // Start date of the note
  endDate: string; // End date of the note
}

// Define the NoteState interface to describe the structure of the notes slice state
interface NoteState {
  notes: NoteProps[]; // Array of notes
  loading: boolean; // Loading state for async actions
  error: string | null; // Error state for async actions
}

// Initial state of the notes slice
const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

// Async thunk to fetch notes from the server
export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotes', // Action type string
  async () => {
    const response = await fetch(
      `${config.baseUrl}${config.endpoints.getNotes}`, // Fetch notes from the API
    );
    if (!response.ok) {
      throw new Error('Failed to fetch notes'); // Throw error if the response is not ok
    }
    return response.json(); // Return the JSON response
  },
);

// Async thunk to add a new note
export const addNoteAsync = createAsyncThunk(
  'notes/addNote',
  async (note: NoteProps) => {
    const response = await fetch(
      `${config.baseUrl}${config.endpoints.addNote}`, // API endpoint to add a note
      {
        method: 'POST', // HTTP method for adding a note
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(note), // Convert note object to JSON string
      },
    );
    if (!response.ok) {
      throw new Error('Failed to add note'); // Throw error if the response is not ok
    }
    return response.json(); // Return the JSON response
  },
);

// Async thunk to update an existing note
export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote',
  async (note: NoteProps) => {
    const response = await fetch(
      `${config.baseUrl}${config.endpoints.updateNote}`, // API endpoint to update a note
      {
        method: 'PUT', // HTTP method for updating a note
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(note), // Convert note object to JSON string
      },
    );
    if (!response.ok) {
      throw new Error('Failed to update note'); // Throw error if the response is not ok
    }
    return response.json(); // Return the JSON response
  },
);

// Async thunk to delete a note
export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNote',
  async (id: number) => {
    const response = await fetch(
      `${config.baseUrl}${config.endpoints.deleteNote}`, // API endpoint to delete a note
      {
        method: 'DELETE', // HTTP method for deleting a note
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify({id}), // Send the note ID to be deleted
      },
    );
    if (!response.ok) {
      throw new Error('Failed to delete note'); // Throw error if the response is not ok
    }
    return id; // Return the ID of the deleted note
  },
);

// Create the notes slice
const noteSlice = createSlice({
  name: 'notes', // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    getAllNotes: state => {
      // No action needed, simply used in selectors
      // This action is a placeholder, and no direct state changes occur here
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        fetchNotesAsync.fulfilled,
        (state, action: PayloadAction<NoteProps[]>) => {
          state.notes = action.payload; // Store fetched notes in state
        },
      )
      .addCase(
        addNoteAsync.fulfilled,
        (state, action: PayloadAction<NoteProps>) => {
          state.notes.push(action.payload); // Add new note to the notes array
        },
      )
      .addCase(
        deleteNoteAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.notes = state.notes.filter(note => note.id !== action.payload); // Remove deleted note from state
        },
      )
      .addCase(
        updateNoteAsync.fulfilled,
        (state, action: PayloadAction<NoteProps>) => {
          const {id, title, description, status, startDate, endDate} =
            action.payload; // Destructure updated note properties
          const existingNote = state.notes.find(note => note.id === id); // Find existing note by ID
          if (existingNote) {
            // Update note properties if the note exists
            existingNote.title = title;
            existingNote.description = description;
            existingNote.status = status;
            existingNote.startDate = startDate;
            existingNote.endDate = endDate;
          }
        },
      )
      .addMatcher(
        action => action.type.endsWith('/pending'), // Matches all pending actions
        state => {
          state.loading = true; // Set loading state to true when any async action is pending
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'), // Matches all rejected actions
        (state, action: AnyAction) => {
          // Use AnyAction to access error property
          state.loading = false; // Set loading state to false when any async action is rejected
          state.error = action.error.message || 'Failed to process request'; // Set error message
        },
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'), // Matches all fulfilled actions
        state => {
          state.loading = false; // Set loading state to false when any async action is fulfilled
          state.error = null; // Clear any error messages
        },
      );
  },
});

// Export the actions for use in components
export const {getAllNotes} = noteSlice.actions;

// Export the reducer to be included in the store
export default noteSlice.reducer;
