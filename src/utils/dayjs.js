import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

Vue.filter('relativeTime', function (value) {
  return dayjs().to(dayjs(value))
//   return '3'
})
