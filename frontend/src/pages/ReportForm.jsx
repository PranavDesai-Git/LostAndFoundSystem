import { useState } from 'react';
import { motion } from 'framer-motion';
import { useItems } from '../context/ItemContext';
import Button from '../components/Button';
import Dropdown from './Dropdown';

const ReportForm = ({ onClose }) => {
  const { addItem } = useItems();
  const [type, setType] = useState('LOST');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map to Java Entity fields: itemName, description, status
    const payload = {
      itemName: formData.name,
      description: `${formData.description} | Location: ${formData.location}`,
      status: type.replace(/, /g, '_') // Matches ItemStatus Enum (e.g., FOUND_NOT_TAKEN)
    };

    addItem(payload);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="details-overlay"
    >
      <Button text="CANCEL [ESC]" variant="primary" onClick={onClose} />
      <div className="details-content">
        <h1 className="details-title">REPORT_ITEM</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div className="input-group">
            <label style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '0.7rem' }}>ITEM NAME</label>
            <input
              type="text"
              className="search-bar"
              required
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="input-group">
              <label style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '0.7rem' }}>TYPE</label>
              <Dropdown label="TYPE" options={['LOST', 'FOUND', 'FOUND_NOT_TAKEN']} selected={type} onSelect={setType} fullWidth />
            </div>
            <div className="input-group">
              <label style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '0.7rem' }}>LOCATION</label>
              <input
                type="text"
                className="search-bar"
                required
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ fontFamily: '"Arial Black", sans-serif', fontSize: '0.7rem' }}>DESCRIPTION</label>
            <textarea
              className="search-bar"
              style={{ height: '150px', paddingTop: '15px', resize: 'none' }}
              required
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <Button text="SUBMIT REPORT" type="submit" />
        </form>
      </div>
    </motion.div>
  );
};

export default ReportForm;