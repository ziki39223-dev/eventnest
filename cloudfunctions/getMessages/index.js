const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { page = 1, size = 20 } = event
    const skip = (page - 1) * size
    
    const res = await db.collection('messages')
      .where({ toOpenid: openid })
      .orderBy('createTime', 'desc')
      .skip(skip)
      .limit(size)
      .get()
    
    return { code: 0, message: 'success', data: res.data }
  } catch (err) {
    console.error('[getMessages] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}