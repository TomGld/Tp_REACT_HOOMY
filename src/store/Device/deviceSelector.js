import { createSelector } from "@reduxjs/toolkit";

const selectLoading = (state) => state.devices.loading;
const selectDevices = (state) => state.devices.devices;


const selectDeviceData = createSelector(
    [
        selectLoading, selectDevices],
    (loading, devices) => ({loading, devices})
);

export default selectDeviceData;