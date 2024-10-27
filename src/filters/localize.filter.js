import store from '@/store'
import ua from '@/languages/ua.json'
import ru from '@/languages/ru.json'

const locales = {
    'ua': ua,
    'ru': ru
}

export default function localizeFilter(key) {
    const locale = store.getters.locale || 'ua'
    return locales[locale][key] || `[localize ERROR]: key "${key}"not found `
}