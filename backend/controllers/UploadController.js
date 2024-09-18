const fs = require('fs');
const csv = require('csv-parser');
const Enterprise = require('../models/Enterprise'); // Adjust the path as needed
const Address = require('../models/Address'); 
const Establishment = require('../models/Establishment');
const Activity = require('../models/Activity'); 
const Denomination = require('../models/Denomination');
const Contact = require('../models/Contact'); 
const Code = require('../models/Code');
const Branch = require('../models/Branch');


const parseDate = (dateString) => {
    if (!dateString) {
      return null;
    }
  
    // Try parsing the date in various formats (adjust based on your actual date format)
    const date = new Date(dateString);
    return isNaN(date) ? null : date;
  };



// upload enterprises

exports.uploadFirst10Enterprises = async (req, res) => {
  const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/enterprise.csv"; // Adjust this path
  const results = [];
  let isFirstLine = true;

  try {
    // Read the CSV file
    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          if (isFirstLine) {
            isFirstLine = false;
            return; // Skip the header row
          }
          results.push(data);
          if (results.length === 1000) {
            // Stop reading after 10 rows (11 including header)
            stream.destroy();
            resolve();
          }
        })
        .on('end', () => {
          if (results.length < 1000) {
            resolve(); // In case the file has fewer than 10 rows
          }
        })
        .on('error', reject);
    });

    // Format and validate the data
    const formattedData = results.map(row => ({
      EnterpriseNumber: row.EnterpriseNumber,
      Status: row.Status,
      JuridicalSituation: row.JuridicalSituation,
      TypeOfEnterprise: row.TypeOfEnterprise,
      JuridicalForm: row.JuridicalForm,
      JuridicalFormCAC: row.JuridicalFormCAC || 'N/A', // Handle empty fields
      startDate: new Date(row.StartDate.split('-').reverse().join('-')) // Convert DD-MM-YYYY to YYYY-MM-DD
    }));

    // Insert the data into the database
    await Enterprise.insertMany(formattedData);

    res.status(200).json({ 
      message: 'Enterprises uploaded successfully', 
      count: formattedData.length 
    });
  } catch (error) {
    console.error('Error uploading enterprises:', error);
    res.status(500).json({ 
      message: 'Failed to upload enterprises', 
      error: error.message 
    });
  }
};

// upload addresses
exports.uploadFirst100Addresses = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/address.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => ({
        EntityNumber: row.EntityNumber,
        TypeOfAddress: row.TypeOfAddress,
        CountryNL: row.CountryNL,
        CountryFR: row.CountryFR,
        Zipcode: row.Zipcode,
        MunicipalityNL: row.MunicipalityNL,
        MunicipalityFR: row.MunicipalityFR,
        StreetNL: row.StreetNL,
        StreetFR: row.StreetFR,
        HouseNumber: row.HouseNumber,
        Box: row.Box,
        ExtraAddressInfo: row.ExtraAddressInfo,
        DateStrikingOff: parseDate(row.DateStrikingOff) ,
      }));
  
      // Insert the data into the database
      await Address.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Addresses uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading addresses:', error);
      res.status(500).json({ 
        message: 'Failed to upload addresses', 
        error: error.message 
      });
    }
  };

  // upload establishments
  exports.uploadFirst100Establishments = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/establishment.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => {
        // Parse the date, handling both formats: DD/MM/YYYY and DD-MM-YYYY
        const dateParts = row.StartDate.split(/[/-]/);
        const startDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  
        return {
          EstablishmentNumber: row.EstablishmentNumber,
          StartDate: startDate,
          EnterpriseNumber: row.EnterpriseNumber
        };
      });
  
      // Insert the data into the database
      await Establishment.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Establishments uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading establishments:', error);
      res.status(500).json({ 
        message: 'Failed to upload establishments', 
        error: error.message 
      });
    }
  };

  //upload activity
  exports.uploadFirst100Activities = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/activity.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => ({
        EntityNumber: row.EntityNumber,
        ActivityGroup: row.ActivityGroup,
        NaceVersion: row.NaceVersion,
        NaceCode: row.NaceCode,
        Classification: row.Classification
      }));
  
      // Insert the data into the database
      await Activity.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Activities uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading activities:', error);
      res.status(500).json({ 
        message: 'Failed to upload activities', 
        error: error.message 
      });
    }
  };

  // upload denomination
  exports.uploadFirst100Denominations = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/denomination.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => ({
        EntityNumber: row.EntityNumber,
        Language: row.Language,
        TypeOfDenomination: row.TypeOfDenomination,
        Denomination: row.Denomination
      }));
  
      // Insert the data into the database
      await Denomination.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Denominations uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading denominations:', error);
      res.status(500).json({ 
        message: 'Failed to upload denominations', 
        error: error.message 
      });
    }
  };

  // upload contact
  exports.uploadFirst100Contacts = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/contact.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv({
            headers: ['EntityNumber', 'EntityContact', 'ContactType', 'Value'],
            skipLines: 0
          }))
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row if it exists
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => ({
        EntityNumber: row.EntityNumber,
        EntityContact: row.EntityContact,
        ContactType: row.ContactType,
        Value: row.Value
      }));
  
      // Insert the data into the database
      await Contact.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Contacts uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading contacts:', error);
      res.status(500).json({ 
        message: 'Failed to upload contacts', 
        error: error.message 
      });
    }
  };

  // upload code
  exports.uploadFirst100Codes = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/code.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => ({
        Category: row.Category,
        Code: row.Code,
        Language: row.Language,
        Description: row.Description
      }));
  
      // Insert the data into the database
      await Code.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Codes uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading codes:', error);
      res.status(500).json({ 
        message: 'Failed to upload codes', 
        error: error.message 
      });
    }
  }; 

  // upload branch
  exports.uploadFirst100Branches = async (req, res) => {
    const filePath = "C:/Users/farez/OneDrive/Documents/Master 1/Semaine 13/branch.csv"; // Adjust this path
    const results = [];
    let isFirstLine = true;
  
    try {
      // Read the CSV file
      await new Promise((resolve, reject) => {
        const stream = fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => {
            if (isFirstLine) {
              isFirstLine = false;
              return; // Skip the header row
            }
            results.push(data);
            if (results.length === 10000) {
              // Stop reading after 100 rows (101 including header)
              stream.destroy();
              resolve();
            }
          })
          .on('end', () => {
            if (results.length < 10000) {
              resolve(); // In case the file has fewer than 100 rows
            }
          })
          .on('error', reject);
      });
  
      // Format and validate the data
      const formattedData = results.map(row => {
        // Parse the date, handling both formats: DD/MM/YYYY and DD-MM-YYYY
        const dateParts = row.StartDate.split(/[/-]/);
        const startDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  
        return {
          Id: row.Id,
          StartDate: startDate,
          EnterpriseNumber: row.EnterpriseNumber
        };
      });
  
      // Insert the data into the database
      await Branch.insertMany(formattedData);
  
      res.status(200).json({ 
        message: 'Branches uploaded successfully', 
        count: formattedData.length 
      });
    } catch (error) {
      console.error('Error uploading branches:', error);
      res.status(500).json({ 
        message: 'Failed to upload branches', 
        error: error.message 
      });
    }
  };