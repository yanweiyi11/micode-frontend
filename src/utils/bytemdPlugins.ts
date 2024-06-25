import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import math from "@bytemd/plugin-math";
import mediumZoom from "@bytemd/plugin-medium-zoom";

const bytemdPlugins = [
  gfm(),
  highlight(),
  breaks(),
  frontmatter(),
  gemoji(),
  math(),
  mediumZoom(),
  mediumZoom(),
];

export default bytemdPlugins;
