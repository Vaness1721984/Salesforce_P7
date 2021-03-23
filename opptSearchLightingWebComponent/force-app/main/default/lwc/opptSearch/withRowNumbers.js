import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';

const columns = [
    { label: 'Name', fieldName: 'linkName' , type: 'url'},
    { label: 'Stage', fieldName: 'StageName', type: 'picklist' },
    { label: 'Amount', fieldName: 'Amount', type: 'currency' },
    { label: 'Close Date', fieldName: 'closeDate', type: 'date' },
];

export default class BasicDatatable extends LightningElement {
    data = [];
    columns = columns;
    rowOffset = 0;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        this.data = await fetchDataHelper({ amountOfRecords: 100 });
    }

    increaseRowOffset() {
        this.rowOffset += 100;
    }
}
