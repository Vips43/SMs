const DEVICE_ID_KEY = "sms_fcm_device_id";

export function getCreateDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export function getDeviceLabel() {
  const ua = navigator.userAgent;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  const platform = isMobile ? "Mobile PWA" : "Desktop PWA";

  if (/Edg/i.test(ua)) return `Edge (${platform})`;
  if (/Chrome/i.test(ua)) return `Chrome (${platform})`;
  if (/Firefox/i.test(ua)) return `Firefox (${platform})`;
  if (/Safari/i.test(ua)) return `Safari (${platform})`;
  return platform;
}
