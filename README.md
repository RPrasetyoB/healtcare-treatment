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

###### Note : example of `.env` file for Back-end and Front-end are available on the `.env.example`

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
   open new terminal

   ```bash
   cd functions
   npm install
   npm start
   ```
   
   Wait until "Connected to Firestore database" appears in the terminal; then API will be ready to be consumed.

3. Set up Front-end:
   open another new terminal

   ```bash
   cd hosting
   npm install
   npm start
   ```

4. open browser and input url [http://localhost:5173](http://localhost:5173)
   
   Note : do not run "npm update" because of specific version in some library

## API documentation

- Postman documentation: [healthcare-API](https://documenter.getpostman.com/view/30790473/2sA2rB1NQA)

- End points: 
  
  | Functionality                                      | Route                           | Req.body                                                                                               |
  | -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------ |
  | Root                                               | GET: "/"                        | -                                                                                                      |
  | Add New patients, treatment, medication prescribed | POST: "/v1/treatment"           | patient_name, treatment_description, treatment_date (unix date), treatment_cost, medication_prescribed |
  | Get all patients                                   | GET: "/v1/treatment"            | -                                                                                                      |
  | Get treatment & medication history by patient_id   | GET: "/v1/treatment/patient_id" | -                                                                                                      |

## UI Documentation

#### Features

- **Input New Patient Data / Update Existing Patient Data**: Implement form validation where the Submit button remains disabled until validation passes.

- **Storing Treatment and Medication to Database**: Ensure seamless storage of treatment and medication details in the database.

- **Retrieving Patient Treatment History**: Allow users to access and review the treatment history of patients.

### Overview

- **Light Mode**: Provides a visually appealing interface with light color schemes for comfortable viewing.
  
  ![light](https://github.com/RPrasetyoB/healtcare-treatment/assets/129088807/bebdcf10-0d71-42ca-a283-2a54caab928f)
   <br>
- **Dark Mode**: Offers an alternative interface with dark color schemes for reduced eye strain, especially in low-light environments.
  <br>
  
  ![dark](https://github.com/RPrasetyoB/healtcare-treatment/assets/129088807/e07ecdf2-1628-4ce2-8533-925c97ae7e3a)

### API Integration

- Fetch API codes :

```ts
export const postTreatment = async (values: any) => {
    try {
        const response = await fetch(API_URL + "/v1/treatment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error occurred while submitting treatment data:", error);
        return error
    }
}

export const fetchPatientData = async () => {
    try {
        const response = await fetch(API_URL + "/v1/treatment", {
            method: "GET",
          });
        const data = await response.json()
        return data;
        
    } catch (error) {
        console.error("Error occurred while fetching patient data:", error);
        return error;
    }
}

export const fetchTreatmentData = async (selectedId: string | null) => {
    try {
        const response = await fetch(API_URL + `/v1/treatment/${selectedId}`, {
            method: "GET",
        });
        const data = await response.json()
        return data;        
    } catch (error) {
        console.error("Error occurred while fetching treatment data:", error);
        return error;
    }
}
```
