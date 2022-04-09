const { create } = require('xmlbuilder2');
const fs = require("fs");
let Client = require("ssh2-sftp-client");
require('dotenv').config();
const path = require('path');


const date = new Date();
const submissionDate = date.toISOString()
console.log(submissionDate);

const goAmlXmlGenerator = async (reporter, customer, data, sftpCredentials, localFolder) => {



  


const toPerson = {
  to_person: {         
    gender: customer.to_person_gender,
    first_name: customer.to_person_first_name,
    last_name: customer.to_person_last_name,
  }
};

const toAccount = {
  to_account: {         
    institution_name: customer.to_institution_name = "ISW",
    institution_code: customer.to_institution_code,
    non_bank_institution: customer.non_bank_institution=0,
    account: data.originatingEvent.toId ,
    account_name:customer.to_account_name

  }
};


const toEntity = {
  to_entity: {         
    name: data.originatingEvent.toId
  }
};

const reporterDetails = {

  rentity_id: reporter.reportingEntityId,
    // rentity_branch: customer.branch,
    submission_code: reporter.submissionCode,
    report_code: reporter.reportCode,
    // entity_reference: customer.entity_reference,
    // fiu_ref_number: customer.fiu_ref_number,
    submission_date: submissionDate,
    currency_code_local: reporter.localCurrencyCode,
    reporting_person: {
      gender: reporter.gender.substring(0,1),
      title: reporter.title,
      first_name: reporter.firstname,
      middle_name: reporter.middlename,
    
      last_name: reporter.lastname,
    
    },
  
}


//generate data from Individual to a Person
const goAmlIP = {};

//generate data from Individual to a Entity
const goAmlIE = {};




//generated data from individual to an Account
const goAmlIA = {
  report: {
    ...reporterDetails,
    reason: customer.reason,
    action: customer.action,
    transaction: [
      {
        transactionnumber: data.originatingEvent.transactionId,
        transaction_location: data.originatingEvent.accountAddress.addressLine1,
        transaction_description: data.originatingEvent.eventType,
        date_transaction: data.originatingEvent.eventTime,
        // teller: data.originatingEvent.instructedAgentId,
        // authorized: data.originatingEvent.counterpartyEntityId,
        transmode_code: customer.transmode_code,
        amount_local: data.originatingEvent.amount.value,
        t_from_my_client: {
          from_funds_code: customer.from_funds_code,
          from_person: {
            gender: customer.from_person_gender,
            title: customer.from_person_title,
            first_name: customer.from_person_first_name,
            middle_name: customer.from_person_middle_name,
            last_name: customer.from_person_last_name,
            birthdate: customer.from_person_birthdate,
            ssn: customer.nin,
          
            
            // phones: customer.phones,
            
            nationality1: customer.from_person_nationality1,
            residence: customer.from_person_country_code,
            phones: {
                  phone: [
                    {
                      tph_contact_type: customer.tph_contact_type,
                      tph_communication_type: customer.tph_communication_type,
                      tph_number: customer.workPhoneNumber,
                    }
                  ]
                },

            occupation: customer.occupation,
            identification: {
              type: customer.from_person_identification_type,
              number: customer.from_person_identification_number,
              issue_date: customer.from_person_identification_issue_date,
              issue_country: customer.from_person_identification_issue_country
            },
            source_of_wealth: customer.from_person_source_of_wealth
          },
          from_country: customer.from_person_country_code
        },
        t_to: {
          to_funds_code: customer.to_funds_code,
          ...toAccount,
          
          to_country: customer.to_country,
        },
        goods_services: {
          item: [
            {
              item_type: customer.item_type
            }
          ]
        },
        comments: customer.comments
      }
    ],
    report_indicators: {
      indicator: customer.indicator
    }
  }
};




const goAmlCMC = {};
const goAmlCMI = {};
const goAmlCA = {
  report: {
    ...reporterDetails,
    reason: customer.reason,
    action: customer.action,
    transaction: [
      {
        transactionnumber: data.originatingEvent.transactionId,
        transaction_location: data.originatingEvent.accountAddress.addressLine1,
        transaction_description: data.originatingEvent.eventType,
        date_transaction: data.originatingEvent.eventTime,
        teller: data.originatingEvent.instructedAgentId,
        authorized: data.originatingEvent.counterpartyEntityId,
        transmode_code: customer.transmode_code,
        amount_local: data.originatingEvent.amount.value,
        t_from_my_client: {
          from_funds_code: customer.from_funds_code,
          from_entity: {
            name: customer.tradingName,
            incorporation_legal_form: customer.incorporation_legal_form,
            incorporation_number:customer.incorporation_number,
            business: customer.business,
           
            phones: {
              phone: [
                {
                  tph_contact_type: customer.tph_contact_type,
                  tph_communication_type: customer.tph_communication_type,
                  tph_number: customer.workPhoneNumber,
                }
              ]
            },
            addresses: {
              address: [
                {
                  address_type: customer.tph_contact_type,
                  address: customer.address,
                  city: customer.city,
                  country_code: customer.country_code,
                },
                {
                  address_type: customer.tph_contact_type2,
                  address: customer.address,
                  city: customer.city,
                  country_code: customer.country_code
                }
              ]
            },
            email: customer.email,
            url: customer.url,
            incorporation_state: customer.incorporation_state,
            incorporation_country_code: customer.country_code,
            director_id : {
              gender: customer.gender.substring(0,1),
              title: customer.title,
              first_name: customer.first_name,
              middle_name: customer.middle_name,
              prefix: customer.prefix,
              last_name: customer.last_name,
              birthdate: customer.birthdate,
              birth_place: customer.birth_place,
              mothers_name: customer.mothers_name,
              alias: customer.alias,
              ssn: customer.ssn,
              
              nationality1: customer.nationality1,
              
              residence: customer.residence,
              phones: {
                phone: [
                  {
                    tph_contact_type: customer.tph_contact_type,
                    tph_communication_type: customer.tph_communication_type,
                    tph_number: customer.workPhoneNumber,
                  }
                ]
              },
              residence: customer.country_code,
              occupation: customer.occupation,
              identification: [
                {
                  type: customer.identification_type,
                  number: customer.identification_number,
                  issue_date: customer.identification_issue_date,
                  issued_by: customer.identification_issued_by,
                  issue_country: customer.identification_issue_country,
                  comments: customer.identification_comments
                }
              ],
              source_of_wealth: customer.from_person_source_of_wealth,
              role: customer.role




            },

          
            
            incorporation_date: customer.incorporation_date,
            
            
           
          },
          from_country: customer.from_person_country_code
        },
        t_to: {
          to_funds_code: customer.to_funds_code,
          ...toAccount,
          
          to_country: customer.to_country,
        },
        goods_services: {
          item: [
            {
              item_type: customer.item_type
            }
          ]
        },
        comments: customer.comments
      }
    ],
    report_indicators: {
      indicator: customer.indicator
    }
  }
};



  
const goAmlXml = 

{
    report: {
      rentity_id: customer.rentity_id,
      rentity_branch: customer.branch,
      submission_code: customer.submission_code,
      report_code: customer.report_code,
      entity_reference: customer.entity_reference,
      fiu_ref_number: customer.fiu_ref_number,
      submission_date: data.originatingEvent.eventTime,
      currency_code_local: data.originatingEvent.amount.currency,
      reporting_person: {
        gender: customer.gender.substring(0,1),
        title: customer.title,
        first_name: customer.first_name,
        middle_name: customer.middle_name,
        prefix: customer.prefix,
        last_name: customer.last_name,
        birthdate: customer.birthdate,
        birth_place: customer.birth_place,
        mothers_name: customer.mothers_name,
        alias: customer.alias,
        ssn: customer.ssn,
        passport_number: customer.passport_number,
        passport_country: customer.passport_country,
        id_number: customer.id_number,
        nationality1: customer.nationality1,
        nationality2: customer.nationality2,
        nationality3: customer.nationality3,
        residence: customer.residence,
        phones: {
          phone: [
            {
              tph_contact_type: customer.tph_contact_type,
              tph_communication_type: customer.tph_communication_type,
              tph_number: customer.workPhoneNumber,
            },
            {
              tph_contact_type: customer.tph_contact_type2,
              tph_communication_type: customer.tph_communication_type2,
              tph_number: customer.phoneNumber2
            },
            {
              tph_contact_type: customer.tph_contact_type3,
              tph_communication_type: customer.tph_communication_type3,
              tph_number: customer.phoneNumber3
            }
          ]
        },
        addresses: {
          address: [
            {
              address_type: customer.tph_contact_type,
              address: customer.address,
              city: customer.city,
              country_code: customer.country_code,
            },
            {
              address_type: customer.tph_contact_type2,
              address: customer.address,
              city: customer.city,
              country_code: customer.country_code
            }
          ]
        },
        email: customer.email,
        occupation: customer.occupation,
        employer_name: customer.employer_name,
        employer_address_id: {
          address_type: customer.employer_address_type,
          address: customer.employer_address,
          town: customer.employer_town,
          city: customer.employer_city,
          country_code: customer.employer_country_code,
          state: customer.employer_state
        },
        employer_phone_id: {
          tph_contact_type: customer.employer_tph_contact_type,
          tph_communication_type: customer.employer_tph_communication_type,
          tph_number: customer.employer_tph_number,
          tph_extension: customer.employer_tph_extension,
          comments: customer.employer_comments
        },
        identification: [
          {
            type: customer.identification_type,
            number: customer.identification_number,
            issue_date: customer.identification_issue_date,
            issued_by: customer.identification_issued_by,
            issue_country: customer.identification_issue_country,
            comments: customer.identification_comments
          }
        ],
        deceased: customer.deceased,
        date_deceased: customer.date_deceased,
        tax_number: customer.tax_number,
        tax_reg_number: customer.tax_reg_number,
        source_of_wealth: customer.source_of_wealth,
        comments: customer.repporting_person_comments
      },
      location: {
        address_type: customer.location_address_type,
        address: customer.location_address,
        town: customer.location_town,
        city: customer.location_city,
        zip: customer.location_zip,
        country_code: customer.location_country_code,
        state: customer.location_state,
        comments: customer.location_comments
      },
      reason: customer.reason,
      action: customer.action,
      transaction: [
        {
          transactionnumber: data.originatingEvent.transactionId,
          transaction_location: data.originatingEvent.accountAddress.addressLine1,
          transaction_description: data.originatingEvent.eventType,
          date_transaction: data.originatingEvent.eventTime,
          teller: data.originatingEvent.instructedAgentId,
          authorized: data.originatingEvent.counterpartyEntityId,
          transmode_code: customer.transmode_code,
          amount_local: data.originatingEvent.amount.value,
          t_from_my_client: {
            from_funds_code: customer.from_funds_code,
            from_person: {
              gender: customer.from_person_gender,
              title: customer.from_person_title,
              first_name: customer.from_person_first_name,
              last_name: customer.from_person_last_name,
              birthdate: customer.from_person_birthdate,
              ssn: customer.nin,
            
              
              // phones: customer.phones,
              
              nationality1: customer.from_person_nationality1,
              residence: customer.from_person_country_code,
              phones: '',
              occupation: customer.occupation,
              identification: {
                type: customer.from_person_identification_type,
                number: customer.from_person_identification_number,
                issue_date: customer.from_person_identification_issue_date,
                issue_country: customer.from_person_identification_issue_country
              },
              source_of_wealth: customer.from_person_source_of_wealth
            },
            from_country: customer.from_person_country_code
          },
          t_to: {
            to_funds_code: customer.to_funds_code,
            to_person: {
              gender: customer.to_person_gender,
              first_name: customer.to_person_first_name,
              last_name: customer.to_person_last_name,
            },
            to_country: customer.to_country,
          },
          goods_services: {
            item: [
              {
                item_type: customer.item_type
              }
            ]
          }
        }
      ],
      report_indicators: {
        indicator: customer.indicator
      }
    }
  };


  let goAmlXmlSelect = {};
  let clientName = {};

  if (customer.entity === "Individual") {
    goAmlXmlSelect = goAmlIA;
    clientName = customer.from_person_last_name+customer.from_person_first_name

  } else  {
    goAmlXmlSelect = goAmlCA;
    clientName = customer.tradingName;
  }
   




// const stringEventTime = data.eventTime.toString();

const d = new Date();

const ddForFile = (d.toISOString().slice(0, 10));

const filename = clientName+ddForFile+".xml";

const doc = create(goAmlXmlSelect);
const xml = doc.end({ prettyPrint: true });
// console.log(xml);

const logFile = '../../logsOut/SARLogs.txt';
const dirPath = path.join(__dirname, localFolder );

const filePath = path.join(dirPath,filename );


//cleanup file path before writing enable this for go-live.
// fs.readdir(dirPath, (err, files) => {
//   if (err) throw err;

//   for (const file of files) {
//       fs.unlink(path.join(dirPath, file), err =>{
//           if (err) throw err;
//       });
//   }
// });

// Write files

fs.writeFileSync(filePath,xml);

console.log(filePath);




const fileStorage = async (file, uploadFolder, fileName) => {
  let sftp = new Client();
  let result = "";
  return sftp.connect({
      host: sftpCredentials.HOST, 
      port: sftpCredentials.PORT,
      username: sftpCredentials.USERNAME,
      password: sftpCredentials.PASSWORD,
      path: sftpCredentials.PATH
    })
    .then(async () => {
     return sftp.put(await file, uploadFolder + fileName);
    })
    .then(data => {
      console.log(data, "The file " + filename + " has been uploaded successfully");
      
      // fs.writeFileSync(logPath, "The file " + filename + " has been uploaded successfully");

     return result = "success";
    })
    .catch(err => {
      console.log(err, "An error occured while uploading to SFTP : ");
      
      // fs.writeFileSync(logPath, "An error occured while uploading to SFTP : ");
     return result = "FTP_ERROR";
    });
};

// console.log(CRUSHFTP_USERNAME);
return await fileStorage(filePath, sftpCredentials.PATH, filename);

}

// goAmlXmlGenerator(customer,data,sftpCredentials);

module.exports = goAmlXmlGenerator;