const moment = required('moments');

function formatMessage(userName, text){
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
} 

module.exports = formatMessage;