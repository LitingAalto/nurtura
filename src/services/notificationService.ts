export const notificationService = {
  requestPermission: async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  },

  showNotification: (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      return new Notification(title, options);
    }
    return null;
  },

  scheduleNotification: (reminder: {
    title: string;
    time: Date;
    type: string;
  }) => {
    const now = new Date();
    const reminderTime = new Date(reminder.time);
    const delay = reminderTime.getTime() - now.getTime();

    if (delay > 0) {
      setTimeout(() => {
        notificationService.showNotification(reminder.title, {
          body: `It's time for ${reminder.type}!`,
          icon: '/icon.png'
        });
      }, delay);
    }
  }
};