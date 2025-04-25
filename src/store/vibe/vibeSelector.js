import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.vibe.loading;
const selectVibe = (state) => state.vibe.vibe;


const selectVibeData = createSelector(

    [selectLoading, selectVibe],
    (loading, vibe) => ({ loading, vibe })

);
export default selectVibeData;