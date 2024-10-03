import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin:null,
    destination:null,
    travelTimeInformation:null,
    
}

export const navSlice = createSlice ({
    name:'nav',
    initialState,
    reducers:{
        setorigin:(state , action)=>{
            state.origin=action.payload;
        },

        setdestination:(state,action)=>{
            state.destination=action.payload;
        },

        settravelTimeInformation:(state,action)=>{
            state.travelTimeInformation=action.payload;
        },
    },

})


export const {setorigin,setdestination,settravelTimeInformation}=navSlice.actions;

//Selectors :
export const selectorigin =(state)=> state.nav.origin;
export const selectdestination =(state)=> state.nav.destination;
export const selecttravelTimeInformation =(state)=> state.nav.travelTimeInformation;

export default navSlice.reducer;
