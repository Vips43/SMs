export const dateFormat = (date) => {
  return {
    time: new Date(date).toLocaleTimeString(undefined, {
      minute: "2-digit",
      hour: "2-digit",
    }),
    date: new Date(date).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    fullDateAndTime: new Date(date).toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      minute: "2-digit",
      hour: "2-digit",
    }),
  };
};
