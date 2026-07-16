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
    const isParticipated = eventData.participants?.includes(openid) || false
    
    return { 
      code: 0, 
      message: 'success', 
      data: {
        ...eventData,
        participantCount: eventData.participants?.length || 0,
        isParticipated
      }
    }
  } catch (err) {
    console.error('[getEventDetail] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}