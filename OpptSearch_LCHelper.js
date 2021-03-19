({
  sortData: function (cmp, fieldName, sortDirection) {
    let data = cmp.get("v.mydata");
    var reverse = sortDirection !== "asc";
    data.sort(this.sortBy(fieldName, reverse));
    cmp.set("v.mydata", data);
  },
  sortBy: function (field, reverse, primer) {
    var key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  },
});
