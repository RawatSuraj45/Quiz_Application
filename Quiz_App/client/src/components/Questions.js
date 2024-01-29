import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook  */
import { useFetchQuestion } from '../Hooks/FetchQuestion';
import { updateResult } from '../Hooks/setResult';


export default function Questions({ onChecked }) {

    const [checked , setchecked] = useState(undefined)
    const { trace } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{isloading , apiData  , serverError }] = useFetchQuestion()
    // useSelector(state => console.log(state))
    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateResult({trace , checked}))
    },[checked])

    useEffect(() => {
        // console.log(isloading);
        // console.log(apiData);
        // console.log(serverError);
    })

    function onSelect(i) {
        // console.log(i);
        onChecked(i)
        setchecked(i)
        dispatch(updateResult({trace , checked}))
    }

    if(isloading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "Unkoen Error"}</h3>

  return (
    <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q , i) => (
                    <li key={i}>
                        <input 
                            type='radio'
                            value={true}
                            name='options'
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />

                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}
