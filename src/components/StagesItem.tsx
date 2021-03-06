import { useState, useEffect, } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Rate from 'rc-rate';

// Components
import Alert from './Alert';

// Types
import Stage from '../types/Stage';
import AttemptedStage from '../types/AttemptedStage';

type MatchParams = {
    category?: string | undefined;
};

const StagesItem = ({ id, stage, questions, is_locked }: Stage) => {
    const history = useHistory();
    const { category } = useParams<MatchParams>();

    // States
    const [bestScoreRate, setBestScoreRate] = useState(0);

    // Effects
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attempted-stages/best/category/${category}/stage/${stage}`)
            .then((res) => {
                const bestAttemptedStage: AttemptedStage | null = res.data;
                const bestScoreRate = bestAttemptedStage ? bestAttemptedStage.score / 10 * 0.5 : 0;

                setBestScoreRate(bestScoreRate);
            })
            .catch((err) => console.error(err))
    }, [category, stage]);

    // Functions
    const handleClick = () => {
        Alert.fire({
            title: (<span className="text-lg text-gray-900 font-bold leading-snug">Apakah anda yakin?</span>),
            html: (<p className="text-sm text-gray-600 font-semibold">Anda diminta untuk tidak keluar saat mengerjakan Stage.</p>),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak',
        }).then(({ isConfirmed }) => {
            if (isConfirmed) {
                axios.post(`${process.env.REACT_APP_API_URL}/attempted-stages/create`, {
                    stage_id: id,
                })
                    .then((res) => {
                        const attemptedStage: AttemptedStage = res.data;

                        if (attemptedStage.id) {
                            history.push(`/attempted-stages/${attemptedStage.id}/attempted-questions/n/1`);
                        }
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="flex items-center bg-white text-gray-700 p-2 rounded-xl shadow" onClick={is_locked ? () => {} : handleClick}>
            <div className="flex justify-center items-center bg-blue-50 w-12 h-12 mr-4 rounded-full">
                {(<img src={require(`../assets/images/${is_locked ? '' : 'un'}locked-stage.svg`).default} className="h-7" alt={`Stage ${stage}`} />)}
            </div>
            <div className="flex flex-col mr-auto">
                <h3 className="text-sm font-bold leading-none">
                    Stage {stage}
                </h3>
                <span className="text-xs font-semibold">
                    {/* {questions[0].question}, ..., {questions[questions.length - 1].question} */}
                    {/* {questions[0].question}, {questions[1].question}, {category !== 'on-paper' ? questions[2].question + ',' : ''} ... */}
                </span>
            </div>
            <span className="mr-2">
                <Rate value={bestScoreRate} allowHalf />
            </span>
        </div>
    );
};

export default StagesItem;