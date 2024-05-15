var picker = new Pikaday({
  field: document.getElementById('birthdate'),
  format: 'DD/MM/YYYY',
  toString: function(date, format) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return day + '/' + month + '/' + year;
  }
});
