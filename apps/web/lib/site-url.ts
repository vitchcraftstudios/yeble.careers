const DEFAULT_SITE_URL = "https://yeble.careers";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.APP_URL ||
    DEFAULT_SITE_URL;

  return configuredUrl.replace(/\/+$/, "");
}
