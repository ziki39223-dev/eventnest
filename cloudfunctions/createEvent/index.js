const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { title, description, images, location, startTime, endTime } = event
    
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