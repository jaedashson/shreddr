import { addProgressPic, getProgressPic } from "../util/progress_pic_api_util";

export const RECEIVE_PROGRESS_PICS = "RECEIVE_PROGRESS_PICS";
export const RECEIVE_PROGRESS_PIC = "RECEIVE_PROGRESS_PIC";

export const receiveProgressPics = progresspics => ({
    type: RECEIVE_PROGRESS_PICS,
    progresspics
})

export const receiveProgressPic = progresspic => ({
    type: RECEIVE_PROGRESS_PIC,
    progresspic
})

export const fetchProgressPic = userId => dispatch => (
    getProgressPic(userId)
    .then( progresspics => dispatch(receiveProgressPics(progresspics)))
    .catch( err => console.log(err))
);

export const addNewProgressPic = (formData, userId) => dispatch => (
    addProgressPic(formData, userId)
    .then( progresspic => dispatch(receiveProgressPic(progresspic)))
    .catch((err) => console.log(err))
);