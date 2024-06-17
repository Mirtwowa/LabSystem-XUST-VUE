import { defaultsDeep } from 'lodash-es'
import type { RecursiveRequired, Settings } from '#/global'
import settingsDefault from '@/settings.default'

const globalSettings: Settings.all =
  // 请在此处编写或粘贴配置代码
{
  "app": {
  "colorScheme": ""
},
  "menu": {
  "menuMode": "head",
    "switchMainMenuAndPageJump": true
},
  "toolbar": {
  "fullscreen": true,
    "pageReload": true
},
  "copyright": {
  "enable": true,
    "dates": "2024.5.20",
    "company": "西安科技大学双创中心"
}

}

export default defaultsDeep(globalSettings, settingsDefault) as RecursiveRequired<Settings.all>
