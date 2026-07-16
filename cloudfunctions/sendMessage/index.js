const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { toOpenid, content } = event
    
    await db.collection('messages').add({
      data: {
        fromOpenid: openid,
        toOpenid,
        content,
        createTime: db.serverDate(),
        isRead: false
      }
    })
    
    return { code: 0, message: 'success', data: { success: true } }
  } catch (err) {
    console.error('[sendMessage] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}