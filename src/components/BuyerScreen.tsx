import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuyerScreen.css';
import screen2 from '../assets/screen2.PNG';
import lastScreen from '../assets/last.png';

type SizeMapping = {
  descriptive: string;
  [key: string]: string;
};

interface Profile {
  id: string;
  name: string;
  gender: 'men' | 'women';
  height: string;
  weight: string;
  heightUnit: 'cm' | 'ft';
  weightUnit: 'kg' | 'lbs';
  region: string;
  suggestedSize: SizeMapping;
}

interface ProfileState {
  profiles: Profile[];
  selectedProfile: Profile | null;
  currentSizeKeys: Record<string, string>;
  showDropdown: boolean;
}

const BuyerScreen: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ProfileState>({
    profiles: [],
    selectedProfile: null,
    currentSizeKeys: {},
    showDropdown: false,
  });

  useEffect(() => {
    const savedProfiles = localStorage.getItem('sizeProfiles');
    if (savedProfiles) {
      try {
        const loadedProfiles = JSON.parse(savedProfiles) as Profile[];
        const initialSizeKeys = loadedProfiles.reduce<Record<string, string>>(
          (acc, profile) => {
            acc[profile.id] =
              Object.keys(profile.suggestedSize)[0] || 'descriptive';
            return acc;
          },
          {}
        );
        setState((prev: ProfileState) => ({
          ...prev,
          profiles: loadedProfiles,
          currentSizeKeys: initialSizeKeys,
        }));
      } catch (error) {
        console.error('Error parsing profiles:', error);
      }
    }
  }, []);

  const handleSizeGuideClick = () => {
    navigate('/v-sizer');
  };

  const handleScreenClick = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 20 && x <= 80 && y >= 400 && y <= 440) {
      handleSizeGuideClick();
    } else {
      setState((prev: ProfileState) => ({
        ...prev,
        showDropdown: !prev.showDropdown,
      }));
    }
  };

  const handleProfileSelect = (profile: Profile) => {
    setState((prev: ProfileState) => ({
      ...prev,
      selectedProfile: profile,
      showDropdown: false,
    }));
  };

  const handleBackClick = () => {
    setState((prev: ProfileState) => ({ ...prev, selectedProfile: null }));
  };

  const rotateSize = (
    profileId: string,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const profile = state.profiles.find((p: Profile) => p.id === profileId);
    if (!profile) return;

    const sizeKeys = Object.keys(profile.suggestedSize);
    const currentIndex = sizeKeys.indexOf(state.currentSizeKeys[profileId]);
    const nextIndex = (currentIndex + 1) % sizeKeys.length;

    setState((prev: ProfileState) => ({
      ...prev,
      currentSizeKeys: {
        ...prev.currentSizeKeys,
        [profileId]: sizeKeys[nextIndex],
      },
    }));
  };

  const formatSizeLabel = (profile: Profile, sizeKey: string) => {
    const sizeValue = profile.suggestedSize[sizeKey];
    const marketName =
      sizeKey === 'descriptive' ? '' : ` (${sizeKey.toUpperCase()})`;
    return `${sizeValue}${marketName}`;
  };

  return (
    <div className='buyer-screen'>
      {state.selectedProfile ? (
        <>
          <img
            src={lastScreen}
            alt='Selected Profile Screen'
            className='background-image'
          />
          <button
            className='back-button'
            onClick={handleBackClick}
            aria-label='Go back'
          />
        </>
      ) : (
        <>
          <img src={screen2} alt='Buyer Screen' className='background-image' />
          <button
            className='screen-button'
            onClick={handleScreenClick}
            aria-label='Screen interaction'
          />
          {state.showDropdown && (
            <div className='profile-dropdown'>
              <div className='dropdown-header'>
                <h3>Your Size Profiles</h3>
                <div className='header-actions'>
                  {state.selectedProfile && (
                    <button
                      className='clear-selection'
                      onClick={() =>
                        setState((prev) => ({ ...prev, selectedProfile: null }))
                      }
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
              <div className='profiles-list'>
                {state.profiles.length > 0 ? (
                  state.profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className={`profile-item compact ${
                        state.selectedProfile?.id === profile.id
                          ? 'selected'
                          : ''
                      }`}
                      onClick={() => handleProfileSelect(profile)}
                    >
                      <div className='profile-info'>
                        <span className='profile-name'>{profile.name}</span>
                        <div className='size-display'>
                          <span className='size-label'>
                            {formatSizeLabel(
                              profile,
                              state.currentSizeKeys[profile.id]
                            )}
                          </span>
                          <button
                            className='rotate-size'
                            onClick={(e) => rotateSize(profile.id, e)}
                            aria-label='Rotate size format'
                          >
                            <svg
                              width='16'
                              height='16'
                              viewBox='0 0 16 16'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M13.65 2.35C12.2 0.9 10.21 0 8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C11.73 16 14.84 13.45 15.73 10H13.65C12.83 12.33 10.61 14 8 14C4.69 14 2 11.31 2 8C2 4.69 4.69 2 8 2C9.66 2 11.14 2.69 12.22 3.78L9 7H16V0L13.65 2.35Z'
                                fill='currentColor'
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='no-profiles'>
                    <p>No size profiles yet</p>
                    <button onClick={handleSizeGuideClick}>
                      Create Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BuyerScreen;
