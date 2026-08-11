import { join } from "path";

export default {
  cacheDirectory: join(process.cwd(), ".cache", "puppeteer"),
  chrome: {
    skipDownload: false,
  },
};