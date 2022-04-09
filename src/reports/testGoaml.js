const goAmlXmlGenerator = require ("./generateGoaml");

const reporter = {

  reportingEntityId: 628,
    submissionCode: "E",
    reportCode: "SAR",
    localCurrencyCode: "NGN",
    gender: "M",
    title: "Mr.",
    firstname: "Chinedu",
    middlename: "Olalekan",
    lastname: "Sule"
};



const customer = {
    entity: "Organization",
    industry: "Airlines and Air Carriers (Not Elsewhere Classified)",
    occupation: "Education,Training&Library",
    product: "Daily",
    country: "Burkina Faso",
    nigerianState: "Ogun",
    mediumOfOnboarding: "Phone",
    ownership: "Trust",
    sanctionScreening: "No match",
    PEP: "True Match",
    accountAgentFIBranchId: "32434",
    accountAgentId: "4334",
    accountCloseDate: "2021-12-03",
    accountEntityId: "334",
    accountId: "2020337334",
    accountNumber: "2020337334",
    accountOpenDate: "2021-12-06",
    accountType: "Current",
    bankVerificationNumber: "291383232",
    cardIssueDate: "2021-12-03",
    channel: "web",
    customerType: "Individual",
    direction: "NA",
    eddReportUrl: "",
    email: "kuro.etele@gmail.com",
    eventId: "123442",
    eventTime: "2021-12-03T15:58:16.814Z",
    eventType: "updateDetails",
    gender: "M",
    identityDocument: "Driver License",
    industryOfBusiness: "Financial Institution",
    initiatingPartyId: "333",
    jobTitle: "jobTitle_1",
    kycCompleted: false,
    kycLevel: "1",
    kycScore: 0,
    kycScoreDescription: "kycScoreDescription_1",
    kycScoreType: "kycScoreType_1",
    legalStatus: false,
    loanGuarantor: "Etele",
    locationId: "001",
    msgStatus: "Testing",
    schemaVersion: 1,
    session: {},
    sourceOfFunds: "202133842",
    tenantId: "001",
    toFIBranchId: "toFIBranchId_1",
    tradingName: "MaduGlobal",
    updateReason: "updateReason_1",
    updateType: "updateType_1",
    userId: "218",
    verificationResult: "Success",
    verificationType: {},
    workPhoneNumber: "2348038294767",
    rentity_id: 1234,
    rentity_branch: null,
    submission_code: "E",
    report_code: "SAR",
    entity_reference: null,
    fiu_ref_number: null,
    title: "title",
    first_name: "Gbenga",
    middle_name: null,
    prefix: null,
    last_name: "Bankole",
    birthdate: "2022-01-17T11:27:33.604Z",
    birth_place: null,
    mothers_name: null,
    alias: null,
    ssn: 122233223,
    passport_number: null,
    passport_country: null,
    id_number: null,
    nationality1: "NG",
    nationality2: null,
    nationality3: null,
    residence: null,
    tph_contact_type: "P",
    tph_communication_type: "M",
    tph_country_prefix: null,
    tph_contact_type2: "P",
    tph_communication_type2: "P",
    tph_contact_type3: "P",
    tph_communication_type3: "P",
    phoneNumber2: "12345678901",
    phoneNumber3: "12345678901",
    address: "1 Nigeria Road",
    city: "Lagos",
    country_code: "NG",
    employer_name: null,
    employer_phone_id: null,
    employer_address_type: "B",
    employer_address: "Employer close, lagos",
    employer_town: null,
    employer_city: "Lagos",
    employer_country_code: "NG",
    employer_state: null,
    employer_tph_contact_type: "B",
    employer_tph_communication_type: "L",
    employer_tph_number: "23456784",
    employer_tph_extension: null,
    employer_comments: null,
    identification_type: "A",
    identification_number: "12345678",
    identification_issue_date: "2022-01-17T11:27:33.604Z",
    identification_issued_by: null,
    identification_issue_country: "NG",
    identification_comments: null,
    identification_expiry_date: null,
    deceased: null,
    date_deceased: null,
    tax_number: null,
    tax_reg_number: null,
    source_of_wealth: "source_of_wealth",
    repporting_person_comments: null,
    location_address_type: "P",
    location_address: "7 Nigeria Street",
    location_town: null,
    location_city: "Lagos",
    location_zip: null,
    location_country_code: "NG",
    location_state: null,
    location_comments: null,
    reason: null,
    action: null,
    transmode_code: "C",
    from_funds_code: "B",
    from_person_gender: "M",
    from_person_title: "Mr",
    from_person_first_name: "James",
    from_person_last_name: "John",
    from_person_birthdate: "2000-01-17T11:27:33.604Z",
    from_person_nationality1: "NG",
    from_person_country_code: "NG",
    from_person_occupation: "Education,Training&Library",
    from_person_identification_type: "A",
    from_person_identification_number: "12345678",
    from_person_identification_issue_date: "2022-01-17T11:27:33.604Z",
    from_person_identification_issue_country: "NG",
    from_person_source_of_wealth: "source of wealth",
    to_funds_code: "B",
    to_person_gender: "M",
    to_person_first_name: "Barry",
    to_person_last_name: "John",
    to_country: "NG",
    item_type: "S",
    indicator: "ILA1",
    // to_institution_name : "Basic Bank",
    to_institution_code : "BBB",
    non_bank_institution : 0,
    to_account_name: "MaduCorp",
  

incorporation_legal_form : "A",
incorporation_number : 112233445,
business : "Farming",
url: "www.test.com",
incorporation_state: "Lagos",
incorporation_date : "2022-01-17T11:27:37.337Z",
reporter_title : "Mr",
reporter_first_name: "Reporter",
reporter_last_name: "Fraud",
reporter_nationality1: "NG",
reporter_gender:"F",
role:"A"
  }


  const data = 
{
    jsonVersion: 3,
    processorId: "proc",
    originatingEvent: {
      accountAddress: {
        addressLine1: "addressLine1_1",
        country: "NG",
        townName: "Lagos"
      },
      accountAgentId: "123",
      accountEntityId: "accountEntityId_1",
      accountId: "accountId_1",
      amount: {
        currency: "NGN",
        value: 65000
      },
      cardEntityId: "123FT3",
      counterpartyEntityId: "counterpartyEntityId_1",
      counterpartyId: "counterpartyId_1",
      counterpartyName: {},
      direction: "direction_1",
      eventId: "eventId_1",
      eventTime: "2022-01-17T11:27:33.604Z",
      eventType: "paymentNRT",
      instructedAgentId: "instructedAgentId_1",
      instructingAgentId: "instructingAgentId_1",
      msgStatus: "msgStatus_1",
      msgType: "msgType_1",
      numberOfTransactions: 0,
      paymentFrequency: "paymentFrequency_1",
      paymentMethod: "paymentMethod_1",
      schemaVersion: 1,
      serviceLevelCode: "serviceLevelCode_1",
      settlementClearingSystemCode: "settlementClearingSystemCode_1",
      settlementDate: "2022-01-17",
      settlementMethod: "settlementMethod_1",
      tenantId: "AML_TEST",
      toId: "toId_1",
      transactionId: "transactionId_1",
      _metadata: {
        systemEventId: "metadata-3887-tuU6yh4d",
        receivedTime: "2022-01-17T11:27:34Z",
        eventTime: "2022-01-17T11:27:33.604Z",
        eventId: "eventId_1",
        eventType: "paymentNRT",
        tenantId: "AML_TEST",
        execution: {
          expectResponse: false
        },
        searchable: {
          accountEntityId: "accountEntityId_1",
          counterpartyEntityId: "counterpartyEntityId_1",
          cardEntityId: "123FT3",
          accountAddress_addressLine1: "addressLine1_1",
          counterpartyId: "counterpartyId_1",
          settlementDate: "2022-01-17",
          transactionId: "transactionId_1"
        },
        entities: {
          COUNTERPARTY: [
            "counterpartyEntityId_1"
          ],
          ACCOUNT: [
            "accountEntityId_1"
          ],
          CARD: [
            "123FT3"
          ]
        }
      }
    },
    outputTime: "2022-01-17T11:27:37.337Z",
    entities: [
      {
        entityType: "CARD",
        entityId: "123FT3",
        tenantId: "AML_TEST",
        overallScore: {
          overallScore: null
        },
        models: [
          {
            modelId: "businessrules",
            score: null,
            confidence: null,
            tags: []
          }
        ],
        outputTags: [
          {
            tag: "_tag",
            values: [
              "SAR"
            ]
          }
        ],
        riskStatus: "review",
        configGroups: [
          {
            type: "global",
            triggeredRules: [
              "Suspicious_Activity"
            ],
            aggregators: [
              {
                aggregatorId: "Rule: Suspicious_Activity",
                scores: {
                  rules: [
                    {
                      ruleId: "Suspicious_Activity",
                      score: 1
                    }
                  ]
                },
                aggregateScore: 1,
                matchedBound: 1,
                outputTags: [
                  {
                    tag: "_tag",
                    values: [
                      "SAR"
                    ]
                  }
                ],
                suppressedTags: [],
                alert: true,
                suppressAlert: false
              }
            ]
          }
        ]
      }
    ],
    versions: {
      modelGraph: 0,
      configGroups: [
        {
          type: "global",
          version: "2"
        }
      ]
    }

}

const sftpCredentials = {

    HOST : "192.168.100.169",
   
    PORT : "22",
   
    USERNAME : "dev_admin",
   
    PASSWORD : "AnpTest001$",
  
    PATH: "/home/dev_admin/SFTP/"
   
   }

  
   const localFolder = '../../data_Out';

   console.log('before')



 goAmlXmlGenerator (reporter, customer, data, sftpCredentials, localFolder)






//generateReport();


