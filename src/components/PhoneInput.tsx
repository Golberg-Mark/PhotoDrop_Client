import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import useToggle from '@/hooks/useToggle';
import Background from '@/components/Background';
import { CountryFromList, countryList } from '@/utils/countryList';
import DownIcon from '@/icons/DownIcon.svg';
import useInput from '@/hooks/useInput';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { userActions } from '@/store/actions/userActions';

const PhoneInput = () => {
  const [isCountriesVisible, toggleIsCountriesVisible] = useToggle();
  const [selectedCountry, setSelectedCountry] = useState<CountryFromList>(countryList[0]);
  const [searchValue, setSearchValue] = useInput('', 20);
  const [number, setNumber] = useInput(countryList[0].code, 15, 'phone');

  const dispatch = useDispatch();

  useEffect(() => {
    setNumber(selectedCountry.code);
  }, [selectedCountry]);

  useEffect(() => {
    const countryRegexp = new RegExp(/^(\+\d{0,4})$/);
    const numberRegexp = new RegExp(/^(\d{9,10})$/);
    const numberWithoutCountry = number.slice(selectedCountry.code.length - 1);

    if (countryRegexp.test(selectedCountry.code) && numberRegexp.test(numberWithoutCountry)) {
      dispatch(userActions.setAuthNumber({
        countryCode: selectedCountry.code,
        phoneNumber: numberWithoutCountry
      }));
    } else dispatch(userActions.setAuthNumber(null));
  }, [number]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (value.length >= selectedCountry.code.length) {
      setNumber(value);
    }
  };

  let filteredCounties = countryList;

  if (searchValue.length) {
    filteredCounties = countryList.filter((el) => {
      const country = el.country.toLowerCase();
      const code = el.code;
      const val = searchValue.toLowerCase();

      if (country.includes(val) || code.includes(val)) return el;
    });
  }

  return (
    <StyledPhoneInput>
      <CountrySelector onClick={toggleIsCountriesVisible}>
        <img
          src={selectedCountry.src}
          alt={selectedCountry.country}
        />
      </CountrySelector>
      <Input
        type="tel"
        value={formatPhoneNumber(number, selectedCountry.code)}
        onChange={onInputChange}
      />
      {isCountriesVisible ? (
        <Background onClick={toggleIsCountriesVisible}>
          <CodesModalWindow onClick={(evt) => evt.stopPropagation()}>
            <Search
              type="text"
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Input your country or country code"
              autoFocus
            />
            <CountryList>
              {filteredCounties.map((el) => (
                <CountryListItem
                  key={el.iso}
                  isSelected={el.code === selectedCountry.code}
                  onClick={() => {
                    setSelectedCountry(el);
                    setSearchValue('');
                    toggleIsCountriesVisible(false);
                  }}
                >
                  <span>{el.country}</span>
                  <Code>—</Code>
                  <Code>{el.code}</Code>
                </CountryListItem>
              ))}
            </CountryList>
          </CodesModalWindow>
        </Background>
      ) : ''}
    </StyledPhoneInput>
  );
};

const StyledPhoneInput = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  max-width: 375px;
`;

const CountrySelector = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 8px;
  width: 70px;
  height: 40px;
  background-color: #F4F4F4;
  border: 1px solid #EEE;
  border-radius: 10px;
  cursor: pointer;
  
  img {
    width: 30px;
    height: 25px;
  }
  
  ::after {
    content: '';
    position: absolute;
    top: calc(50% - 3px);
    right: 8px;
    display: block;
    width: 14px;
    height: 7px;
    background-image: url(${DownIcon});
  }
  
  :focus {
    border: 1px solid #3300CC;
  }
`;

const CodesModalWindow = styled.div`
  display: block;
  max-width: 375px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const CountryList = styled.div`
  padding: 10px 15px;
  height: 100%;
  overflow-y: auto;
`;

const Search = styled.input`
  display: block;
  padding: 10px 15px;
  width: calc(100%);
  height: 50px;
  border: none;
  box-shadow: 0 -2px 15px 0 rgba(158,158,161, .9);
`;

const CountryListItem = styled.p<{ isSelected: boolean }>`
  display: flex;
  grid-gap: 10px;
  padding: 5px 0;
  font-weight: 400;
  
  span {
    color: ${({ isSelected }) => isSelected ? '#3300CC' : '#262626'};
    height: 18px;
  }

  &:hover > span {
    color: #3300CC;
  }
`;

const Code = styled.span`
  color: #363636;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  height: 40px;
  background-color: #F4F4F4;
  border: 1px solid #EEE;
  border-radius: 10px;
  cursor: pointer;

  :focus {
    border: 1px solid #3300CC;
  }
`;

export default PhoneInput;
