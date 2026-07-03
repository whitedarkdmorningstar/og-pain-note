import { Platform, ToastAndroid } from "react-native";

// For web, you could use a library or just console.log
function webToast(message: string) {
  // Option 1: simple fallback
  alert(message);

  // Option 2: if using react-hot-toast
  // import { toast as hotToast } from "react-hot-toast";
  // hotToast(message);
}

export function toast(message: string) {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      30,
      0,
    );
  } else if (Platform.OS === "web") {
    webToast(message);
  } else {
    // iOS or other platforms
    console.log("Toast:", message);
  }
}
