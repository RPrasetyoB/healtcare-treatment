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
        if (response.ok) {
            return true;
        } else {
            console.error("Failed to submit treatment data.");
            return false;
        }
    } catch (error) {
        console.error("Error occurred while submitting treatment data:", error);
        return false;
    }
}

export const fetchPatientData = async () => {
    try {
        const response = await fetch(API_URL + "/v1/treatment", {
            method: "GET",
          });
        if (response.ok) {
            return response;
        } else {
            console.error("Failed to fetch patient data.");
            return null;
        }
    } catch (error) {
        console.error("Error occurred while fetching patient data:", error);
        return null;
    }
}

export const fetchTreatmentData = async (selectedId: string | null) => {
    try {
        const response = await fetch(API_URL + `/v1/treatment/${selectedId}`, {
            method: "GET",
        });
        if (response.ok) {
            return response;
        } else {
            console.error("Failed to fetch treatment data.");
            return null;
        }
    } catch (error) {
        console.error("Error occurred while fetching treatment data:", error);
        return null;
    }
}