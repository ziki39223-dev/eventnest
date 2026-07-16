const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { eventId } = event
    
    const res = await db.collection('events').doc(eventId).get()
    
    if (!res.data) {
      return { code: -1, message: '活动不存在', data: null }
    }
    
    const eventData = res.data
    
    if (eventData.participants?.includes(openid)) {
      return { code: -1, message: '您已参与此活动', data: null }
    }
    
    await db.collection('events').doc(eventId).update({
      data: {
        participants: db.command.push(openid),
        updateTime: db.serverDate()
      }
    })
    
    return { code: 0, message: 'success', data: { success: true } }
  } catch (err) {
    console.error('[participateEvent] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}