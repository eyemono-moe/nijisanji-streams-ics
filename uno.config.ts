import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: "Noto Sans JP",
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
});
