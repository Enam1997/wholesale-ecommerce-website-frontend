const formatDate = (dateString) => {
  const date = new Date(dateString);

  const options = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export { formatDate };
