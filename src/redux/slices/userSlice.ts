import { Education, Experience, Skill } from "@/components/EmployeeForm";
import { createSlice } from "@reduxjs/toolkit";

export interface User {
  createdAt: string;
  email: string;
  employmentType: string;
  isAdmin: boolean;
  name: string;
  updatedAt: string;
  _id: string;
  skills?: Skill[];
  educations?: Education[];
  experince?: Experience[];
  carrierObjective?: string;
  establishmentYear: string;
  about?: string;
  companySize?: string;
  website?: string;
  address?: string;
}
const initialState = {
  user: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
