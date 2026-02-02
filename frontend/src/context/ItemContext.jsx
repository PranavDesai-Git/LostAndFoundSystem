import { createContext, useContext, useState, useEffect } from 'react';

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8080/api/items';

  // Map Java backend fields to Frontend names
  const mapFromBackend = (data) => data.map(item => ({
    id: item.id,
    name: item.itemName, // Mapped
    description: item.description,
    status: item.status.replace(/_/g, ', '), // e.g., FOUND_NOT_TAKEN -> FOUND, NOT TAKEN
    date: item.dateTime,
    postedBy: item.owner?.userName || 'ANONYMOUS' // Mapped
  }));

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(mapFromBackend(data));
    } catch (err) {
      setError("SYNC_ERROR");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem) => {
    // Map Frontend names back to Java Backend expectations
    const javaPayload = {
      itemName: newItem.name,
      description: newItem.description,
      status: newItem.status.replace(/, /g, '_'),
      dateTime: new Date().toISOString(),
      // In a real app, you'd send the owner_id here
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(javaPayload),
      });
      if (response.ok) fetchItems();
    } catch (err) {
      console.error("POST_FAILED");
    }
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error("DELETE_FAILED");
    }
  };

  useEffect(() => { fetchItems(); }, []);

  return (
    <ItemContext.Provider value={{ items, loading, error, addItem, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => useContext(ItemContext);