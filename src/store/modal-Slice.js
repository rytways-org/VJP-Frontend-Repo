import React from 'react'
import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
  name: 'sideBar',
  initialState: {
      showModal:false,
      selectedData:{},
      selectedForm:<></>,
  },
  reducers: {
    showModalHandler(state, action) {
      state.selectedData = action.payload.selectedData;
      state.showModal = action.payload.showModal;
      state.selectedForm=action.payload.selectedForm;      
      console.log(state.selectedData)
    },
    hideModalHandler(state){
      state.selectedData = {};
      state.showModal = false;
      state.selectedForm=<></>;      
     // console.log(state.selectedData)
    }

  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;