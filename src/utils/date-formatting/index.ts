export const dateFormatByMonth = (date: Date): string => {
  const month = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentabr",
    "oktabr",
    "noyabr",
    "dekabr",
  ];
  const year = date.getFullYear();
  return `${date.getDate()?.toString().padStart(2, "0")} ${
    month[date.getMonth()]
  }, ${year}-yil`;
};

export const dateFormat = (date: Date, separator: string = "."): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return day + separator + month + separator + year;
};

export const secondsFormat = ($seconds: number) => {
  if (!$seconds) return "0:00";
  let hours: string | number = Math.floor($seconds / 3600);
  let minutes: string | number = Math.floor(($seconds - hours * 3600) / 60);
  let seconds: string | number = $seconds - hours * 3600 - minutes * 60;
  let template = "";

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (+hours > 0) {
    template += `${hours}:`;
  }
  template += `${minutes}:${seconds}`;
  return template;
};

export const timeSince = (date: Date, limitDay: number) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1 && !limitDay) {
    return `${Math.floor(interval)} yil`;
  }
  interval = seconds / 2592000;
  if (interval > 1 && !limitDay) {
    return `${Math.floor(interval)} oy`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (interval > limitDay) return dateFormat(date);
    return `${Math.floor(interval)} kun`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} soat`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} daqiqa`;
  }
  return `${Math.floor(seconds)} soniya`;
};
export const formatDate = (dateStr: string): string => {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const date = new Date(dateStr);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
