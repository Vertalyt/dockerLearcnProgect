import { computed } from 'vue'
import { useLanglStore } from "../stores/langStore";

export function dateFilter(value, format = 'date') {
    const storeLang = computed( () => useLanglStore().isLangCheck )


    const options = {}

try {
    if (format.includes("date")) {
        options.day = "2-digit";
          options.month = "long";
          options.year = "2-digit";
          options.weekday = "long";
      }

    if(format.includes('datetime')) {
        options.second = '2-digit'
        options.minute = '2-digit'
        options.hour = '2-digit'
    }
    
    const date = new Date(value)
    const flag = storeLang.value ? storeLang.value : 'ru-Ru'

    return new Intl.DateTimeFormat(flag, options).format(date).toLocaleString();
} catch (error) {
    console.log(error);
}
}