const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    const { openid } = event
    const res = await db.collection('users').where({ _openid: openid }).get()
    
    if (res.data.length === 0) {
      return { code: -1, message: '用户不存在', data: null }
    }
    
    return { code: 0, message: 'success', data: res.data[0] }
  } catch (err) {
    console.error('[getUserInfo] error:', err)
    return { code: -1, message: err.message || '服务异常', data: null }
  }
}