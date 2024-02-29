import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface Props {
    children: ReactNode;
}

interface Patient{
    id: string;
    patient_name: string;
}
interface ContextProps {
    darkMode: boolean;
    dataAdded: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    patientData : Patient[];
    setPatientData : Dispatch<SetStateAction<[]>>;
    setDataAdded: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: ContextProps = {
    darkMode: false,
    setDarkMode: () => {},
    patientData : [],
    setPatientData : () => {},
    dataAdded: true,
    setDataAdded: () => {}
};

export const PublicData = createContext<ContextProps>(defaultValue);

const GlobalState = ({ children }: Props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [patientData, setPatientData] = useState<[]>([])
    const [dataAdded, setDataAdded] = useState(true)

    return (
        <PublicData.Provider value={{ darkMode, setDarkMode, patientData, setPatientData, dataAdded, setDataAdded }}>
            {children}
        </PublicData.Provider>
    );
};

export default GlobalState;