import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import { patchSettingData } from '../../store/settingData/settingDataSlice';
import { HexColorPicker } from 'react-colorful';

const Device = ({ device, settingDatas }) => {
  const dispatch = useDispatch();
  const settingTypes = device?.settingTypes;
  const [sliderValues, setSliderValues] = useState({});
  
  console.log('device', device);
  console.log('settingData', settingDatas);


  // Initialiser les valeurs des sliders et récupérer les détails des données de configuration
  useEffect(() => {
    const initialSliderValues = {};
    settingDatas?.forEach((settingData) => {
      initialSliderValues[settingData?.id] = settingData?.data || 0;
    });
    setSliderValues(initialSliderValues);
  }, [dispatch]);

  // Gérer le changement de valeur du slider (mise à jour temporaire de l'état)
  const handleSliderChange = (id, newValue) => {
    setSliderValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  // Gérer la validation du changement de valeur du slider (dispatch vers le store)
  const handleChangeCommitted = (id, newValue) => {
    dispatch(patchSettingData(id, newValue));
  };

  // Convertir les valeurs entières en booléens pour le composant interrupteur
  const intToBoolean = (value) => {
    if (value === 1 || value === "1") return true;
    if (value === 0 || value === "0") return false;
    return null;
  };


  return (
    <>
      <p>{device.label}</p>
      
      {settingDatas?.map((settingData) => {

        console.log('settingDatas', settingData);

        const dataType = settingData?.settingType?.dataType?.dataType;

        // Render slider for numeric values
        if (dataType === '°C' || dataType === 'W' || dataType === '%' || dataType === 'dB') {
          return (
            <div key={settingData?.id} className="setting-data-item">
              <p>{settingData?.settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <Slider
                  size="small"
                  value={sliderValues[settingData?.id] || 0}
                  onChange={(event, newValue) => handleSliderChange(settingData?.id, newValue)}
                  onChangeCommitted={(event, newValue) =>
                    handleChangeCommitted(settingData?.id, newValue)
                  }
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </div>
            </div>
          );
        }

        // Render color picker for hexadecimal values
        if (dataType === 'HEXA') {
          return (
            <div key={settingData?.id} className="setting-data-item">
              <p>{settingData?.settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <HexColorPicker
                  color={sliderValues[settingData?.id] || '#000000'}
                  onChange={(newColor) => {
                    handleSliderChange(settingData?.id, newColor);
                    handleChangeCommitted(settingData?.id, newColor);
                  }}
                />
              </div>
            </div>
          );
        }

        // Render switch for On/Off values
        if (dataType === 'On/Off') {
          return (
            <div key={settingData?.id} className="setting-data-item">
              <p>{settingData?.settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                {(() => {
                  const rawValue = sliderValues[settingData?.id] !== undefined ? sliderValues[settingData?.id] : Number(settingData?.data);
                  const checked = intToBoolean(rawValue) ?? false;
                  return (
                    <Switch
                      checked={checked}
                      onChange={(checked) => {
                        const newValue = checked ? 1 : 0;
                        handleSliderChange(settingData?.id, newValue);
                        handleChangeCommitted(settingData?.id, newValue);
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
                      id={`switch-${settingData?.id}`}
                    />
                  );
                })()}
              </div>
            </div>
          );
        }

        return null; // 
      })}

    </>
  )
};

export default Device;