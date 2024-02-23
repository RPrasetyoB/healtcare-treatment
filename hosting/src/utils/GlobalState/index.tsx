import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface Props {
    children: ReactNode;
}
interface ContextProps {
    darkMode: boolean;
    setDarkMode: Dispatch<SetStateAction<boolean>>;
    patientData : [];
    setPatientData : Dispatch<SetStateAction<[]>>;
}

const defaultValue: ContextProps = {
    darkMode: true,
    setDarkMode: () => {},
    patientData : [],
    setPatientData : () => {}
};

export const PublicData = createContext<ContextProps>(defaultValue);

const GlobalState = ({ children }: Props) => {
    const [darkMode, setDarkMode] = useState(false);
    const [patientData, setPatientData] = useState<[]>([])

    return (
        <PublicData.Provider value={{ darkMode, setDarkMode, patientData, setPatientData }}>
            {children}
        </PublicData.Provider>
    );
};

export default GlobalState;