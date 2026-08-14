import * as migration_20260814_141037 from './20260814_141037';
import * as migration_20260814_144033 from './20260814_144033';
import * as migration_20260814_151439 from './20260814_151439';

export const migrations = [
  {
    up: migration_20260814_141037.up,
    down: migration_20260814_141037.down,
    name: '20260814_141037',
  },
  {
    up: migration_20260814_144033.up,
    down: migration_20260814_144033.down,
    name: '20260814_144033',
  },
  {
    up: migration_20260814_151439.up,
    down: migration_20260814_151439.down,
    name: '20260814_151439'
  },
];
