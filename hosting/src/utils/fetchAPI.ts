/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "./url";


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