import {useEffect, useState} from 'react';
// import assetsStorage from '../external/storage/assetsStorage';

const useAssets = () => {
  const [sportImages, setSportImages] = useState([] as string[]);

  const readSportAssets = async () => {
    // const assets = assetsStorage.getPicturesForChallenges();
    setSportImages([]);
  };

  useEffect(() => {
    readSportAssets();
  }, []);

  return {
    sportImages,
  };
};

export default useAssets;
