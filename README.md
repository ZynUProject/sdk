# @zynu/sdk

Official JavaScript/TypeScript SDK for the ZynU video platform API.

![npm](https://img.shields.io/npm/v/@zynu/sdk)
![license](https://img.shields.io/badge/license-MIT-blue)
![build](https://img.shields.io/badge/build-passing-brightgreen)

## Installation

```bash
npm install @zynu/sdk
```

## Quick Start

```typescript
import { ZynuClient } from "@zynu/sdk";

const zynu = new ZynuClient({ apiKey: "zynu_your_api_key" });

const trending = await zynu.videos.trending(10);
const stats    = await zynu.analytics.channelSummary("30d");
const creators = await zynu.users.search("gaming");
```

## Resources

| Resource | Methods |
|---|---|
| `zynu.videos` | `list` `get` `create` `update` `delete` `getAnalytics` `trending` |
| `zynu.users` | `get` `me` `subscribers` `subscribe` `unsubscribe` `search` |
| `zynu.analytics` | `channelSummary` `dailyMetrics` `trafficSources` `topVideos` |

## License

MIT © ZynU
