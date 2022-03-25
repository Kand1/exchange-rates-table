import React, {useEffect, useState} from "react";
import '../App.css';
import './ExchangeRateTable.css';
import {getCurrentDateData, getPastDateData} from "../Api/api";
import ReactTooltip from "react-tooltip";

const createTableFromData = (data) => {
    let valuteObj = data.currentDate.Valute;
    let tableJSX = [];
    for (let key in valuteObj) {
        tableJSX.push(
            <tr data-tip data-for={key}>
                <td>
                    {valuteObj[key].CharCode + ' ' + valuteObj[key].NumCode}
                </td>

                <td>
                    {valuteObj[key].Value + '₽'}
                </td>

                <td className={valuteObj[key].Value > valuteObj[key].Previous ? 'Up' : 'Down'}>
                    {(valuteObj[key].Value > valuteObj[key].Previous ? '▲' : '▼') +
                        Math.abs((valuteObj[key].Value - valuteObj[key].Previous) / valuteObj[key].Previous * 100).toFixed(4) + '%'}
                </td>

            </tr>
        );
        tableJSX.push(<ReactTooltip id={key} type='light'>
            <span>{valuteObj[key].Name}</span>
        </ReactTooltip>);

    }
    return <table> {tableJSX} </table>;
}

export const ExchangeRateTable = (props) => {

    let [state, setState] = useState({currentDate: null});

    useEffect(() => {
        getCurrentDateData().then(
            (data) => {
                setState({currentDate: data})
            }
        )
    }, [])

    console.log(state);

    let tableJSX = state.currentDate ? createTableFromData(state) : <div>Пожалуйста подождите.</div>;

    return (
        <div className="Content">
            {tableJSX}
        </div>
    );
}