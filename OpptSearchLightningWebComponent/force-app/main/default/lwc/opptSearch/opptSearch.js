import { LightningElement,wire, api, track } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityController.getOpportunities';

const COLUMNS = [
    { label: 'Name', fieldName: 'recordLink', type: 'url', sortable:true, typeAttributes: { label: { fieldName: "Name" },tooltip:"Name",  target: "_blank" } },
    { label: 'Stage Name', fieldName: 'StageName', type: 'picklist', sortable:true },
    { label: 'Amount', fieldName: 'Amount', type: 'currency', cellAttributes:{alignment:'left'}, sortable:true },
    { label: 'Close Date', fieldName: 'CloseDate', type: 'date', sortable:true }
];

export default class opptSearch extends LightningElement {

columns = COLUMNS;
@api recordId;
error;  
@track oppList = [];  
@track searchKey = '';

  @wire(getOpportunities,{accountId: '$recordId',searchKey: '$searchKey'})  

  getOppList({ error, data }) {  
   if (data) {  
    var tempOppList = [];  
    for (var i = 0; i < data.length; i++) {  
     let tempRecord = Object.assign({}, data[i]); 
     tempRecord.recordLink = "/" + tempRecord.Id;  
     tempOppList.push(tempRecord);  
    }  
    this.oppList = tempOppList;  
    this.error = undefined;  
   } else if (error) {  
    this.error = error;  
    this.oppList = undefined;  
   }  
  }  

  get showRecords() {
    if (this.oppList) {
        if (this.oppList.length === 0 && this.searchKey!='') {
            return false;
        } else {
            return true;
        }
}
  }

  handleChange(event) {
    if(event.which == 13) {
    let searchKey = event.target.value;
    this.searchKey = searchKey;
    }
}

  onHandleSort( event ) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.oppList];
    cloneData.sort( this.sortBy( sortedBy, sortDirection === 'asc' ? 1 : -1 ) );
    this.oppList = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
    console.log(this.oppList);
}

sortBy( field, reverse, primer ) {

    const key = primer
        ? function( x ) {
              return primer(x[field]);
          }
        : function( x ) {
              return x[field];
          };
    return function( a, b ) {
        a = key(a);
        b = key(b);
        return reverse * ( ( a > b ) - ( b > a ) );
    };
}
    }