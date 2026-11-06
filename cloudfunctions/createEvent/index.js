const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { title, description, images, location, startTime, endTime } = event

    // 必填字段与时间先后校验，避免把 undefined 或倒挂的时间写进库
    if (!title || !startTime || !endTime || new Date(endTime) <= new Date(startTime)) {
      return { code: -1, message: '参数不完整或时间不合法', data: null }
    }

    const result = await db.collection('events').add({
      data: {
        _openid: openid,
        title,
        description,
        images,
        participants: [],
        location,
        startTime,
        endTime,
        status: 'active',
        createTime: db.serverDate(),
        updateTime: db.serverDate()
      }
    })
    
    const eventData = await db.collection('events').doc(result._id).get()
    return { code: 0, message: 'success', data: eventData.data }
  } catch (err) {
    console.error('[createEvent] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}