({
  doInit: function (cmp, event, helper) {},

  activeButton: function (cmp, event, helper) {
    let inputText = cmp.find("keyword").get("v.value");
    if (inputText != null) {
      cmp.set("v.isButtonActive", false);
    }
  },
  search: function (cmp, event, helper) {
    cmp.set("v.mycolumns", [
      {
        label: "Name",
        fieldName: "linkName",
        type: "url",
        sortable: true,
        typeAttributes: { label: { fieldName: "Name" }, target: "_blank" },
      },
      {
        label: "Stage",
        fieldName: "StageName",
        type: "picklist",
        sortable: true,
      },
      {
        label: "Amount",
        fieldName: "Amount",
        type: "currency",
        sortable: true,
        cellAttributes: { alignment: "left" },
      },
      {
        label: "Close Date",
        fieldName: "CloseDate",
        type: "date",
        sortable: true,
      },
    ]);
    let action = cmp.get("c.getOpportunities");
    let accId = cmp.get("v.recordId");
    action.setParams({
      accId: cmp.get("v.recordId"),
      myKeyword: cmp.find("keyword").get("v.value"),
    });
    action.setCallback(this, function (response) {
      let state = response.getState();
      if (state === "SUCCESS") {
        let records = response.getReturnValue();
        records.forEach(function (record) {
          record.linkName = "/" + record.Id;
        });
        cmp.set("v.mydata", records);
        helper.sortData(
          cmp,
          cmp.get("v.sortedBy"),
          cmp.get("v.sortedDirection")
        );
      }
    });
    $A.enqueueAction(action);
  },
  updateColumnSorting: function (cmp, event, helper) {
    let fieldName = event.getParam("fieldName");
    let sortDirection = event.getParam("sortDirection");
    cmp.set("v.sortedBy", fieldName);
    cmp.set("v.sortedDirection", sortDirection);
    helper.sortData(cmp, fieldName, sortDirection);
  },
});
