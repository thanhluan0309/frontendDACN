import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
export const createNotification = (type, Message) => {
  switch (type) {
    case "info":
      NotificationManager.info(Message);
      break;
    case "success":
      NotificationManager.success(Message);
      break;
    case "warning":
      NotificationManager.warning(Message);
      break;
    case "error":
      NotificationManager.error(Message);
      break;
    default:
      break;
  }
};
