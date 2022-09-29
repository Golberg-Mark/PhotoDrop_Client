import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import useToggle from '@/hooks/useToggle';
import Background from '@/components/Background';
import { countryList } from '@/utils/countryList';
import DownIcon from '@/icons/DownIcon.svg';
import useInput from '@/hooks/useInput';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { userActions } from '@/store/actions/userActions';

const PhoneInput = () => {
  const [isCountriesVisible, toggleIsCountriesVisible] = useToggle();
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [searchValue, setSearchValue] = useInput('', 20);
  const [number, setNumber] = useInput(countryList[0].code, 15, 'phone');

  const dispatch = useDispatch();

  useEffect(() => {
    setNumber(countryList[selectedCountry].code);
  }, [selectedCountry]);

  useEffect(() => {
    const countryRegexp = new RegExp(/^(\+\d{0,4})$/);
    const numberRegexp = new RegExp(/^(\d{9,10})$/);
    const numberWithoutCountry = number.slice(countryList[selectedCountry].code.length - 1);

    if (countryRegexp.test(countryList[selectedCountry].code) && numberRegexp.test(numberWithoutCountry)) {
      dispatch(userActions.setAuthNumber({
        countryCode: countryList[selectedCountry].code,
        phoneNumber: numberWithoutCountry
      }));
    } else dispatch(userActions.setAuthNumber(null));
  }, [number]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (value.length >= countryList[selectedCountry].code.length) {
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
          src={countryList[selectedCountry].src}
          alt={countryList[selectedCountry].country}
        />
      </CountrySelector>
      <Input
        type="tel"
        value={formatPhoneNumber(number, countryList[selectedCountry].code)}
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
            />
            {filteredCounties.map((el, i) => (
              <CountryListItem
                key={el.iso}
                isSelected={i === selectedCountry}
                onClick={() => {
                  setSelectedCountry(i);
                  setSearchValue('');
                  toggleIsCountriesVisible(false);
                }}
              >
                <span>{el.country}</span>
                <Code>—</Code>
                <Code>{el.code}</Code>
              </CountryListItem>
            ))}
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
    outline: none;
    border: 1px solid #3300CC;
  }
`;

const CodesModalWindow = styled.div`
  display: block;
  padding: 0 10px 5px;
  max-width: 375px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Search = styled.input`
  display: block;
  margin: 0 0 10px -10px;
  padding: 10px 15px;
  width: calc(100% + 20px);
  height: 50px;
  border: none;
  border-bottom: 1px solid #CCC;
  
  :focus {
    outline: none;
    border-bottom: 1px solid #3300CC;
  }
`;

const CountryListItem = styled.p<{ isSelected: boolean }>`
  display: flex;
  grid-gap: 10px;
  padding: 5px 0;
  font-weight: 400;
  
  span {
    color: ${({ isSelected }) => isSelected ? '#3300CC' : '#262626'};
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
    outline: none;
    border: 1px solid #3300CC;
  }
`;

export default PhoneInput;
