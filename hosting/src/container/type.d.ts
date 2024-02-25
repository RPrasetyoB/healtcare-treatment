interface Treatment {
  id: string;
  patient_id: string;
  treatment_cost: string;
  treatment_date: Date; // Assuming you've converted treatment_date to a Date object
  treatment_description: string;
  medication_description: string;
  patient_name: string; // Add this line
}