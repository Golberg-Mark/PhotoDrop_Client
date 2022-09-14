import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import useToggle from '@/hooks/useToggle';
import Background from '@/components/Background';
import { countryList } from '@/utils/countryList';
import DownIcon from '@/assets/icons/DownIcon.svg';
import useInput from '@/hooks/useInput';
import formatPhoneNumber from '@/utils/formatPhoneNumber';
import { useDispatch } from 'react-redux';
import { userActions } from '@/store/actions/userActions';

interface Props extends InputHTMLAttributes<HTMLInputElement>{}

const PhoneInput: React.FC<Props> = (props) => {
  const [isCountriesVisible, toggleIsCountriesVisible] = useToggle();
  const [selectedCountry, setSelectedCountry] = useState(0);
  const [number, setNumber] = useInput(countryList[0].code, 15, 'phone');
  const selectedItemRef = useRef<HTMLParagraphElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setNumber(countryList[selectedCountry].code);
  }, [selectedCountry]);

  useEffect(() => {
    if (isCountriesVisible && selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView();
    }
  }, [selectedItemRef, isCountriesVisible]);

  useEffect(() => {
    const countryRegexp = new RegExp(/^(\+\d{0,4})$/);
    const numberRegexp = new RegExp(/^(\d{9,10})$/);
    const numberWithoutCountry = number.slice(countryList[selectedCountry].code.length - 1);

    if (countryRegexp.test(countryList[selectedCountry].code) && numberRegexp.test(numberWithoutCountry)) {
      dispatch(userActions.setAuthNumber({
        countryCode: countryList[selectedCountry].code,
        phoneNumber: numberWithoutCountry
      }));
    }
  }, [number]);

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    if (value.length >= countryList[selectedCountry].code.length) {
      setNumber(value);
    }
  };

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
            {countryList.map((el, i) => (
              <CountryListItem
                key={el.iso}
                isSelected={i === selectedCountry}
                ref={i === selectedCountry ? selectedItemRef : null}
                onClick={() => {
                  setSelectedCountry(i);
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
`;

const CountrySelector = styled.button`
  position: relative;
  display: flex;
  align-items: center;
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
  padding: 5px 10px;
  width: 375px;
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
`;

const CountryListItem = styled.p<{ isSelected: boolean }>`
  display: flex;
  grid-gap: 10px;
  padding: 5px 0;
  font-weight: 400;
  
  span {
    color: ${({ isSelected }) => isSelected ? '#3300CC' : '#262626'}
  }

  &:hover > span {
    color: #3300CC;
  }
`;

const Code = styled.span`
  color: #363636;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  padding: 8px;
  width: 265px;
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
