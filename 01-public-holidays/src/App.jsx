import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"

const API_BASE = "https://openholidaysapi.org"


function App() {

  const [country, setCountry] = useState("NL"); // pais x defecto
  const currentYear = new Date().getFullYear()

  const { data: countries, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"], // como si fuera cambio de dependencias en useEffect
    queryFn: () =>
      fetch(`${API_BASE}/Countries?languageIsoCode=en`).then(res => res.json())
  })

  // 🔹 Obtener festivos del país seleccionado
  const { data: holidays, isLoading: loadingHolidays } = useQuery({
    queryKey: ["holidays", country],
    queryFn: () =>
      fetch(
        `${API_BASE}/PublicHolidays?countryIsoCode=${country}&languageIsoCode=en&validFrom=${currentYear}-01-01&validTo=${currentYear}-12-31`
      ).then(res => res.json()),
    enabled: !!country, // pone a un truthy en true y a un falsy en false (si country esta en "" significa q es false y no se ejecuta)
  })
  return (
    <>
      <div className='paper' style={{ maxWidth: "600px", margin: "2rem auto", padding: "2rem" }}>
        <h1>Public Holidays {currentYear}</h1>
        {/* Dropdown países */}
        <div className="form-group">
          <label>Select Country</label>
          {loadingCountries ? (
            <p>Loading countries...</p>
          ) : (
            <select className="form-control" value={country} onChange={e => setCountry(e.target.value)}>
              {countries.map(c => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name[0]?.text}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Lista de festivos */}
        <div style={{ marginTop: "2rem" }}>
          {loadingHolidays ? (
            <p>Loading holidays...</p>
          ) : holidays?.length ? (
            <ul className="list">
              {holidays.map(h => (
                <li key={h.id} className="paper" style={{ marginBottom: "1rem", padding: "1rem" }}>
                  <strong>{h.name[0]?.text}</strong> — {h.startDate}
                </li>
              ))}
            </ul>
          ) : (
            <p>No holidays found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App
