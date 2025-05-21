import React, { useState, useEffect } from 'react';
import { regions, Region, RegionInfo } from '../data/sizeMappings';
import { sizeData, SizeMapping } from '../data/sizingData';
import VintedDropdown from './VintedDropdown';
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
  displayRegion?: Region;
}

interface FormData {
  gender: Gender;
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  region: Region | '';
  profileName: string;
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
    profileName: '',
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
    if (
      formData.region &&
      formData.height &&
      formData.weight &&
      formData.profileName.trim()
    ) {
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
      profileName: '',
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

    // Adjust BMI ranges based on gender
    if (formData.gender === 'women') {
      if (bmi < 18.5) return sizes[0]; // XXS
      if (bmi < 20) return sizes[1]; // XS
      if (bmi < 22) return sizes[2]; // S
      if (bmi < 25) return sizes[3]; // M
      if (bmi < 28) return sizes[4]; // L
      if (bmi < 31) return sizes[5]; // XL
      if (bmi < 34) return sizes[6]; // XXL
      if (bmi < 37) return sizes[7]; // XXXL
      return sizes[8]; // XXXXL
    } else {
      if (bmi < 18.5) return sizes[0]; // XS
      if (bmi < 20) return sizes[1]; // S
      if (bmi < 25) return sizes[2]; // M
      if (bmi < 28) return sizes[3]; // L
      if (bmi < 31) return sizes[4]; // XL
      if (bmi < 34) return sizes[5]; // XXL
      return sizes[6]; // 3XL
    }
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
  ): Array<{ label: string; value: string }> => {
    const allSizes = sizeData[formData.gender];
    const currentIndex = allSizes.findIndex((size) => size === currentSize);

    if (currentIndex === -1) return [];

    // Get 2 sizes smaller and 2 sizes larger
    const startIndex = Math.max(0, currentIndex - 2);
    const endIndex = Math.min(allSizes.length - 1, currentIndex + 2);

    return allSizes.slice(startIndex, endIndex + 1).map((size) => ({
      label: `${size.global} (${size[region]})`,
      value: size[region],
    }));
  };

  const rotateRegion = (profile: Profile) => {
    const genderRegions = regions[profile.gender];
    const currentRegionIndex = genderRegions.findIndex(
      (r) => r.id === (profile.displayRegion || profile.region)
    );
    const nextRegionIndex = (currentRegionIndex + 1) % genderRegions.length;
    const nextRegion = genderRegions[nextRegionIndex].id as Region;

    setProfiles((prev) =>
      prev.map((p) =>
        p.id === profile.id ? { ...p, displayRegion: nextRegion } : p
      )
    );
  };

  const getDisplaySize = (profile: Profile): string => {
    const region = profile.displayRegion || profile.region;
    return profile.overriddenSize || profile.suggestedSize[region];
  };

  const getRegionLabel = (regionId: Region, gender: Gender): string => {
    const genderRegions = regions[gender];
    return (
      genderRegions.find((r: RegionInfo) => r.id === regionId)?.label || ''
    );
  };

