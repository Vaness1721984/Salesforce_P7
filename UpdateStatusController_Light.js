({
 onload: function(component, event, helper){
    },
    handleClick: function(component, event, helper){
    component.set("v.leadRecord.Status", "Contacted");
       component.find("leadRec").saveRecord($A.getCallback(function(saveResult) {
           if (saveResult.state === "SUCCESS") {
        } else {
            component.set("v.recordSaveError",'Unknown problem, state: ' + saveResult.state + ', error: ' + 
              JSON.stringify(saveResult.error));
        }
    }));
        
    $A.get("e.force:closeQuickAction").fire();  
    },
})