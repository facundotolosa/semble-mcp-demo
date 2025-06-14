import type { Patient } from "../../types";

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <div className="patient-card">
      <h2>{patient.fullName}</h2>
      <div className="patient-info">
        <div>
          <p className="label">Email:</p>
          <p>{patient.email}</p>
        </div>
        <div>
          <p className="label">Date of Birth:</p>
          <p>{new Date(patient.dob).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="label">Status:</p>
          <p>{patient.status}</p>
        </div>
        <div>
          <p className="label">Occupation:</p>
          <p>{patient.occupation}</p>
        </div>
      </div>
    </div>
  );
};