  if (step === 'region') {
    return (
      <div className='size-converter'>
        <h2>Size Guide</h2>
        <form onSubmit={handleRegionSubmit} className='region-form'>
          <div className='form-group profile-name-group'>
            <label htmlFor='profileName'>Profile Name:</label>
            <input
              type='text'
              id='profileName'
              name='profileName'
              value={formData.profileName}
              onChange={handleInputChange}
              placeholder='Enter profile name'
              required
              className='profile-name-input'
            />
          </div>

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
                  placeholder={`Enter height`}
                  required
                />
                <VintedDropdown
                  label=''
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
                  placeholder={`Enter weight`}
                  required
                />
                <VintedDropdown
                  label=''
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

          <div className='form-group'>
            <label htmlFor='region'>Your Region:</label>
            <VintedDropdown
              label='Select Region'
              options={regions[formData.gender].map((region) => ({
                label: region.label,
                value: region.id,
              }))}
              value={formData.region}
              onChange={(value) =>
                handleInputChange({
                  target: { name: 'region', value: value.toString() },
                } as any)
              }
            />
          </div>

          <button
            type='submit'
            className='next-button'
            disabled={
              !formData.region ||
              !formData.height ||
              !formData.weight ||
              !formData.profileName.trim()
            }
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
                  <div className='profile-top-row'>
                    <div className='profile-header'>
                      <h4>{profile.name}</h4>
                    </div>
                    <div className='profile-measurements'>
                      <div className='measurement'>
                        <span className='label'>Height:</span>
                        <span className='value'>
                          {profile.height} {profile.heightUnit}
                        </span>
                      </div>
                      <div className='measurement'>
                        <span className='label'>Weight:</span>
                        <span className='value'>
                          {profile.weight} {profile.weightUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='profile-bottom-row'>
                    <div className='size-info'>
                      <div className='market-info'>
                        <span className='market-label'>
                          {getRegionLabel(
                            profile.displayRegion || profile.region,
                            profile.gender
                          )}
                        </span>
                        <span className='size-value'>
                          {getDisplaySize(profile)}
                        </span>
                      </div>
                      <button
                        type='button'
                        className='rotate-size-button'
                        onClick={() => rotateRegion(profile)}
                        title='Click to see size in different regions'
                      >
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z'
                            fill='currentColor'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handleDeleteProfile(profile.id)}
                    title='Delete profile'
                  >
                    ×
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
        <div className='size-results'>
          {suggestedSize ? (
            <div className='size-suggestion'>
              <div className='profile-name'>
                <span className='label'>Profile</span>
                <span className='value'>{formData.profileName}</span>
              </div>

              <div className='size-details'>
                <div className='size-row'>
                  <span className='label'>Descriptive Size</span>
                  <span className='value highlight'>
                    {suggestedSize.descriptive}
                  </span>
                </div>
                <div className='size-row'>
                  <span className='label'>
                    {getRegionLabel(formData.region as Region, formData.gender)}
                  </span>
                  <span className='value highlight'>
                    {formData.region ? suggestedSize[formData.region] : ''}
                  </span>
                </div>
              </div>

              <div className='size-override'>
                <div className='size-options'>
                  {formData.region &&
                    getNearbyRegionalSizes(suggestedSize, formData.region).map(
                      (size) => (
                        <button
                          key={size.value}
                          type='button'
                          className={`size-option ${
                            formData.overriddenSize === size.value
                              ? 'active'
                              : ''
                          } ${
                            size.value === suggestedSize[formData.region]
                              ? 'recommended'
                              : ''
                          }`}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              overriddenSize: size.value,
                            }))
                          }
                        >
                          <span className='size-label'>{size.label}</span>
                          {size.value === suggestedSize[formData.region] && (
                            <span className='size-note'>Recommended</span>
                          )}
                          {formData.overriddenSize === size.value && (
                            <span className='size-note'>Selected</span>
                          )}
                        </button>
                      )
                    )}
                </div>
                {formData.overriddenSize && (
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
                )}
              </div>

              <div className='measurements-summary'>
                <div className='measurement-row'>
                  <span className='label'>Height</span>
                  <span className='value'>
                    {formData.height} {formData.heightUnit}
                  </span>
                </div>
                <div className='measurement-row'>
                  <span className='label'>Weight</span>
                  <span className='value'>
                    {formData.weight} {formData.weightUnit}
                  </span>
                </div>
              </div>

              <div className='button-group'>
                <button
                  type='button'
                  className='back-button'
                  onClick={() => setStep('region')}
                >
                  Back
                </button>
                <button
                  type='button'
                  className='save-button'
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          ) : (
            <p className='error-message'>
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
                  <div className='profile-top-row'>
                    <div className='profile-header'>
                      <h4>{profile.name}</h4>
                    </div>
                    <div className='profile-measurements'>
                      <div className='measurement'>
                        <span className='label'>Height:</span>
                        <span className='value'>
                          {profile.height} {profile.heightUnit}
                        </span>
                      </div>
                      <div className='measurement'>
                        <span className='label'>Weight:</span>
                        <span className='value'>
                          {profile.weight} {profile.weightUnit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='profile-bottom-row'>
                    <div className='size-info'>
                      <div className='market-info'>
                        <span className='market-label'>
                          {getRegionLabel(
                            profile.displayRegion || profile.region,
                            profile.gender
                          )}
                        </span>
                        <span className='size-value'>
                          {getDisplaySize(profile)}
                        </span>
                      </div>
                      <button
                        type='button'
                        className='rotate-size-button'
                        onClick={() => rotateRegion(profile)}
                        title='Click to see size in different regions'
                      >
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 16 16'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0.01 3.58 0.01 8C0.01 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z'
                            fill='currentColor'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type='button'
                    className='delete-button'
                    onClick={() => handleDeleteProfile(profile.id)}
                    title='Delete profile'
                  >
                    ×
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
