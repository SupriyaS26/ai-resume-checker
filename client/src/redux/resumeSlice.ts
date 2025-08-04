import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResumeState {
  fileMeta: { name: string; size: number; type: string } | null;
  fileUrl: string;
  skills: string[];
  suggestions: string[];
  jobs: any[]; // you can strongly type this later
}

const initialState: ResumeState = {
  fileMeta: null,
  fileUrl: "",
  skills: [],
  suggestions: [],
  jobs: [],
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setFileMeta: (state, action: PayloadAction<{ name: string; size: number; type: string } | null>) => {
      state.fileMeta= action.payload;
    },
    setFileUrl: (state, action: PayloadAction<string>) => {
      state.fileUrl = action.payload;
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
    setJobSuggestions: (state, action: PayloadAction<any[]>) => {
      state.jobs = action.payload;
    },
  },
});

export const {
  setFileMeta,
  setFileUrl,
  setSkills,
  setSuggestions,
  setJobSuggestions,
} = resumeSlice.actions;

export default resumeSlice.reducer;
