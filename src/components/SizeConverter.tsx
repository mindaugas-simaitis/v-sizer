import React, { useState, useEffect } from 'react';
import { regions, Region, sizeData, SizeMapping } from '../data/sizingData';
import './SizeConverter.css';

type Gender = 'men' | 'women';
type Step = 'region' | 'size' | 'save';

interface Profile {
  id: string;
  name: string;
  gender: Gender;
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  region: Region;
  overriddenSize?: string;
  suggestedSize: SizeMapping;
}

interface FormData {
  gender: Gender;
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  region: Region | '';
  profileName?: string;
  overriddenSize?: string;
}

const SizeConverter: React.FC = () => {
  const [step, setStep] = useState<Step>('region');
  const [formData, setFormData] = useState<FormData>({
    gender: 'women',
    height: '',
    weight: '',
    heightUnit: 'cm',
    weightUnit: 'kg',
    region: '',
  });
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Load profiles from localStorage on component mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem('sizeProfiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sizeProfiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.region && formData.height && formData.weight) {
      setStep('size');
    }
  };

  const handleSaveProfile = () => {
    const suggestedSize = getSuggestedSize();
    if (!suggestedSize || !formData.profileName || !formData.region) return;

    const newProfile: Profile = {
      id: Date.now().toString(),
      name: formData.profileName,
      gender: formData.gender,
      height: formData.height,
      weight: formData.weight,
      heightUnit: formData.heightUnit,
      weightUnit: formData.weightUnit,
      region: formData.region as Region,
      overriddenSize: formData.overriddenSize,
      suggestedSize,
    };

    setProfiles((prev) => [...prev, newProfile]);
    setStep('region');
    setFormData({
      gender: 'women',
      height: '',
      weight: '',
      heightUnit: 'cm',
      weightUnit: 'kg',
      region: '',
    });
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const getSuggestedSize = (): SizeMapping | null => {
    const sizes = sizeData[formData.gender];
    const bmi = calculateBMI(
      parseFloat(formData.height),
      parseFloat(formData.weight)
    );

    if (isNaN(bmi)) return null;

    if (bmi < 18.5) return sizes[0]; // XXS-XS
    if (bmi < 20) return sizes[1]; // XS-S
    if (bmi < 22) return sizes[2]; // S
    if (bmi < 25) return sizes[3]; // M
    if (bmi < 28) return sizes[4]; // L
    if (bmi < 31) return sizes[5]; // XL
    if (bmi < 34) return sizes[6]; // XXL
    return sizes[7]; // XXXL
  };

  const calculateBMI = (height: number, weight: number): number => {
    // Convert height to meters if in cm
    const heightInMeters =
      formData.heightUnit === 'cm' ? height / 100 : height * 0.3048;
    // Convert weight to kg if in lbs
    const weightInKg =
      formData.weightUnit === 'kg' ? weight : weight * 0.453592;
    return weightInKg / (heightInMeters * heightInMeters);
  };

  const getNearbyRegionalSizes = (
    currentSize: SizeMapping,
    region: Region
  ): string[] => {
    const allSizes = sizeData[formData.gender];
    const currentIndex = allSizes.findIndex((size) => size === currentSize);

    if (currentIndex === -1) return [];

    // Get 2 sizes smaller and 2 sizes larger
    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(allSizes.length - 1, currentIndex + 2);

    return allSizes.slice(startIndex, endIndex + 1).map((size) => size[region]);
  };

  if (step === 'region') {
    return (
      <div className='size-converter'>
        <h2>Size Guide</h2>
        <form onSubmit={handleRegionSubmit} className='region-form'>
          <div className='form-group'>
            <label htmlFor='gender'>Gender:</label>
            <div className='gender-buttons'>
              <button
                type='button'
                className={`gender-button ${
                  formData.gender === 'women' ? 'active' : ''
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: 'women' }))
                }
              >
                Women
              </button>
              <button
                type='button'
                className={`gender-button ${
                  formData.gender === 'men' ? 'active' : ''
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, gender: 'men' }))
                }
              >
                Men
              </button>
            </div>
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
                  placeholder={`Enter height in ${formData.heightUnit}`}
                  required
                />
                <select
                  name='heightUnit'
                  value={formData.heightUnit}
                  onChange={handleInputChange}
                >
                  <option value='cm'>cm</option>
                  <option value='ft'>ft</option>
                </select>
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
                  placeholder={`Enter weight in ${formData.weightUnit}`}
                  required
                />
                <select
                  name='weightUnit'
                  value={formData.weightUnit}
                  onChange={handleInputChange}
                >
                  <option value='kg'>kg</option>
                  <option value='lbs'>lbs</option>
                </select>
              </div>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='region'>Your Region:</label>
            <select
              id='region'
              name='region'
              value={formData.region}
              onChange={handleInputChange}
              required
            >
              <option value=''>Select your region</option>
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type='submit'
            className='next-button'
            disabled={!formData.region || !formData.height || !formData.weight}
          >
            Get Size Suggestion
          </button>
        </form>

        {profiles.length > 0 && (
          <div className='saved-profiles'>
            <h3>Saved Profiles</h3>
            <div className='profiles-grid'>
              {profiles.map((profile) => (
                <div key={profile.id} className='profile-card'>
                  <h4>{profile.name}</h4>
                  <p>
                    {profile.height} {profile.heightUnit} / {profile.weight}{' '}
                    {profile.weightUnit}
                  </p>
                  <p>
                    Size:{' '}
                    {profile.overriddenSize ||
                      profile.suggestedSize[profile.region]}
                  </p>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const suggestedSize = getSuggestedSize();

  if (step === 'size') {
    return (
      <div className='size-converter'>
        <h2>Your Size Suggestion</h2>
        <div className='size-results'>
          {suggestedSize ? (
            <div className='size-suggestion'>
              <div className='size-details'>
                <p className='descriptive-size'>
                  Descriptive Size: <strong>{suggestedSize.descriptive}</strong>
                </p>
                <p className='regional-size'>
                  {regions.find((r) => r.id === formData.region)?.label} Size:{' '}
                  <strong>
                    {formData.region ? suggestedSize[formData.region] : ''}
                  </strong>
                </p>
                <div className='size-override'>
                  <label>Adjust Size:</label>
                  <div className='size-options'>
                    {formData.region &&
                      getNearbyRegionalSizes(
                        suggestedSize,
                        formData.region
                      ).map((size) => (
                        <button
                          key={size}
                          type='button'
                          className={`size-option ${
                            formData.overriddenSize === size ? 'active' : ''
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              overriddenSize: size,
                            }))
                          }
                        >
                          {size}
                        </button>
                      ))}
                  </div>
                  {formData.overriddenSize && (
                    <p className='override-note'>
                      Selected size: <strong>{formData.overriddenSize}</strong>
                      <button
                        type='button'
                        className='reset-size'
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            overriddenSize: undefined,
                          }))
                        }
                      >
                        Reset to suggested
                      </button>
                    </p>
                  )}
                </div>
                <div className='measurements-summary'>
                  <p>Based on your measurements:</p>
                  <ul>
                    <li>
                      Height: {formData.height} {formData.heightUnit}
                    </li>
                    <li>
                      Weight: {formData.weight} {formData.weightUnit}
                    </li>
                  </ul>
                </div>
              </div>
              <div className='profile-name-input'>
                <label htmlFor='profileName'>Profile Name:</label>
                <input
                  type='text'
                  id='profileName'
                  name='profileName'
                  value={formData.profileName || ''}
                  onChange={handleInputChange}
                  placeholder='Enter profile name'
                  required
                />
              </div>
              <div className='button-group'>
                <button
                  type='button'
                  className='save-button'
                  onClick={handleSaveProfile}
                  disabled={!formData.profileName}
                >
                  Save Profile
                </button>
                <button
                  type='button'
                  className='back-button'
                  onClick={() => setStep('region')}
                >
                  Back to Measurements
                </button>
              </div>
            </div>
          ) : (
            <p>
              Unable to calculate size suggestion. Please check your
              measurements.
            </p>
          )}
        </div>

        {profiles.length > 0 && (
          <div className='saved-profiles'>
            <h3>Saved Profiles</h3>
            <div className='profiles-grid'>
              {profiles.map((profile) => (
                <div key={profile.id} className='profile-card'>
                  <h4>{profile.name}</h4>
                  <p>
                    {profile.height} {profile.heightUnit} / {profile.weight}{' '}
                    {profile.weightUnit}
                  </p>
                  <p>
                    Size:{' '}
                    {profile.overriddenSize ||
                      profile.suggestedSize[profile.region]}
                  </p>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handleDeleteProfile(profile.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SizeConverter;
