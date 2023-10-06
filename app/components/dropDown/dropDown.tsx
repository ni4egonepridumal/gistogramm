import React from 'react';
import styles from "./dropDown.module.css";
import Image from 'next/image';

interface IDropDown {
    setSelectedPeriod: (arg0: string) => void
    selectedPeriod: string;
    isHidden: boolean;
    setIsHidden: (arg0: boolean) => void
}

export const DropDown: React.FC<IDropDown> = ({ isHidden, setIsHidden, setSelectedPeriod, selectedPeriod = "За последний месяц" }) => {
    return (
        <div onClick={(e) => { e.stopPropagation(), setIsHidden(!isHidden) }} style={{ position: "relative" }}>
            <div className={styles.dropNdown}>
                {selectedPeriod}
                <span className={isHidden ? styles.arrow : styles.turnArrow}>
                    <Image alt="стрелочка" src={"/Vector 4.svg"} width={24} height={12} />
                </span>
            </div>
            {
                isHidden &&
                <div className={styles.wisible}>
                    <div onClick={(e) => { setSelectedPeriod(e.target.innerHTML), setIsHidden(!isHidden) }}
                        style={{ marginTop: "10px" }}>
                        За последний месяц
                    </div>
                    <div onClick={(e) => { setSelectedPeriod(e.target.innerHTML), setIsHidden(!isHidden) }}
                        style={{ marginTop: "10px" }}>
                        За последние 6 месяцев
                    </div>
                    <div onClick={(e) => { setSelectedPeriod(e.target.innerHTML), setIsHidden(!isHidden) }}
                        style={{ marginTop: "10px", marginBottom: "10px" }}>
                        За последний год
                    </div>
                </div>
            }
        </div>
    );
};
