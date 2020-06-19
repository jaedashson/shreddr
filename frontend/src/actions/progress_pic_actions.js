import { addProgressPic, getProgressPic } from "../util/progress_pic_api_util";

export const RECEIVE_PROGRESS_PICS = "RECEIVE_PROGRESS_PICS";
export const RECEIVE_PROGRESS_PIC = "RECEIVE_PROGRESS_PIC";

export const receiveProgressPics = (progresspics, userId) => ({
    type: RECEIVE_PROGRESS_PICS,
    userId,
    progresspics
})

export const receiveProgressPic = progresspic => ({
    type: RECEIVE_PROGRESS_PIC,
    progresspic
})

export const fetchProgressPic = userId => dispatch => (
    getProgressPic(userId)
    .then(progresspics => dispatch(receiveProgressPics(progresspics, userId)))
    .catch( err => console.log(err))
);

export const addNewProgressPic = (formData, userId) => dispatch => {
    return addProgressPic(formData, userId).then(progresspic => {
        return dispatch(receiveProgressPic(progresspic))
    }, err => {
        console.log(err);
    })
};