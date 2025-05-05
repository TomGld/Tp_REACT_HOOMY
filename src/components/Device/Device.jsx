import React, { useEffect, useState } from 'react';
import { Slider } from '@mui/material';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import { patchSettingData, postSettingData } from '../../store/settingData/settingDataSlice';
import { HexColorPicker } from 'react-colorful';

const Device = ({ device, settingDatas, vibeId }) => {
  const dispatch = useDispatch();
  const settingTypes = device?.settingTypes;
  const [sliderValues, setSliderValues] = useState({});

  // Initialiser les valeurs des sliders et récupérer les détails des données de configuration
  useEffect(() => {
    const initialSliderValues = {};
    if (settingDatas?.length > 0) {
      settingDatas.forEach((settingData) => {
        initialSliderValues[settingData?.id] = settingData?.data || 0;
      });
    } else {
      // Si aucun settingData, initialiser avec des valeurs par défaut
      settingTypes?.forEach((settingType) => {
        const defaultValue = getDefaultValue(settingType?.dataType?.dataType);
        const newSetting = {
          id: `temp-${settingType?.id}`, // ID temporaire
          settingTypeId: settingType.id,
          vibeId: vibeId,
          data: defaultValue,
        };
        initialSliderValues[newSetting.id] = defaultValue;

        // Effectuer un POST automatique pour initialiser les paramètres
        dispatch(postSettingData(device.id, settingType.id, defaultValue));
      });
    }
    setSliderValues(initialSliderValues);
  }, [dispatch, settingDatas, settingTypes, device.id]);

  // Fonction pour obtenir une valeur par défaut en fonction du type de données
  const getDefaultValue = (dataType) => {
    switch (dataType) {
      case '°C':
      case 'W':
      case '%':
      case 'dB':
        return 0; // Valeur numérique par défaut
      case 'HEXA':
        return '#000000'; // Couleur par défaut
      case 'On/Off':
        return 0; // État par défaut (Off)
      default:
        return null;
    }
  };

  // Gérer le changement de valeur du slider (mise à jour temporaire de l'état)
  const handleSliderChange = (id, newValue) => {
    setSliderValues((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  // Gérer la validation du changement de valeur du slider (dispatch vers le store)
  const handleChangeCommitted = (id, newValue) => {

    if (typeof id !== 'string') {
      id = String(id); // Convertir en chaîne si nécessaire
    }

    if (id.startsWith('temp-')) {
      // Extraire uniquement la partie numérique après "temp-"
      const settingTypeId = id.split('-')[1]; // Récupère id dans "temp-id"

      if (!settingTypeId) {
        console.error('Invalid temp ID format:', id);
        return;
      }

      // Appeler postSettingData avec les valeurs attendues
      dispatch(postSettingData(device.id, settingTypeId, newValue, vibeId));
    } else {
      dispatch(patchSettingData(id, newValue));
    }
  };

  // Convertir les valeurs entières en booléens pour le composant interrupteur
  const intToBoolean = (value) => {
    if (value === 1 || value === '1') return true;
    if (value === 0 || value === '0') return false;
    return null;
  };

  return (
    <div className="device-container">
      <p className="text-lg font-medium text-gray-700 mb-4">{device.label}</p>

      {settingTypes?.map((settingType) => {
        const settingData = settingDatas?.find((data) => data.settingType.id === settingType.id);
        const dataType = settingType?.dataType?.dataType;
        const id = settingData?.id || `temp-${settingType.id}`;
        const value = sliderValues[id] || getDefaultValue(dataType);

        if (dataType === '°C' || dataType === 'W' || dataType === '%' || dataType === 'dB') {
          return (
            <div key={id} className="setting-data-item mb-4">
              <p className="text-sm font-semibold text-gray-600">{settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <Slider
                  size="small"
                  value={value}
                  onChange={(event, newValue) => handleSliderChange(id, newValue)}
                  onChangeCommitted={(event, newValue) => handleChangeCommitted(id, newValue)}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  className="text-blue-500"
                />
              </div>
            </div>
          );
        }

        if (dataType === 'HEXA') {
          return (
            <div key={id} className="setting-data-item mb-4">
              <p className="text-sm font-semibold text-gray-600">{settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <HexColorPicker
                  color={value}
                  onChange={(newColor) => {
                    handleSliderChange(id, newColor);
                    handleChangeCommitted(id, newColor);
                  }}
                  className="rounded-md shadow-md"
                />
              </div>
            </div>
          );
        }

        if (dataType === 'On/Off') {
          const checked = intToBoolean(value) ?? false;
          return (
            <div key={id} className="setting-data-item mb-4">
              <p className="text-sm font-semibold text-gray-600">{settingType?.labelKey} :</p>
              <div className="device-slider mt-2">
                <Switch
                  checked={checked}
                  onChange={(checked) => {
                    const newValue = checked ? 1 : 0;
                    handleSliderChange(id, newValue);
                    handleChangeCommitted(id, newValue);
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
                  id={`switch-${id}`}
                />
              </div>
            );
          }

          if (dataType === 'On/Off') {
            const checked = intToBoolean(value) ?? false;
            return (
              <div key={id} className="setting-data-item">
                <p className="text-sm text-gray-600">{settingType?.labelKey} :</p>
                <div className="device-slider mt-2">
                  <Switch
                    checked={checked}
                    onChange={(checked) => {
                      const newValue = checked ? 1 : 0;
                      handleSliderChange(id, newValue);
                      handleChangeCommitted(id, newValue);
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
                    id={`switch-${id}`}
                  />
                </div>
              </div>
            );
          }

        return null;
      })}

    </div>
  );
};

export default Device;