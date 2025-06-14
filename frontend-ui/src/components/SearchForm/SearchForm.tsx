import { useState } from "react";
import { api } from "../../services/api";
import { PatientCard } from "../PatientCard";
import type { Patient } from "../../types";

export const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await api.queryPatients({ text: query });

      if (response.errors) {
        setError(response.errors[0].message);
        setPatients([]);
      } else if (response.data?.patients?.data) {
        setPatients(response.data.patients.data);
      } else {
        setPatients([]);
      }
    } catch (error) {
      setError("Error connecting to the server");
      setPatients([]);
      console.error("Search error:", error);
    } finally {
      setLoading(false);
      setQuery("");
    }
  };

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Enter your query (e.g., show me all patients with last name Smith)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!loading && !error && hasSearched && patients.length === 0 && query && (
        <div className="no-results">
          No patients found matching your search criteria.
        </div>
      )}

      {!loading && (
        <div className="results">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};
