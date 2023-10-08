// https://github.com/notJust-dev/StepCounter/blob/main/App.tsx
// https://github.com/notJust-dev/StepCounter/blob/main/src/hooks/useHealthData.tsx
// https://www.youtube.com/watch?v=VVoXcr18mdo
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import {TimeRangeFilter} from 'react-native-health-connect/lib/typescript/types/base.types';

const useHealthData = (startTime: Date) => {
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);

  // Android - Health Connect
  const readSampleData = async () => {
    const isInitialized = await initialize();

    if (!isInitialized) {
      return;
    }

    // https://matinzd.github.io/react-native-health-connect/docs/permissions
    await requestPermission([
      {accessType: 'read', recordType: 'Steps'},
      {accessType: 'read', recordType: 'Distance'},
    ]);

    const timeRangeFilter: TimeRangeFilter = {
      operator: 'after',
      startTime: startTime.toISOString(),
    };

    // Steps
    const steps = await readRecords('Steps', {timeRangeFilter});
    const totalSteps = steps.reduce((sum, cur) => sum + cur.count, 0);
    setSteps(totalSteps);

    // Distance
    const distance = await readRecords('Distance', {timeRangeFilter});
    const totalDistance = distance.reduce(
      (sum, cur) => sum + cur.distance.inMeters,
      0,
    );
    setDistance(totalDistance);
  };

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    readSampleData();
  }, [startTime]);

  return {
    steps,
    distance,
  };
};

export default useHealthData;
