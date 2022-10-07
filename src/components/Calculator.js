import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../redux/reducers/calcReducer/calcSelector';
import { carPriceSelector, initialFeeSelector, leaseTermSelector } from '../redux/reducers/calcReducer/calcSelector';
import {calcReducer} from '../redux/reducers/calcReducer/calcReducer';
import * as types from '../redux/actions';

function Calculator() {
  const carPrice = useSelector(selectors.carPriceSelector);
  const initFee = useSelector(selectors.initialFeeSelector);
  const leaseTerm = useSelector(selectors.leaseTermSelector);
  const submit = useSelector(selectors.submitSelector);
  const dispatch = useDispatch();

  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  const percented = initFee + "%";
  const rubled = carPrice / 100 * initFee;
  const percent = 0.035;
  let monthFee = (carPrice - initFee) 
                    * ((percent * Math.pow((1 + percent), leaseTerm)) 
                    / (Math.pow((1 + percent), leaseTerm) - 1));
  monthFee = Math.floor(monthFee);
  const leaseSummary = numberWithSpaces(initFee + leaseTerm * monthFee);
  monthFee = numberWithSpaces(Math.floor(monthFee));

  const changeCarPrice = (e) => {
    dispatch(types.actionGetPrice(e.target.value))
  }
  const changeInitFee = (e) => {
    dispatch(types.actionGetInitFee(e.target.value));
  }
  const calcInitFee = () => Math.floor(carPrice / initFee);
  
  const changeLeaseTerm = (e) => {
    dispatch(types.actionGetLeaseTerm(e.target.value))
  }

  const request = () => {
    const xhr = new XMLHttpRequest();
    const url = "https://hookb.in/eK160jgYJ6UlaRPldJ1P";
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert("Всё отправлено.");
      }
    };
    // преобразуем JSON в строку
    const data = JSON.stringify({ 
        "car_coast": carPrice, 
        "initail_payment": rubled,
        "initail_payment_percent": initFee,
        "lease_term": leaseTerm,
        "total_sum": leaseSummary,
        "monthly_payment_from": monthFee
      });
    // Отправляем JSON на сервер
    console.log(data);
    xhr.send(data);
  }

  const submitForm = (e) => {
    e.preventDefault();

    return new Promise((resolve, reject) => {
      fetch(dispatch(types.actionGetSubmit(true)))
        .then(
        response => {
          request();
        },
        error => alert("Возникла ошибка. \r Повторите попытку.")
      )
      .then(
        response => {
          dispatch(types.actionGetSubmit(false));
      });
    });
  }

  return(
    <>
      <h1 className="heading">Рассчитайте стоимость автомобиля в лизинг</h1>
      <fieldset className="form" disabled={submit}>
        <div className="form__item-wrapper form_item-margin">
          <label htmlFor="car-price" className="form__item-label">Стоимость автомобиля</label>
          <div className="form__group-wrapper">
            <div className="form__input-wrapper">
              <input type="number" id="car-price" name="car-price" 
              value={carPrice} onChange={changeCarPrice}
                className={
                  submit 
                  ? "form__input form__input_disabled"
                  : "form__input"
                }
              />
              <input type="range" id="car-price-range" name="car-price-range" 
              min="1000000" max="6000000" step="10000" 
              value={carPrice} onChange={changeCarPrice} className="form__input-range" />
            </div>
            <span className="form__input-icon">₽</span>
          </div>
        </div>
        
        <div className="form__item-wrapper form_item-margin">
          <label htmlFor="init-fee" className="form__item-label">Первоначальный взнос</label>
          <div className="form__group-wrapper">
            <div className="form__input-wrapper">
              <input type="text" value={rubled} className="form__input pseudo-input" disabled />  
              <input type="range" id="init-fee-range" name="init-fee-range" 
                min="10" max="60" step="1" 
                value={initFee} onChange={changeInitFee} className="form__input-range" />
            </div>
            <input type="text" id="init-fee" name="init-fee" 
              value={percented} onChange={changeInitFee}
              className={
                  submit 
                  ? "form__input-icon form_input-small form__input_disabled"
                  : "form__input-icon form_input-small"
                }
            />
          </div>
        </div>
        
        <div className="form__item-wrapper form_item-margin">
          <label htmlFor="lease-term" className="form__item-label">Срок лизинга</label>
          <div className="form__group-wrapper">
            <div className="form__input-wrapper">
              <input type="number" id="lease-term" name="lease-term" 
                value={leaseTerm} onChange={changeLeaseTerm} className="form__input"
                className={
                  submit 
                  ? "form__input form__input_disabled"
                  : "form__input"
                }
              />
              <input type="range" id="lease-term-range" name="lease-term-range" 
                min="10" max="60" step="1" 
                value={leaseTerm} onChange={changeLeaseTerm} className="form__input-range" />
            </div>
            <span className="form__input-icon">мес.</span>
          </div>
        </div>
        <div className="summary form_item-margin">
            <span className="form__item-label">Сумма договора лизинга</span>
            <span className="form__item-value">{leaseSummary} ₽</span>
          </div>
        <div className="summary form_item-margin">
            <span className="form__item-label">Ежемесячйный платеж от</span>
            <span className="form__item-value">{monthFee} ₽</span>
          </div>
        <button 
          onClick={submitForm} 
          className={
            submit 
            ? "form__item-button form__item-button_disabled"
            : "form__item-button"
          } 
          disabled={submit}>
            {
            submit 
            ? "Отправка..."
            : "Оставить заявку"}
        </button>
      </fieldset>
    </>
  );
}

export default Calculator;