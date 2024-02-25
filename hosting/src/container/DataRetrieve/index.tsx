/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { API_URL } from "../../utils/url";
import { PublicData } from "../../utils/GlobalState";
import styles from "./data.module.scss";

const DataRetrieve = ()=> {
  const { patientData, setPatientData, dataAdded } = useContext(PublicData);
  const [treatment, setTreatment] = useState<Treatment[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchPatient = async () => {
    try {
      const response = await fetch(API_URL + "/v1/treatment", {
        method: "GET",
      });
      if (response?.ok) {
        const data = await response.json();
        setPatientData(data.data);
        console.log("treatment", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTreatment = async () => {
    try {
      const response = await fetch(API_URL + `/v1/treatment/${selectedId}`, {
        method: "GET",
      });
      if (response?.ok) {
        const data = await response.json();
        console.log("treatment", data);
        // Process the treatments and medications
        const treatmentDetails = data.data.treatments.map((treatment: any) => {
          // Determine the type of treatment_date and convert it to a JavaScript Date object
          let treatmentDate;
          if (typeof treatment.treatment_date === "number") {
            // If treatment_date is a Unix timestamp, convert it to a Date object
            treatmentDate = new Date(treatment.treatment_date * 1000);
          } else if (
            treatment.treatment_date &&
            typeof treatment.treatment_date === "object"
          ) {
            // If treatment_date is a Firestore Timestamp object, convert it to a Date object
            treatmentDate = new Date(treatment.treatment_date._seconds * 1000);
          }

          return {
            ...treatment,
            treatment_description:
              treatment.treatment_description?.join(", ") ?? "",
            treatment_date: treatmentDate,
            treatment_cost: parseInt(treatment.treatment_cost, 10),
            patient_name: data.data.patient.patient_name, // Include patient's name
          };
        });

        // Process medication descriptions
        const medicationDescriptions = data.data.medications
          .map(
            (medication: any) =>
              medication.medication_description?.join(", ") ?? ""
          )
          .join(", ");

        // Combine treatment details with medication descriptions
        const combinedDetails = treatmentDetails.map((detail: Treatment) => ({
          ...detail,
          medication_description: medicationDescriptions,
        }));

        setTreatment(combinedDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [dataAdded]);

  useEffect(() => {
    if (selectedId) {
      fetchTreatment();
    }
  }, [selectedId]);

  const handleDetail = (id: string) => {
    setSelectedId(id);
    setOpenModal(true);
  };

  const columns: GridColDef[] = [
    { field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "patient_name",
      headerName: "Patient Name",
      align: "left",
      headerAlign: "left",
      width: 200,
    },
    {
      field: "history",
      headerName: "History",
      width: 100,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: params => (
        <div>
          <Button
            variant="outlined"
            onClick={() => handleDetail(params.row.id)}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  const columns2: GridColDef[] = [
    {
      field: "treatment_date",
      headerName: "Date",
      align: "left",
      headerAlign: "left",
      width: 150,
      valueFormatter: (params) => {
        // Check if the value is a Date object
        if (params.value instanceof Date) {
          // Convert the Date object to a string in ISO format
          const dateString = params.value.toISOString();
          // Slice the first  16 characters
          return dateString.slice(0,  10);
        } else if (typeof params.value === 'string') {
          // If the value is already a string, slice it directly
          return params.value.slice(0,  10);
        } else {
          // If the value is neither a Date object nor a string, return it as is
          return params.value;
        }
      }
    },
    {
      field: "treatment_description",
      headerName: "Treatments",
      width: 200,
    },
    {
      field: "medication_description",
      headerName: "Medications",
      width: 200,
    },
    {
      field: "treatment_cost",
      headerName: "Cost",
      width: 120,
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography variant="h5" className={styles.title}>Patient Treatment History</Typography>
      <div className={styles.dataContainer}>
        <DataGrid rows={patientData} columns={columns} disableRowSelectionOnClick sx={{ padding: 2 ,border: 1 }}/>
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xl">
          <DialogTitle>
            {treatment[0]?.patient_name}'s treatment histories
          </DialogTitle>
          <DialogContent>
            <DataGrid rows={treatment} columns={columns2} getRowHeight={() => 'auto'}/>
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
}


export default DataRetrieve