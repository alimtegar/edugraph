import { useState, useEffect, } from 'react';
import axios from 'axios';
import 'chartjs-plugin-datalabels';

// Components
import StagesChartBar from './StagesChartBar';

// Utils
import { getStageCategoryColor } from '../Utils';

// Types
import AttemptedStage from '../types/AttemptedStage';
import StageCategory from '../types/StageCategory';

const StagesChart = () => {
    // States
    const [attemptedStages, setAttemptedStages] = useState<AttemptedStage[]>();

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages?limit=10&order_by=asc`)
            .then((res) => {
                setAttemptedStages(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section>
            <div className="flex justify-between text-gray-700 text-xs font-semibold mb-6">
                {['symbols', 'letters', 'numbers', 'on-paper',].map((stageCategory) => (
                    <div className="flex" key={stageCategory}>
                        <div className={`${getStageCategoryColor(stageCategory as StageCategory)} w-3 h-3 rounded-full mr-2`} />
                        Simbol
                    </div>
                ))}
            </div>
            <div className="flex -mx-1">
                {attemptedStages ? attemptedStages.map(({ id, score, stage }) => (
                    <StagesChartBar
                        bgColor={stage.category}
                        title={'Stg. ' + stage.stage}
                        value={score}
                        key={id}
                    />
                )) : null}
                {attemptedStages ? Array.from(Array(8 - attemptedStages.length).keys()).map((i) => (
                    <StagesChartBar key={i} />
                )) : null}
            </div>
        </section>
    );
};

export default StagesChart;