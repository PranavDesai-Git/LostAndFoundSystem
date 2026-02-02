import { useState } from 'react';
import { motion } from 'framer-motion';
import { useItems } from '../context/ItemContext';
import Button from '../components/Button';
import Dropdown from './Dropdown';

const EditForm = ({ item, onClose }) => {
  const { updateItem } = useItems();
  const [status, setStatus] = useState(item.status.replace(/ /g, '_'));
  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      itemName: name,
      description: desc,
      status: status
    };

    updateItem(item.id, payload);
    onClose();
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      className="details-overlay"
    >
      <Button text="DISCARD [ESC]" variant="primary" onClick={onClose} />
      <div className="details-content">
        <h1 className="details-title">EDIT_RECORD</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '30px' }}>
          <div className="input-group">
            <label>ITEM NAME</label>
            <input type="text" className="search-bar" defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group">
            <label>STATUS</label>
            <Dropdown label="STATUS" options={['LOST', 'FOUND', 'FOUND_NOT_TAKEN']} selected={status} onSelect={setStatus} fullWidth />
          </div>
          <div className="input-group">
            <label>DESCRIPTION</label>
            <textarea className="search-bar" style={{ height: '150px' }} defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <Button text="SAVE CHANGES" type="submit" />
        </form>
      </div>
    </motion.div>
  );
};

export default EditForm;