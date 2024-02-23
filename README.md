# Healtcare-treatment

This project is a full stack application for managing patient data, treatment records, and prescribed medications. It provides a user-friendly interface for inputting, storing, and retrieving patient-related information.

## Technologies Used

### Backend

- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Firestore
- **Serverless Functions**: Firebase Functions

### Frontend

- **Language**: TypeScript
- **Framework**: React
- **Bundler**: Vite
- **UI Library**: Material-UI

## Features

- **Patient Data Management**: Input and store patient information securely.
- **Treatment Records**: Record and manage treatment histories for each patient.
- **Medication Prescriptions**: Store prescribed medications for patients.

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

3. Set up Front-end:
   
   ```bash
   cd hosting
   npm install
   npm start
   ```
   open browser and input url  http://localhost:5173

## API documentation:

- Postman documentation: [healthcare-API](https://documenter.getpostman.com/view/30790473/2sA2rB1NQA)

- Endpoints: 
  
  | Endpoint                                           | Route                           | Req.body                                                                                   | Response status    |
  | -------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------ | ------------------ |
  | Root                                               | GET: "/"                        | -                                                                                          | 200, 500           |
  | Add New patients, treatment, medication prescribed | POST: "/v1/treatment"           | patient_name, treatment_description, treatment_date, treatment_cost, medication_prescribed | 200, 201, 500      |
  | Get all patients                                   | GET: "/v1/treatment"            | -                                                                                          | 200, 201, 500      |
  | Get treatment & medication history by patient_id   | GET: "/v1/treatment/patient_id" | -                                                                                          | 200, 201, 404, 500 |
