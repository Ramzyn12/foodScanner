function getCurrentDateLocal() {
  const now = new Date(); // Creates a new Date object with the current date and time

  // Retrieves the year, month, and day from the Date object in local time
  const year = now.getFullYear(); // Get the full year (e.g., 2024)
  const month = now.getMonth() + 1; // Get month (0-11) so add 1 to normalize to 1-12
  const day = now.getDate(); // Get day of the month (1-31)

  // Construct the date string in 'YYYY-MM-DD' format
  const formattedMonth = month < 10 ? `0${month}` : month; // Ensures two digits
  const formattedDay = day < 10 ? `0${day}` : day; // Ensures two digits

  return `${year}-${formattedMonth}-${formattedDay}`;
}

module.exports = { getCurrentDateLocal };
