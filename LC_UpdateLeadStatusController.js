({
  doInit: function (component, event, helper) {
    let action = component.get("c.updateField");
    action.setParams({
      recordId: component.get("v.recordId"),
    });

    action.setCallback(this, function (response) {
      let state = response.getState();

      if (state === "SUCCESS") {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success Message",
          message:
            "Status " +
            response.getReturnValue() +
            " has been successfully updated.",
          messageTemplate: "Record {0} created! See it {1}!",
          duration: " 10000",
          key: "info_alt",
          type: "success",
          mode: "pester",
        });
        toastEvent.fire();
        $A.get("e.force:refreshView").fire();
        $A.get("e.force:closeQuickAction").fire();
      } else {
        console.log("Failed with state: " + state);
      }
    });
    $A.enqueueAction(action);
  },
});
