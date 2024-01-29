import React, { useEffect, useState } from 'react'
import Questions from './Questions';

import { moveNextQuestion , movePrevQuestion } from '../Hooks/FetchQuestion';
import { PushAnswer } from '../Hooks/setResult';

/** redux store import */
import { useSelector , useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom';

export default function Quiz() {

    const [ check , setChecked ] = useState(undefined)
    const result = useSelector(state => state.result.result);
    const {queue , trace }= useSelector(state => state.questions);
    const dispatch = useDispatch();

    /**Next Button Event Handeler */
    function onNext() {
        // console.log('========>On Next click');
        if(trace < queue.length){
        /**increase the trace value by 1 using move next action */
        dispatch(moveNextQuestion());

        /**insert new result into the array */
            if(result.length <= trace ){
                dispatch(PushAnswer(check))    
            }
        }
        /**reset the value of the checked variable */
        setChecked(undefined)
    }

    /**Prev Button Event Handeler */
    function onPrev() {
        // console.log('========>On Prev click');

        if(trace > 0){
            /**decrease the trace value by 1 using move prev action */
             dispatch(movePrevQuestion());
        }
    }

    function onChecked(check) {
        //console.log(check);
        setChecked(check)
    }

    /** finished exam after the last question */
    if(result.length && result.length >= queue.length){
        return <Navigate to={'/result'} replace = "true"></Navigate>
    }

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        {/**Display Questions */}
        <Questions onChecked = {onChecked}></Questions>
        
        <div className='grid'>
            { trace > 0 ? <button className='btn prev' onClick={onPrev}>Prev</button> :<div></div>}
            <button className='btn next' onClick={onNext}>Next</button>
        </div>

    </div>
  )
}
