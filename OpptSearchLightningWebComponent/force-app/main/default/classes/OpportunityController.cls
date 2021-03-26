public inherited sharing class OpportunityController {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(String accountId, String searchKey) {
      String  key = '%' + searchKey + '%';
      List<Opportunity> oppListSelect = new List<Opportunity>();
        oppListSelect = [
            SELECT Id,Name, StageName, Amount, CloseDate
            FROM Opportunity
          WHERE  AccountId = :accountId
       AND Name LIKE :key 
            WITH SECURITY_ENFORCED
            ORDER BY Name ASC
        ];
        return oppListSelect;
    }
}

