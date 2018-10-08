const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 课程页面 时间格式
const formatTimeLesson = (timestamp, index) => { 
    var date = new Date(timestamp); 
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    let temp_weekend = date.getDay() ; 
    let _weekend = '' 
    switch (temp_weekend.toString()) {
        case '1':
            temp_weekend = '一';
            _weekend = '周一'
            break;
        case '2':
            temp_weekend = '二';
            _weekend = '周二'
            break;
        case '3':
            temp_weekend = '三';
            _weekend = '周三'
            break;
        case '4':
            temp_weekend = '四';
            _weekend = '周四'
            break;
        case '5':
            temp_weekend = '五';
            _weekend = '周五'
            break;
        case '6':
            temp_weekend = '六';
            _weekend = '周六'
            break;
        case '0':
            temp_weekend = '天';
            _weekend = '周天'
            break;

    }

    if (index == 0) {
        _weekend = '今天'
    } else if (index == 1) {
        _weekend = '明天'
    } else if (index == 2) {
        _weekend = '后天'
    }

    return {
        data: [month, day].map(formatNumberLesson).join('.'),
        temp_weekend: temp_weekend,
        _weekend: _weekend
    }
}

const formatNumberLesson = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}



// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = {
    formatTime,
    formatTimeLesson,
    showBusy,
    showSuccess,
    showModel
}