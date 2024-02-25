# Healtcare-treatment

This project is a full stack application for managing patient data, treatment records, and prescribed medications. It provides a user-friendly interface for inputting, storing, and retrieving patient-related information.

## Technologies Used

### Backend

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Firestore
- **Serverless Functions**: Firebase Functions (Back-end not deployed, but ready to deploy)

### Frontend

- **Language**: TypeScript
- **Framework**: React
- **Bundler**: Vite
- **UI Library**: Material-UI

###### Note : ".env" file for Back-end and Front-end are deliberately pushed to GitHub to make local testing easier

## Features

- **Patient Data Management**: Input and store patient information securely.
- **Treatment Records**: Record and manage treatment histories for each patient.
- **Medication Prescriptions**: Store prescribed medications for patients.

## Pre-requisite

- NodeJS version : v20.11.0

- Git version : 2.41.0

- (optional) Visual Studio code / any IDE

## Setup

1. Clone the repository:
   
   ```bash
   git clone https://github.com/RPrasetyoB/healtcare-treatment.git
   cd healtcare-treatment
   ```

2. Set up Back-end:
   
   ```bash
   cd functions
   npm install
   npm start
   ```
   Wait until "Connected to Firestore database" appears in the terminal; the API will then be ready to be consumed.

3. Set up Front-end:
   
   ```bash
   cd hosting
   npm install
   npm start
   ```

4. open browser and input url [http://localhost:5173](http://localhost:5173)

   Note : do not run "npm update" because of specific version in some library

## API documentation:

- Postman documentation: [healthcare-API](https://documenter.getpostman.com/view/30790473/2sA2rB1NQA)

- End points: 
  
  | Functionality                                      | Route                           | Req.body                                                                                               |
  | -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
  | Root                                               | GET: "/"                        | -                                                                                                      |
  | Add New patients, treatment, medication prescribed | POST: "/v1/treatment"           | patient_name, treatment_description, treatment_date (unix date), treatment_cost, medication_prescribed |
  | Get all patients                                   | GET: "/v1/treatment"            | -                                                                                                      |
  | Get treatment & medication history by patient_id   | GET: "/v1/treatment/patient_id" | -                                                                                                      |
