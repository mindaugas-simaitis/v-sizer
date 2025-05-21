import React, { useState, useEffect } from 'react';
import { sizeData, SizeMapping } from '../data/sizingData';
import { Profile } from '../types/profile';
import VintedDropdown from './VintedDropdown';
import './ProfileBuilder.css';

interface FormData {
  name: string;
  gender: 'men' | 'women';
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  selectedSize: SizeMapping | null;
}

const ProfileBuilder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: 'women',
    height: '',
    weight: '',
    heightUnit: 'cm',
    weightUnit: 'kg',
    selectedSize: null,
  });

  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const savedProfiles = localStorage.getItem('profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeSelect = (size: SizeMapping) => {
    setFormData((prev) => ({ ...prev, selectedSize: size }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedSize) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: formData.name,
      gender: formData.gender,
      measurements: {
        height: formData.height,
        weight: formData.weight,
        heightUnit: formData.heightUnit,
        weightUnit: formData.weightUnit,
      },
      selectedSize: formData.selectedSize,
      createdAt: new Date().toISOString(),
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));

    setFormData({
      name: '',
      gender: 'women',
      height: '',
      weight: '',
      heightUnit: 'cm',
      weightUnit: 'kg',
      selectedSize: null,
    });
  };

  const deleteProfile = (id: string) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem('profiles', JSON.stringify(updatedProfiles));
  };

  return (
    <div className='profile-builder'>
      <h2>Create Your Size Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='gender'>Gender:</label>
          <VintedDropdown
            label='Select Gender'
            options={[
              { label: 'Women', value: 'women' },
              { label: 'Men', value: 'men' },
            ]}
            value={formData.gender}
            onChange={(value) =>
              handleInputChange({
                target: { name: 'gender', value: value.toString() },
              } as any)
            }
          />
        </div>

        <div className='measurements-group'>
          <div className='form-group'>
            <label htmlFor='height'>Height:</label>
            <div className='input-with-unit'>
              <input
                type='number'
                id='height'
                name='height'
                value={formData.height}
                onChange={handleInputChange}
                required
              />
              <VintedDropdown
                label='Unit'
                options={[
                  { label: 'cm', value: 'cm' },
                  { label: 'ft', value: 'ft' },
                ]}
                value={formData.heightUnit}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: 'heightUnit', value: value.toString() },
                  } as any)
                }
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='weight'>Weight:</label>
            <div className='input-with-unit'>
              <input
                type='number'
                id='weight'
                name='weight'
                value={formData.weight}
                onChange={handleInputChange}
                required
              />
              <VintedDropdown
                label='Unit'
                options={[
                  { label: 'kg', value: 'kg' },
                  { label: 'lbs', value: 'lbs' },
                ]}
                value={formData.weightUnit}
                onChange={(value) =>
                  handleInputChange({
                    target: { name: 'weightUnit', value: value.toString() },
                  } as any)
                }
              />
            </div>
          </div>
        </div>

        <div className='table-container'>
          <table className='size-table'>
            <thead>
              <tr>
                <th>Descriptive Size</th>
                <th>US Size</th>
                <th>UK/AU Size</th>
                <th>EU Size</th>
                <th>IT Size</th>
                <th>JP Size</th>
                <th>BR Size</th>
                <th>RU Size</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {sizeData[formData.gender].map((size: SizeMapping) => (
                <tr
                  key={`${size.descriptive}-${size.us}`}
                  className={formData.selectedSize === size ? 'selected' : ''}
                  onClick={() => handleSizeSelect(size)}
                >
                  <td>{size.descriptive}</td>
                  <td>{size.us}</td>
                  <td>{size.uk_au}</td>
                  <td>{size.france_spain_portugal}</td>
                  <td>{size.italy}</td>
                  <td>{size.japan}</td>
                  <td>{size.brazil}</td>
                  <td>{size.russia}</td>
                  <td>
                    <button
                      type='button'
                      className={`select-button ${
                        formData.selectedSize === size ? 'selected' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSizeSelect(size);
                      }}
                    >
                      {formData.selectedSize === size ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type='submit'
          className='submit-button'
          disabled={!formData.selectedSize}
        >
          Save Profile
        </button>
      </form>

      <div className='saved-profiles'>
        <h3>Saved Profiles</h3>
        {profiles.map((profile) => (
          <div key={profile.id} className='profile-card'>
            <div className='profile-top-row'>
              <div className='profile-header'>
                <h4>{profile.name}</h4>
              </div>
              <div className='profile-measurements'>
                <div className='measurement'>
                  <span className='label'>Height:</span>
                  <span className='value'>
                    {profile.measurements.height}
                    {profile.measurements.heightUnit}
                  </span>
                </div>
                <div className='measurement'>
                  <span className='label'>Weight:</span>
                  <span className='value'>
                    {profile.measurements.weight}
                    {profile.measurements.weightUnit}
                  </span>
                </div>
              </div>
            </div>
            <div className='profile-bottom-row'>
              <div className='size-info'>
                <div className='market-info'>
                  <span className='market-label'>Size</span>
                  <span className='size-value'>
                    {profile.selectedSize.descriptive}
                  </span>
                </div>
              </div>
            </div>
            <button
              className='delete-button'
              onClick={() => deleteProfile(profile.id)}
              title='Delete profile'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileBuilder;
