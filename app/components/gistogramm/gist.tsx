"use client"

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, registerables } from "chart.js";
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../api'
import styles from "./gist.module.css"
import { DropDown } from '../dropDown';

interface IMonth {
    [key: string]: number
}

interface IHalf_Year {
    [key: string]: number
}

interface IYear {
    [key: string]: number
}

interface IData {
    month: IMonth,
    half_year: IHalf_Year,
    year: IYear
}

interface IResponse {
    graph: IData
}

export const Gist = () => {

    let getObj: IData;
    let monthDonat: number[] = [];
    let monthDay: string[] = [];
    let half_yearY: number[] = [];
    let half_yearX: string[] = [];
    let yearY: number[] = [];
    let yearX: string[] = [];

    const [data, setData] = React.useState<IData[]>();
    const [isHidden, setIsHidden] = React.useState(false);
    const [selectedPeriod, setSelectedPeriod] = React.useState<string>('За последний месяц');

    React.useEffect(() => {
        /* ниже данные с ограниченным запросов, но с точками и миллионы раскомментировать ниже и закомментировать => "axiosInstance.get('4aa0715b-ca3b-46fe-91a2-c1ba352e1e61')"
        работает совместо с данными из файла components/api/index, там нужно раскомментировать и закомментировать аналогичным образом.
        */
        // axiosInstance.get('/user')
        /* ниже данные без точке, и без ограничений по запросам */
        axiosInstance.get('4aa0715b-ca3b-46fe-91a2-c1ba352e1e61')

            .then((response) => {
                setData(response.data.finance.periods.map((item: IResponse) => item.graph));
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }, []);

    (data && data.map(item => getObj = item));
    for (let key in getObj?.month) {
        monthDonat.push(getObj?.month[key])
        monthDay.push(key)
    }
    for (let key in getObj?.half_year) {
        half_yearY.push(getObj.half_year[key])
        half_yearX.push(key)
    }
    for (let key in getObj?.year) {
        yearY.push(getObj.year[key])
        yearX.push(key)
    }

    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);
    const barDataFromMonth = {
        labels: monthDay,
        datasets: [
            {
                data: monthDonat,
                label: "Донат",
                borderColor: "#000aff",
                backgroundColor: "#000aff",
                fill: true,
            },
        ]
    };
    const barDataFromHalf_year = {
        labels: half_yearX,
        datasets: [
            {
                data: half_yearY,
                label: "Донат",
                borderColor: "#000aff",
                backgroundColor: "#000aff",
                fill: true
            },
        ]
    };
    const barDataFromYear = {
        labels: yearX,
        datasets: [
            {
                data: yearY,
                label: "Донат",
                borderColor: "#000aff",
                backgroundColor: "#000aff",
                fill: true
            },
        ]
    };

    return (
        <div onClick={() => setIsHidden(false)} className={styles.container}>
            <div className={styles.select_position}>
                <DropDown
                    isHidden={isHidden}
                    setIsHidden={setIsHidden}
                    setSelectedPeriod={setSelectedPeriod}
                    selectedPeriod={selectedPeriod} />
            </div>
            {data?.length > 0 ?
                <>
                    {selectedPeriod === "За последний месяц" ?
                        <div className={styles.bar}>
                            <Bar
                                width={130}
                                height={50}
                                data={barDataFromMonth} 
                            />
                        </div> : null}
                    {selectedPeriod === "За последние 6 месяцев" ?
                        <div className={styles.bar}>
                            <Bar
                                width={130}
                                height={50}
                                data={barDataFromHalf_year}
                            />
                        </div> : null}
                    {selectedPeriod === "За последний год" ?
                        <div className={styles.bar}>
                            <Bar
                                width={130}
                                height={50}
                                data={barDataFromYear}
                            />
                        </div> : null}
                </>
                :
                <h1 style={{ textAlign: 'center' }}>Загружаем данные...</h1>
            }
        </div>
    );
};
