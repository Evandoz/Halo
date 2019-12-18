import mock from "./mock";

import "./data/data-list/index.js";

// Apps
// import "./data/apps/index.js";

mock.onAny().passThrough(); // forwards the matched request over network
