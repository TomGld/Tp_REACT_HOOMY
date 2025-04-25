import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.vibe.loading;
const selectVibe = (state) => state.vibe.vibe;
const selectVibeDetail = (state) => state.vibe.vibeDetail;

const selectVibeData = createSelector(

    [selectLoading, selectVibe, selectVibeDetail],
    (loading, vibe, vibeDetail) => ({ loading, vibe, vibeDetail })

);
export default selectVibeData;