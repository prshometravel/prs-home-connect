import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szbgdhkwljxmzmtwfvdd.supabase.co';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY_HERE'; // Replace with your key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from('pros').insert([{
        name, email, phone, license, location, specialty, experience
      }]);
      if (error) setMessage('Error: ' + error.message);
      else {
        setMessage('Pro registered successfully!');
        setName(''); setEmail(''); setPhone('');
        setLicense(''); setLocation(''); setSpecialty(''); setExperience('');
      }
    } catch (err) {
      setMessage('Unexpected error');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif', padding: '0 15px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Pro Registration</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="License" value={license} onChange={(e) => setLicense(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="Specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>Register</button>
      </form>
      {message && <p style={{ textAlign: 'center', marginTop: '20px' }}>{message}</p>}
    </div>
  );
}

