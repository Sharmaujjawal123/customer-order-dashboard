import React, { useEffect, useState } from 'react';

function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

 
  useEffect(() => {
    fetch('http://localhost:3000/customers')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Customer Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {loading && <p style={styles.loading}>Loading customers...</p>}
      {error && <p style={styles.error}>Error loading customers.</p>}
      {!loading && !error && filtered.length === 0 && search !== '' && (
        <p style={styles.error}>No matching customers found.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <p style={styles.summary}>Total Customers: {filtered.length}</p>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Order Count</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  summary: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  loading: {
    color: '#333',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

export default App;
