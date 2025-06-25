import mockjs from 'mockjs'

// 模拟数据对象
const Mock = {
  // 获取订单数据的方法，type为订单类型（0：普通商品，1：秒杀商品）
  getOrder(type) {
    const array = [] // 用于存放生成的订单数据
    // 随机生成5到10条订单数据
    for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
      array.push(
        mockjs.mock({
          // 商品名称，根据type判断是普通商品还是秒杀商品
          name: type === 0 ? '普通商品' : '秒杀商品' + i,
          // 商品价格，随机生成20到500之间的整数，并加上“元”单位
          price: mockjs.Random.integer(20, 500) + '元',
          // 买家姓名，随机生成中文姓名
          buyer: mockjs.Random.cname(),
          // 下单时间，随机生成格式为“yyyy-MM-dd A HH:mm:ss”的日期时间
          time: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
          // 角色，随机生成布尔值
          role: mockjs.Random.boolean(),
          // 订单状态，随机生成布尔值
          state: mockjs.Random.boolean(),
          // 支付类型，随机生成布尔值
          payType: mockjs.Random.boolean(),
          // 订单来源，随机生成一个URL
          source: mockjs.Random.url(),
          // 买家手机号，随机生成11位数字
          phone: mockjs.mock(/\d{11}/),
        }),
      )
    }
    return array // 返回生成的订单数组
  },
  getGoods(type) {
    const array = [] // 用于存放生成的订单数据
    // 随机生成5到10条订单数据
    for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
      array.push(
        mockjs.mock({
          // 商品名称，根据type判断是普通商品还是秒杀商品
          name: type === 0 ? '普通商品' : '秒杀商品' + i,
          img: mockjs.Random.dataImage('60x100', '商品实列图'),
          // 商品价格，随机生成20到500之间的整数，并加上“元”单位
          price: mockjs.Random.integer(20, 500) + '元',
          sellCount: mockjs.Random.integer(10, 100),
          count: mockjs.Random.integer(10, 100),
          back: mockjs.Random.integer(10, 100),
          backPrice: mockjs.Random.integer(0, 5000) + '元',
          owner: mockjs.Random.cname(),
          // 下单时间，随机生成格式为“yyyy-MM-dd A HH:mm:ss”的日期时间
          time: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
          state: mockjs.Random.boolean(),
        }),
      )
    }
    return array // 返回生成的订单数组
  },

  getManagerList() {
    const array = [] // 用于存放生成的订单数据
    // 随机生成5到10条订单数据
    for (let i = 0; i < mockjs.Random.integer(10, 20); i++) {
      array.push(
        mockjs.mock({
          people: mockjs.Random.csentence(),
          weixin: mockjs.Random.string(7, 10),
          state: mockjs.Random.boolean(),
          income: mockjs.Random.integer(0, 500000) + '元',
          back: mockjs.Random.integer(0, 1000) + '元',
          backPrice: mockjs.Random.integer(0, 5000) + '元',
          source: '站内',
          customer: mockjs.Random.integer(0, 50),
          time: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        }),
      )
    }
    return array // 返回生成的订单数组
  },

  getChartsData() {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(mockjs.Random.integer(0, 100))
    }
    return array
  },
  getTradeData() {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(mockjs.Random.integer(0, 100))
    }
    return array
  },

  getManagerReqList() {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(
        mockjs.mock({
          userInfo: mockjs.Random.cname(),
          state: mockjs.Random.boolean(),
          updaeTime: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
          addTime: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        }),
      )
    }
    return array
  },

  getMangaerOrder() {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(
        mockjs.mock({
          name: mockjs.Random.cparagraph(1),
          orderNumber: mockjs.Random.url(),
          numberPieces: mockjs.Random.integer(10, 1000),
          mangaerInfo: mockjs.Random.cname(),
          price: `${mockjs.Random.integer(10000000, 99999999)}元`,
          commission: `${mockjs.Random.integer(10000, 99999)}元`,
          paymentTime: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        }),
      )
    }
    return array
  },

  getTradeinfo() {
    const array = []
    for (let i = 0; i < 6; i++) {
      array.push(
        mockjs.mock({
          name: mockjs.Random.cparagraph(1),
          orderNumber: mockjs.Random.url(),
          username: mockjs.Random.cname(),
          methods: mockjs.Random.boolean(),
          paymentTime: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        }),
      )
    }
    return array
  },

  getTradeList(type) {
    const array = []
    if (type === 'dailySummary') {
      for (let i = 0; i < 8; i++) {
        array.push({
          date: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
          revenue: `${mockjs.Random.integer(100, 9999)}元`,
          expenditures: `${mockjs.Random.integer(100, 9999)}元`,
          remark: mockjs.Random.cparagraph(1),
        })
      }
      return array
    }
    for (let i = 0; i < 8; i++) {
      array.push({
        date: mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
        revenue: `${mockjs.Random.integer(100, 9999)}元`,
        expenditures: `${mockjs.Random.integer(100, 9999)}元`,
        remark: mockjs.Random.cparagraph(1),
      })
    }

    return array
  },
}
export default Mock
