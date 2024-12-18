import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recruitment:'临招:0分',
    end:'结局:0分',
    hidden:'隐藏:0分',
    event:'紧急:0分',
    other:{
        collections:'藏品:0分',
        settlement:'结算:0分'
    },
}



const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        updateRecruitment: ( state, action)=>{
            state.recruitment = action.payload
        },
        updateEnd:( state, action) => {
            state.end = action.payload
        },
        updateHidden:(state, action) => {
            state.hidden = action.payload
        },
        updateEvent:(state, action) => {
            state.event = action.payload
        },
        updateCollections:(state, action) => {
            state.other.collections = action.payload
        },
        updateSettlement:(state, action) => {
            state.other.settlement = action.payload
        },
    }
})

export const { updateRecruitment, updateEnd, updateHidden, updateEvent, updateOther, updateCollections, updateSettlement } = eventSlice.actions
export default eventSlice.reducer

