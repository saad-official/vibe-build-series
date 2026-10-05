import { Config } from "@remotion/cli/config";

// 1280x720 H.264 at CRF 23 keeps each landing-page video well under 6 MB.
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(90);
Config.setCodec("h264");
Config.setCrf(23);
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
