import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**redux actions  */
import * as Action from '../Redux/question_reducer'
import { getServerData } from "../Helper/helper";


/** fetch question hook to fetch api data and set value of the store */
export const useFetchQuestion = () => {

    const dispatch = useDispatch()
    const [getData , setGetData] = useState({isloading : false , apiData : [] , serverError : null})

    useEffect(() => {
        setGetData(prev => ({...prev ,isloading : true }));

        /**async function to fetch backend data */
        (async () => {
            try {
                // console.log(process.env.REACT_APP_SERVER_HOSTNAME)
                const [{ questions , answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions` , (data) => data);
                //console.log({ questions , answers });

                if(questions.length > 0){
                    setGetData(prev => ({...prev ,isloading : false }));
                    setGetData(prev => ({...prev ,apiData : {questions , answers }}));

                    /** dispatch an action  */
                    dispatch(Action.startExamAction({ question : questions , answers }))
                }else{
                    throw new Error("No question Available");
                }                
            } catch (error) {
                setGetData(prev => ({...prev ,isloading : false }));
                setGetData(prev => ({...prev ,serverError : error }));
            }
        })();
    },[dispatch]);

    return [getData , setGetData];
}

/** MoveAction Dispatch function */
export const moveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction())   /**Increase the trace value by 1  */
    } catch (error) {
        console.log(error);
    }
}

/** MoveAction Dispatch function */
export const movePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction())    /**Decrease the trace value by 1  */
    } catch (error) {
        console.log(error);
    }
}