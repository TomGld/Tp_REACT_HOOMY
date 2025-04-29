import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import { fetchSettingDataDetail, patchSettingData } from '../../store/settingData/settingDataSlice';
import { HexColorPicker } from 'react-colorful';

const Device = ({ settingData, groupdevices }) => {
  const dispatch = useDispatch();
  const [sliderValues, setSliderValues] = useState({});
  const settingDataList = groupdevices?.settingDatas || [];
  const deviceLabel = groupdevices?.device?.label;

  useEffect(() => {
    const initialSliderValues = {};
    settingDataList.forEach((data) => {
      if (data?.id) {
        dispatch(fetchSettingDataDetail(data.id));
        initialSliderValues[data.id] = data.data || 0;
      }
    });
    setSliderValues(initialSliderValues);
  }, [dispatch, settingDataList]);

  const handleSliderChange = (id, newValue) => {
    setSliderValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleChangeCommitted = (id, newValue) => {
    dispatch(patchSettingData(id, newValue));
  };


  const intToBoolean = (value) => {
    if (value === 1 || value === "1") return true;
    if (value === 0 || value === "0") return false;
    return null;
  };

  console.log('groupdevicessssss', groupdevices);
  console.log('settingDataList', settingDataList);
  return (
    <div className="device-container border-b border-gray-300 pb-4 mb-4">
      <div className="device-header flex items-center justify-between">
        <h4 className="text-lg font-semibold">{deviceLabel}</h4>
      </div>
      <div className="device-details text-sm text-gray-600">
        {settingDataList.map((data) => {
          const dataType = data?.settingType?.dataType?.dataType;
          if (dataType === '°C' || dataType === 'W' || dataType === '%' || dataType === 'dB') {
            return (
              <div key={data?.id} className="setting-data-item">
                <p>{data?.settingType?.labelKey} :</p>
                <div className="device-slider mt-2">
                  <Slider
                    size="small"
                    value={sliderValues[data?.id] || 0}
                    onChange={(event, newValue) => handleSliderChange(data?.id, newValue)}
                    onChangeCommitted={(event, newValue) =>
                      handleChangeCommitted(data?.id, newValue)
                    }
                    aria-label="Small"
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
            );
          }
          if (dataType === 'hexa') {
            return (
              <div key={data?.id} className="setting-data-item">
              <p>{data?.settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <HexColorPicker
                color={sliderValues[data?.id] || '#000000'}
                onChange={(newColor) => {
                  handleSliderChange(data?.id, newColor);
                  handleChangeCommitted(data?.id, newColor);
                }}
                />
              </div>
              </div>
            );
          }
          //Filtre switch
          if (dataType === 'On/Off') {
            return (
              <div key={data?.id} className="setting-data-item">
                <p>{data?.settingType?.labelKey} :</p>
                <div className="device-slider mt-2">
                  {console.log('switch 1', data)}
                  {(() => {
                    const rawValue = sliderValues[data?.id] !== undefined ? sliderValues[data?.id] : Number(data?.data);
                    const checked = intToBoolean(rawValue) ?? false;
                    return (
                      <Switch
                        checked={checked}
                        onChange={(checked) => {
                          const newValue = checked ? 1 : 0;
                          handleSliderChange(data?.id, newValue);
                          handleChangeCommitted(data?.id, newValue);
                        }}
                        onColor="#C2858C"
                        onHandleColor="#ac6a71"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={14}
                        width={36}
                        className="react-switch"
                        id={`switch-${data?.id}`}
                      />
                    );
                  })()}
                  {console.log('switch', (data?.data) === 1)}
                </div>
              </div>
            );
          }
        })}
        {/* TODO: Ajouter pour mettre les valeurs à 0 pour configurer. */}
      </div>
    </div>
  );
};

export default Device;