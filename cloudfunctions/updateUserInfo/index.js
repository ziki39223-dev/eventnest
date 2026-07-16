const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const { nickname, avatar } = event
    
    await db.collection('users').where({ _openid: openid }).update({
      data: {
        nickname,
        avatar,
        updateTime: db.serverDate()
      }
    })
    
    const res = await db.collection('users').where({ _openid: openid }).get()
    return { code: 0, message: 'success', data: res.data[0] }
  } catch (err) {
    console.error('[updateUserInfo] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}