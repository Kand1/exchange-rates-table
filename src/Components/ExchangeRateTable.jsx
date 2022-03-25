import React, {useEffect, useState} from "react";
import '../App.css';
import './ExchangeRateTable.css';
import {getCurrentDateData, getPastDateData, getValutePastData} from "../Api/api";
import ReactTooltip from "react-tooltip";
import {useNavigate, useParams} from "react-router-dom";

//Составленеи таблицы об одной валюте
const createValuteChangeTable = (data, navigate, name) => {
    return (
        <div>
            <div className="div__header">
                {name}
            </div>
            <table>
                {data.map(el => {
                    return (
                        <tr>
                            <td>
                                {el[0]}
                            </td>

                            <td>
                                {el[1] + '₽'}
                            </td>

                            <td className={el[1] > el[2] ? 'Up' : 'Down'}>
                                {(el[1] > el[2] ? '▲' : '▼') +
                                    Math.abs((el[1] - el[2]) / el[2] * 100).toFixed(4) + '%'}
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}
//Составление таблицы валют
const createTableFromData = (data, navigate) => {
    let valuteObj = data.currentDate.Valute;
    let tableJSX = [];
    for (let key in valuteObj) {
        tableJSX.push(
            <tr onClick={() => {navigate("/" + key)}} data-tip data-for={key}>
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

    let [state, setState] = useState({currentDate: null, valuteData: null, id: null});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getCurrentDateData().then(
            (data) => {
                setState({currentDate: data, valuteData: state.valuteData, id: state.id})
            }
        )
    }, []);


    //Является ли id в url наименованием валюты
    let hasProperty = state.currentDate ? state.currentDate.Valute[id] !== undefined : false;

    //Загрузка данных о конкретной валюте (если нужно)
    if (hasProperty && id !== state.id && state.currentDate) {
        let valuteDataInProcess = [[state.currentDate.Date, state.currentDate.Valute[id].Value, state.currentDate.Valute[id].Previous]];
        let url = state.currentDate.PreviousURL;
        getValutePastData(valuteDataInProcess, id, url, 8).then(data => {
            valuteDataInProcess = data;
            setState({currentDate: state.currentDate, valuteData: valuteDataInProcess, id: id});
        });
    }

    //Выбор таблицы
    let tableJSX = null;
    if (hasProperty && id === state.id && state.valuteData) {
        console.log("check", state)
        tableJSX = createValuteChangeTable(state.valuteData, navigate, state.currentDate.Valute[id].Name);
    } else {
        if (id !== "home") {
            tableJSX = <div>Пожалуйста подождите.</div>;
        } else {
            tableJSX = state.currentDate ? createTableFromData(state, navigate) : <div>Пожалуйста подождите.</div>;
        }
    }

    return (
        <div className="Content">
            {tableJSX}
        </div>
    );
}